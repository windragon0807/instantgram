import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getFollowingPostsOf } from '@/services/posts';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostsOf(user.username).then(data => NextResponse.json(data));
}
