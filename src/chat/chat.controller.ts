import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiRoutes } from 'src/common/constants/api-routes';
import {
  ChatRoomInfoResponseDto,
  ChatRoomsResponseDto,
  ChatRoomCreateRequestDto,
  ChatRoomCreateResponseDto,
} from './chat.dto';
import { ChatService } from './chat.service';
import { AuthAccessTokenGuard } from '../auth/auth.guard';
import { AuthInfo } from '../auth/auth.decorator';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { Types } from 'mongoose';
import { ChatRoomDto } from '../common/dto/chatroom.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthAccessTokenGuard)
  @Get(ApiRoutes.Chat.ChatRooms)
  async chatRooms(
    @AuthInfo() { id }: AccessTokenPayload,
  ): Promise<ChatRoomsResponseDto> {
    const chatrooms = await this.chatService.getChatRooms(
      new Types.ObjectId(id),
    );
    return { chatrooms: chatrooms.map((it) => new ChatRoomDto(it)) };
  }

  @UseGuards(AuthAccessTokenGuard)
  @Get(ApiRoutes.Chat.ChatRoomInfo('roomId'))
  async chatRoomInfo(
    @Param('roomId') roomId: Types.ObjectId,
  ): Promise<ChatRoomInfoResponseDto> {
    const messages = await this.chatService.getMessages(roomId);
    return { roomId, messages: messages };
  }

  @UseGuards(AuthAccessTokenGuard)
  @Post(ApiRoutes.Chat.ChatRoomCreate)
  async chatRoomCreate(
    @Body() { participantIds }: ChatRoomCreateRequestDto,
    @AuthInfo() authInfo: AccessTokenPayload,
  ): Promise<ChatRoomCreateResponseDto> {
    // 1. participantIds auth 정보를 가져온다.
    const users = await this.chatService.getAccounts(participantIds);
    if (participantIds.length != users.length) {
      throw new NotFoundException('일부 유저들을 찾을 수 없습니다.');
    }

    // 2. 채팅방을 위한 공개키, 개인키를 생성한다.
    // 3. auth 유저들의 공개키를 기반으로 개인키를 암호화한다.
    // 4. DB에 저장한다.
    const { id, name, publicKey, encryptedPrivateKeys } =
      await this.chatService.createChatRoom(users);
    // 생성된 document 가공하여 반환
    return {
      id,
      name,
      publicKey,
      encryptedPrivateKey: encryptedPrivateKeys.find(
        (it) => it.userId == new Types.ObjectId(authInfo.id),
      )!.encryptedKey,
    };
  }
}
