// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

// Extend the NextAuth session and user types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string;
    };
  }

  interface User {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
