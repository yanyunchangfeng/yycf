import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

export async function GET(request: NextRequest, context: { params: Record<string, string> }) {
  const pathname = request.nextUrl.pathname;
  console.log('🚀 ~ GET ~ pathname:', pathname);
  const supabase = await createClient();
  const { data: photos, error } = await supabase.from('dogs').select('*').eq('id', context.params.id);
  if (error) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
  return NextResponse.json(photos);
}
