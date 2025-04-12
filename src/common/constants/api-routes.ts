export const ApiRoutes = {
  Auth: {
    Login: 'auth/login', // POST: 로그인
    Signup: 'auth/signup', // POST: 회원가입
    Logout: 'auth/logout', // POST: 로그아웃
  },
  User: {
    Search: 'user/search', // GET: 사용자 검색 (Query params 사용)
    FriendsList: 'user/friends', // GET: 사용자의 친구 목록
    AddFriend: 'user/friend/add', // POST: 친구 추가
    RemoveFriend: 'user/friend/{friendId}', // DELETE: 친구 삭제
  },
  Chat: {
    ChatRooms: 'chat/rooms', // GET: 채팅방 목록 조회
    CreateChatRoom: 'chat/rooms/create', // POST: 채팅방 생성
    ChatRoomInfo: 'chat/rooms/{roomId}', // GET: 채팅방 상세 조회
    LeaveChatRoom: 'chat/rooms/{roomId}/leave', // DELETE: 채팅방 나가기
  },
} as const;
