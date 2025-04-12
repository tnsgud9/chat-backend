import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiRoutes } from 'src/common/constants/api-routes';
import { ChatRoomsResponseDto } from './chat.dto';

@Controller()
export class ChatController {
  @Get(ApiRoutes.Chat.ChatRooms)
  async chatRooms(): Promise<ChatRoomsResponseDto> {
    return { chatrooms: [] };
  }
}
