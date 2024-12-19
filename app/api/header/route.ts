import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

export const GET = async () => {
  const headersList = headers();
  const referer = headersList.get('referer');
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');

  return NextResponse.json(
    { data: 'hello world' },
    {
      status: 200,
      headers: {
        referer: referer ?? '',
        'Set-Cookie': `token=${token?.value}`
      }
    }
  );
};
