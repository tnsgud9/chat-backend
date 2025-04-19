import { UseGuards } from '@nestjs/common';
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

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
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
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    const { room } = client.handshake.query;
    console.log(`Received message from ${client.id}: ${data}`);

    // 해당 방에 있는 다른 클라이언트들에게만 메시지를 보냄 (보낸 사람 제외)
    client.to(room as string).emit('message', {
      sender: client.id,
      message: data,
    });
    return data;
  }
}
