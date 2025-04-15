export const ApiRoutes = {
  Auth: {
    Base: 'auth',
    Login: 'auth/login',
    Signup: 'auth/signup',
    Logout: 'auth/logout',
  },
  User: {
    Base: 'user',
    Search: 'user/search',
    FriendsList: 'user/friend',
    AddFriend: 'user/friend/add',
    RemoveFriend: (friendId: string) => `user/friend/:${friendId}`,
  },
  Chat: {
    Base: 'chat',
    ChatRooms: 'chat/rooms',
    ChatRoomCreate: 'chat/rooms/create',
    ChatRoomInfo: (roomId: string) => `chat/rooms/:${roomId}`,
    ChatRoomLeave: (roomId: string) => `chat/rooms/:${roomId}`,
  },
} as const;
