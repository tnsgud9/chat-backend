import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatRoomSendMessageRequestDto } from './chat.dto';
import { Types } from 'mongoose';
import { MessageDto } from 'src/common/dto/message.dto';
import { AccessTokenPayload } from 'src/common/types/jwt.type';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*', // 프론트엔드 주소
    credentials: true, // 쿠키를 허용하려면 반드시 true
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(client: Socket) {
    const cookies = client.handshake.headers.cookie;

    if (!cookies) {
      return client.disconnect();
    }

    // 쿠키에서 access_token을 파싱한다.
    const token = cookies
      .split(';')
      .map((c) => c.trim())
      .map((c) => c.split('=')) // [key, value]
      .find(([key]) => key === 'access_token')?.[1];

    if (!token) {
      return client.disconnect();
    }

    const payload = this.authService.verifyAccessToken(token); // JWT_SECRET은 환경 변수에서

    client.data = payload;

    const { room } = client.handshake.query;

    if (typeof room === 'string') {
      await client.join(room);
      console.log(`Client ${client.id} joined room: ${room}`);
      this.server.to(room).emit('notice', `User ${client.id} joined the room`);
    } else {
      console.warn(`Client ${client.id} did not provide a valid room`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() { content, contentType }: ChatRoomSendMessageRequestDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { room } = client.handshake.query;
    console.log(`Received message from ${client.id}: ${content}`);
    const token = client.data as AccessTokenPayload;
    await this.chatService.createMessage(
      new Types.ObjectId(token.id),
      new Types.ObjectId(room as string),
      content,
      contentType,
    );
    // 해당 방에 있는 다른 클라이언트들에게만 메시지를 보냄 (보낸 사람 제외)
    client.to(room as string).emit('message', {
      sender: new Types.ObjectId(token.id),
      content: content,
      contentType: contentType,
    } as unknown as MessageDto);
  }
}
