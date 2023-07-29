import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    // next-auth의 Session 타입 재정의
    // https://next-auth.js.org/getting-started/typescript
    interface Session {
        user: {
            username: string;
        } & DefaultSession['user'];
    }
}