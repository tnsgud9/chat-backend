import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiRoutes } from 'src/common/constants/api-routes';
import {
  ChatRoomInfoResponse,
  ChatRoomsResponse,
  ChatRoomCreateRequest,
  ChatRoomCreateResponse,
  ChatRoomInfoRequestQuery,
} from './chat.dto';
import { ChatService } from './chat.service';
import { AuthAccessTokenGuard } from '../auth/auth.guard';
import { AuthInfo } from '../auth/auth.decorator';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { Types } from 'mongoose';
import { ChatRoomDto } from '../common/dto/chatroom.dto';
import { MessageDto } from 'src/common/dto/message.dto';
import { plainToInstance } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { UserInfoDto } from 'src/common/dto/userinfo.dto';
import { ChatRoomDocument } from 'src/database/schema/chatroom.schema';

@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthAccessTokenGuard)
  @Get(ApiRoutes.Chat.ChatRooms)
  async chatRooms(
    @AuthInfo() { id: idStr }: AccessTokenPayload, // JWT 토큰에서 사용자 ID를 추출 (idStr은 문자열)
  ): Promise<ChatRoomsResponse> {
    // 문자열로 되어 있는 사용자 ID를 MongoDB의 ObjectId 타입으로 변환
    const id = new Types.ObjectId(idStr);

    // 현재 사용자가 참여 중인 모든 채팅방 정보를 DB에서 조회
    const chatrooms: ChatRoomDocument[] =
      await this.chatService.getChatRooms(id);

    // 조회된 채팅방 문서를 클라이언트에 전달할 DTO 형식으로 변환
    const chatroomDtos: ChatRoomDto[] = chatrooms.map(
      (chatroom: ChatRoomDocument) => {
        // Mongoose 문서(chatroom)를 ChatRoomDto 인스턴스로 변환
        const instance = plainToInstance(ChatRoomDto, chatroom, {
          excludeExtraneousValues: true, // @Expose된 필드만 변환 대상으로 포함
        });

        // 해당 채팅방에서 현재 사용자에게 대응하는 개인 암호화 키를 찾아 DTO에 포함
        instance.encryptedPrivateKey = chatroom.encryptedPrivateKeys.find(
          (it) => it.id.equals(id),
        )!.encryptedKey;
        return instance;
      },
    );
    return { chatrooms: chatroomDtos };
  }

  @UseGuards(AuthAccessTokenGuard)
  @Get(ApiRoutes.Chat.ChatRoomInfo('roomId'))
  async chatRoomInfo(
    @Param('roomId') roomIdStr: string,
    @Query() { before, limit }: ChatRoomInfoRequestQuery,
  ): Promise<ChatRoomInfoResponse> {
    const roomId = new Types.ObjectId(roomIdStr);
    const roomInfo = await this.chatService.getChatRoom(roomId);
    if (!roomInfo) {
      throw new NotFoundException('해당 채팅방의 대한 정보가 없습니다.');
    }
    const participants = await this.authService.getAuthInfos(
      roomInfo.encryptedPrivateKeys.map((it) => it.id),
    );
    if (!participants) {
      throw new NotFoundException('채팅방 사용자의 대한 정보가 없습니다.');
    }
    const messages = await this.chatService.getMessages(roomId, limit, before);
    return {
      roomId: roomIdStr,
      messages: plainToInstance(MessageDto, messages, {
        excludeExtraneousValues: true,
      }),
      participants: plainToInstance(UserInfoDto, participants, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @UseGuards(AuthAccessTokenGuard)
  @Post(ApiRoutes.Chat.ChatRoomCreate)
  async chatRoomCreate(
    @Body() { participantIds }: ChatRoomCreateRequest,
    @AuthInfo() authInfo: AccessTokenPayload,
  ): Promise<ChatRoomCreateResponse> {
    // 1. participantIds auth 정보를 가져온다.
    const participants = await this.chatService.getAccounts([
      ...participantIds.map((id) => new Types.ObjectId(id)),
      new Types.ObjectId(authInfo.id),
    ]);
    if (participantIds.length + 1 != participants.length) {
      throw new NotFoundException('일부 유저들을 찾을 수 없습니다.');
    }

    // 2. 채팅방을 위한 공개키, 개인키를 생성한다.
    // 3. auth 유저들의 공개키를 기반으로 개인키를 암호화한다.
    // 4. DB에 저장한다.
    const { id, name, publicKey, encryptedPrivateKeys } =
      await this.chatService.createChatRoom(participants);
    // 생성된 document 가공하여 반환
    return {
      id,
      name,
      publicKey,
      encryptedPrivateKey: encryptedPrivateKeys.find(
        (it) => it.id.toString() === authInfo.id,
      )!.encryptedKey,
    };
  }
}
