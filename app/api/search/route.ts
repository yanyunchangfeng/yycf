import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query'); // query
  return NextResponse.json({ query }, { status: 200 });
};
