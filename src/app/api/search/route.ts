import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

// 의도치 않게 SSG로 동작하는 API 동적 설정
export const dynamic = 'force-dynamic';

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
