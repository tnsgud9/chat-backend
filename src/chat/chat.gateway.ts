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
import { ChatRoomSendMessageRequest } from './chat.dto';
import { Types } from 'mongoose';
import { MessageDto } from 'src/common/dto/message.dto';
import { AccessTokenPayload } from 'src/common/types/jwt.type';
import { AuthService } from 'src/auth/auth.service';
import { plainToInstance } from 'class-transformer';

@WebSocketGateway({
  cors: {
    origin: '*', // 프론트엔드 주소
    credentials: true, // 쿠키 허용
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  // handleConnection 에서는 guard를 지원하지 않는다. 그래서 내부에서 검증 로직을 구현한다.
  async handleConnection(client: Socket) {
    //#region COOKIE_VALIDATION
    const cookies = client.handshake.headers.cookie;
    if (!cookies) {
      console.log(`[Client:${client.id}] 쿠키가 없어서 연결 종료`);
      return client.disconnect();
    }

    // 쿠키에서 access_token 수동 파싱
    const token = cookies
      .split(';')
      .map((c) => c.trim())
      .map((c) => c.split('=')) // [key, value]
      .find(([key]) => key === 'access_token')?.[1];

    if (!token) {
      console.log(
        `[Client:${client.id}] 유효한 access_token이 없어서 연결 종료`,
      );
      return client.disconnect();
    }

    // access_token 유효성 검증
    const payload = this.authService.tryVerifyAccessToken(token);
    if (!payload) {
      console.log(`[Client:${client.id}] access_token 검증 실패로 연결 종료`);
      return client.disconnect();
    }
    //#endregion

    client.data = payload;

    const { room } = client.handshake.query as { room: string };
    const roomInfo = await this.chatService.getChatRoom(
      new Types.ObjectId(room),
    );

    if (!roomInfo) {
      console.warn(
        `[Client:${client.id}] [Nickname:${payload.nickname}] 유효한 방 정보를 제공하지 않음`,
      );
      return client.disconnect();
    }
    if (
      !roomInfo.encryptedPrivateKeys.some(
        (it) => it.id.toString() == payload.id,
      )
    ) {
      console.warn(
        `[Client:${client.id}] [Nickname:${payload.nickname}] 해당 방에 등록되지 않음`,
      );
      return client.disconnect();
    }
    console.log(
      `[Client:${client.id}] [Nickname:${payload.nickname}] 방에 참여함: ${room}`,
    );
    await client.join(room);
  }

  handleDisconnect(client: Socket) {
    const payload = client.data as AccessTokenPayload;
    console.log(
      `[Client:${client.id}] [Nickname:${payload.nickname}] 연결 종료됨`,
    );
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() { content, contentType }: ChatRoomSendMessageRequest,
    @ConnectedSocket() client: Socket,
  ): Promise<MessageDto> {
    const { room } = client.handshake.query;
    const payload = client.data as AccessTokenPayload;
    console.log(
      `[Client:${client.id}] [Nickname:${payload.nickname}] 메시지 수신: ${content}`,
    );
    const message = await this.chatService.createMessage(
      new Types.ObjectId(payload.id),
      new Types.ObjectId(room as string),
      content,
      contentType,
    );
    // 해당 방에 있는 다른 Client들 에게만 메시지를 보냄 (보낸 사람 제외)
    client.to(room as string).emit('message', {
      sender: new Types.ObjectId(payload.id),
      content: content,
      contentType: contentType,
    } as unknown as MessageDto);
    return plainToInstance(MessageDto, message, {
      excludeExtraneousValues: true,
    });
  }
}
