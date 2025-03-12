import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('message')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
