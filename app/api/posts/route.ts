import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: object }) {
  //  访问 /home, pathname 的值为 /home
  const pathname = request.nextUrl.pathname;
  // 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
  const searchParams = request.nextUrl.searchParams;
  console.log('pathname', pathname);
  console.log('searchParams', searchParams);
  console.log('context', context);
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const article = await request.json();
  return NextResponse.json(
    {
      id: Math.random().toString(36).slice(-8),
      data: article
    },
    { status: 201 }
  );
}
