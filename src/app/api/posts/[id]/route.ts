import { withSessionUser } from '@/util/session';
import { getPost } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    getPost(context.params.id)
      .then((data) => NextResponse.json(data))
  );
}
