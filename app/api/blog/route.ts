import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { convertUrlBase64 } from '@/app/utils/server';

export const revalidate = 0;

export async function GET() {
  const supabase = await createClient();
  const { count, error: countError } = await supabase.from('dogs').select('id', { count: 'exact', head: true });
  if (countError) {
    return NextResponse.json({ message: countError.message }, { status: 400 });
  }
  if (count! < 1200) {
    const results = await Promise.allSettled([
      fetch('https://dog.ceo/api/breeds/image/random'),
      fetch('https://dog.ceo/api/breeds/image/random'),
      fetch('https://dog.ceo/api/breeds/image/random')
    ]);
    const data = results
      .map(async (result, index) => {
        if (result.status === 'fulfilled') {
          return await result.value.json();
        } else {
          console.log(`🚀 error: Request ${index + 1} failed: ${result.reason}`);
          return;
        }
      })
      .filter(Boolean);
    const finalData: { message: string; status: string }[] = await Promise.all(data);
    console.log('🚀 ~ GET  dog ~ finalData:', finalData);
    const withBase64Data = finalData.map(async (result) => {
      const base64 = await convertUrlBase64(result.message);
      const { message } = result; // 去掉id
      return { url: message, base64 };
    });
    const finalWithBase64Data = await Promise.all(withBase64Data);
    const { error: insertError } = await supabase.from('dogs').insert(finalWithBase64Data).select('id');
    if (insertError) {
      return NextResponse.json({ message: insertError.message }, { status: 400 });
    }
  }
  const pageSize = 3;
  const totalPages = Math.ceil(count! / pageSize);
  const pageNo = Math.floor(Math.random() * (300 - 1 + 1) + 1);
  const validPageNo = pageNo > totalPages ? 1 : pageNo;
  const offset = (validPageNo - 1) * pageSize;
  const { data: photos, error } = await supabase
    .from('dogs')
    .select()
    .range(offset, offset + pageSize - 1)
    .order('id', { ascending: false });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json(photos);
}
