export const ApiRoutes = {
  Auth: {
    Login: 'auth/login',
    Signup: 'auth/signup',
    Refresh: 'auth/refresh',
    Logout: 'auth/logout',
  },
  User: {
    Profile: 'user/profile',
    Friends: 'user/friends',
  },
} as const;
