export const ApiRoutes = {
  Auth: {
    Login: 'auth/login',
    Signup: 'auth/signup',
    Refresh: 'auth/refresh',
    Logout: 'auth/logout',
  },
  User: {
    Search: 'user/search',
    Channels: 'user/channels',
    Friends: 'user/friends',
  },
} as const;
