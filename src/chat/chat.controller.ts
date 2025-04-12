import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiRoutes } from 'src/common/constants/api-routes';
import {
  ChatRoomInfoResponseDto,
  ChatRoomsResponseDto,
  ChatRoomCreateRequestDto,
  ChatRoomCreateResponseDto,
} from './chat.dto';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get(ApiRoutes.Chat.ChatRooms)
  async chatRooms(): Promise<ChatRoomsResponseDto> {
    return { chatrooms: [] };
  }

  @Get(ApiRoutes.Chat.ChatRoomInfo)
  async chatRoomInfo(): Promise<ChatRoomInfoResponseDto> {
    return { chatrooms: [] };
  }

  @Post(ApiRoutes.Chat.ChatRoomCreate)
  async chatRoomCreate(
    @Body() { participantIds }: ChatRoomCreateRequestDto,
  ): Promise<ChatRoomCreateResponseDto> {
    // 1. participantIds auth 정보를 가져온다.

    // 2. 채팅방을 위한 공개키, 개인키를 생성한다.
    // 3. auth 유저들의 공개키를 기반으로 개인키를 암호화한다.

    return {};
  }
}
