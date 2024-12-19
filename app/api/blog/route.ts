import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { convertUrlBase64 } from '@/app/utils/server';

export async function GET() {
  const supabase = await createClient();
  const res = await fetch('https://dog.ceo/api/breeds/image/random', { next: { revalidate: 0 } });
  if (!res.ok) {
    const { data: photos, error } = await supabase.from('dogs').select().order('id', { ascending: false }).limit(3);
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(photos);
  }
  const dogData: { message: string; status: string } = await res.json();
  const base64 = await convertUrlBase64(dogData.message);
  const { error: insertError } = await supabase
    .from('dogs')
    .insert([{ url: dogData.message, base64 }])
    .select('id');
  if (insertError) {
    return NextResponse.json({ message: insertError.message }, { status: 400 });
  }
  const { data: photos, error } = await supabase.from('dogs').select().order('id', { ascending: false }).limit(3);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json(photos);
}
