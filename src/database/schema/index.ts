import { AuthSchema } from './auth.schema';
import { ChatRoomSchema } from './chatroom.schema';

export const Schemas = {
  Auth: { name: 'Auth', schema: AuthSchema },
  ChatRoom: { name: 'ChatRoom', schema: ChatRoomSchema },
};
