import { AuthUser } from '@/model/user';

declare module 'next-auth' {
  // next-auth의 Session 타입 재정의
  // https://next-auth.js.org/getting-started/typescript
  interface Session {
    user: AuthUser;
  }
}
