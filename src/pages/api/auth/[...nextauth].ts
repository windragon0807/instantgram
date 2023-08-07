import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { addUser } from '@/services/user';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  callbacks: {
    // signIn -> jwt -> session
    async signIn({ user: { id, name, image, email } }) {
      /**
       * console.log(user);
       * {
       *   id: '아이디',
       *   name: '이름',
       *   email: '이메일',
       *   image: '이미지'
       * }
       */
      if (!email) {
        return false;
      }
      addUser({
        id,
        name: name || '',
        image,
        email,
        username: email.split('@')[0],
      });
      return true;
    },
    // https://next-auth.js.org/configuration/callbacks#session-callback
    async session({ session, token }) {
      /**
       * console.log(session);
       * {
       *   user: {
       *     name: '이름',
       *     email: '이메일',
       *     image: '이미지',
       *   },
       *   expires: '만료일',
       * }
       */
      const user = session?.user;
      if (user) {
        // 세션 정보 커스텀 : https://next-auth.js.org/getting-started/typescript
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string,
        };
      }
      return session;
    },
    // https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
