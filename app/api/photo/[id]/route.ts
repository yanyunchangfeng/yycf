import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { isDynamic } from '@/app/shared';

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

export const generateStaticParams = async () => {
  return [{ id: '0' }];
};

export async function GET(request: NextRequest, context: { params: Record<string, string> }) {
  const pathname = request.nextUrl.pathname;
  // 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
  //   const field = request.nextUrl.searchParams.get('name');
  console.log('pathname', pathname);
  const supabase = await createClient();
  const { data: photos, error } = await supabase.from('photos').select('*').eq('id', context.params.id);
  if (error) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
  return NextResponse.json(photos);
}
