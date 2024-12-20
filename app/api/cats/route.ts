import { convertUrlBase64 } from '@/app/utils/server';
import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';
import { CatEntities } from '@/app/shared';

export const revalidate = 0;

export async function GET() {
  const supabase = await createClient();
  const { count, error: countError } = await supabase.from('cats').select('id', { count: 'exact', head: true });
  if (countError) {
    return NextResponse.json({ message: countError.message }, { status: 400 });
  }
  if (count! < 1200) {
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
    const flatData: CatEntities = finalData.flatMap((innerArray) => innerArray);
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
  }
  const pageSize = 3;
  const totalPages = Math.ceil(count! / pageSize);
  const pageNo = Math.floor(Math.random() * (300 - 1 + 1) + 1);
  const validPageNo = pageNo > totalPages ? 1 : pageNo;
  const offset = (validPageNo - 1) * pageSize;
  const { data: photos, error } = await supabase
    .from('cats')
    .select()
    .range(offset, offset + pageSize - 1)
    .order('id', { ascending: false });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json(photos);
}
