import { isDynamic } from '@/app/shared';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

// 访问 /api/search?query=react
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query'); // query

  return NextResponse.json({ query }, { status: 200 });
};
