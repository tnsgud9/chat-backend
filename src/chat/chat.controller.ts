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
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiCookieAuth('access_token')
@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthAccessTokenGuard)
  @Get(ApiRoutes.Chat.ChatRooms)
  @ApiOperation({
    summary: '채팅방 목록 조회',
    description: '유저가 참여 중인 채팅방 목록을 조회함.',
  })
  @ApiResponse({
    status: 200,
    description: '채팅방 목록을 반환함.',
    type: ChatRoomsResponse,
  })
  async chatRooms(
    @AuthInfo() { id }: AccessTokenPayload,
  ): Promise<ChatRoomsResponse> {
    const chatrooms = await this.chatService.getChatRooms(
      new Types.ObjectId(id),
    );
    return {
      chatrooms: plainToInstance(ChatRoomDto, chatrooms, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @UseGuards(AuthAccessTokenGuard)
  @Get(ApiRoutes.Chat.ChatRoomInfo('roomId'))
  @ApiOperation({
    summary: '채팅방 상세 조회',
    description:
      '특정 채팅방의 메시지 및 참여자 정보를 조회함. 이전 메시지 기준으로 페이징 가능함.',
  })
  @ApiParam({ name: 'roomId', description: '채팅방의 MongoDB ID' })
  @ApiQuery({
    name: 'before',
    required: false,
    description: '이전 메시지 기준 시간',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '조회할 메시지 수 (최대 20개)',
  })
  @ApiResponse({
    status: 200,
    description: '채팅방 정보 및 메시지, 참여자 정보를 반환함.',
    type: ChatRoomInfoResponse,
  })
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
  @ApiOperation({
    summary: '채팅방 생성',
    description:
      '지정된 유저들과의 채팅방을 생성함. 공개키는 PEM 형식으로 반환되며, 개인키는 RSA + AES 하이브리드 암호화로 반환됨.',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 채팅방 정보 및 공개키/개인키를 반환함.',
    type: ChatRoomCreateResponse,
  })
  async chatRoomCreate(
    @Body() { participantIds }: ChatRoomCreateRequest,
    @AuthInfo() authInfo: AccessTokenPayload,
  ): Promise<ChatRoomCreateResponse> {
    // 1. participantIds auth 정보를 가져온다.
    const participants = await this.chatService.getAccounts(
      participantIds.map((id) => new Types.ObjectId(id)),
    );
    if (participantIds.length != participants.length) {
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
