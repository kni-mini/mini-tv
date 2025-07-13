import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { getUserByEmail } from '@/lib/users/actions';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { users } from '@/lib/db/schema/users';

const providers: Array<ReturnType<typeof CredentialsProvider>> = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const { email, password } = credentials as { email: string; password: string };
      if (!email || !password) return null;

      const user = await getUserByEmail(email);
      if (!user || !user.password) return null;

      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) return null;

      return {
        id: String(user.id),
        email: user.email,
      };
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      const dbUser = await db
        .select({
          id: users.id,
          email: users.email,
        })
        .from(users)
        .where(eq(users.id, Number(token.id)))
        .then((rows) => rows[0]);

      if (session.user && dbUser) {
        session.user.id = String(dbUser.id);
        session.user.email = dbUser.email;
      }
      return session;
    },
  },
};
