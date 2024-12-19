import { convertUrlBase64 } from '@/app/utils/server';
import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  const supabase = await createClient();
  const results = await Promise.allSettled([
    fetch('https://api.thecatapi.com/v1/images/search'),
    fetch('https://api.thecatapi.com/v1/images/search'),
    fetch('https://api.thecatapi.com/v1/images/search')
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

  const finalData = await Promise.all(data);
  const flatData = finalData.flatMap((innerArray) => innerArray);
  const withBase64Data = flatData.map(async (result) => {
    const base64 = await convertUrlBase64(result.url);
    const { id, ...rest } = result; // 去掉id
    console.log('🚀 ~ withBase64Data ~ id:', id);
    return { ...rest, base64 };
  });

  const finalWithBase64Data = await Promise.all(withBase64Data);

  const { error: insertError } = await supabase.from('cats').insert(finalWithBase64Data).select('id');
  if (insertError) {
    return NextResponse.json({ message: insertError.message }, { status: 400 });
  }
  const { data: photos, error } = await supabase.from('cats').select().order('id', { ascending: false }).limit(3);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json(photos);
}
