import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {
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
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
