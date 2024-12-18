import { isDynamic } from '@/app/shared';
import { createClient } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

export async function GET(request: NextRequest) {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const url = new URL(request.url);
  const { searchParams } = url;
  let pageNo = Number(searchParams.get('pageNo'));
  let pageSize = Number(searchParams.get('pageSize'));
  const keyWord = searchParams.get('keyWord') ?? '';
  let startDate: string | number = searchParams.get('startDate') || '1970-01-01'; // 获取 startDate 参数
  let endDate: string | number = searchParams.get('endDate') || '2100-01-01';
  pageNo = Number.isNaN(pageNo) || pageNo <= 0 ? 1 : pageNo;
  pageSize = Number.isNaN(pageSize) || pageSize <= 0 ? 10 : pageSize;
  startDate = new Date(startDate).getTime();
  endDate = new Date(endDate).getTime();

  const supabase = await createClient();
  const { count, error: countError } = await supabase
    .from('notes')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .ilike('title', `%${keyWord}%`);
  if (countError) {
    return NextResponse.json({ message: countError.message }, { status: 400 });
  }
  const totalPages = Math.ceil(count! / pageSize);
  const validPageNo = pageNo > totalPages ? 1 : pageNo;
  const offset = (validPageNo - 1) * pageSize;
  const { data: notes, error } = await supabase
    .from('notes')
    .select()
    .ilike('title', `%${keyWord}%`)
    .range(offset, offset + pageSize - 1)
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json(
    {
      totalCount: count,
      data: notes,
      pageNo: validPageNo,
      pageSize,
      totalPages
    },
    { status: 200 }
  );
}
export async function POST(request: NextRequest) {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const body = await request.json();
  const { title, user_id } = body;
  // 验证数据是否包含 title
  if (!title || !user_id) {
    return NextResponse.json({ message: 'title & user_id is required' }, { status: 400 });
  }
  const supabase = await createClient();
  // insert() 不强制要求传递数组，你可以根据实际需求插入单条或多条数据。
  // 单条插入：直接传入一个对象。
  // 批量插入：传入一个对象数组。
  const { data, error } = await supabase.from('notes').insert(body).select('id');
  if (error) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function PUT(request: NextRequest) {
  if (!isDynamic) {
    return NextResponse.json([]);
  }
  const body = await request.json();
  const { id, title, user_id } = body;
  // 验证数据是否包含 title
  if (!id || !title) {
    return NextResponse.json({ message: 'id and title are required' }, { status: 400 });
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notes')
    .update([{ title: title }])
    .match({ id, user_id })
    .select();
  if (data?.length === 0) {
    return NextResponse.json({ message: 'you dont have permission to option this note' }, { status: 401 });
  }
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { id } = body; // 获取笔记的 id
  // 确保传递了 id
  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }
  const supabase = await createClient();
  // 执行删除操作
  //   eq 是单个字段的等值匹配，适用于比较一个字段与某个具体值是否相等。
  // match 是多条件匹配，适用于一次性检查多个字段与对应值的匹配，等价于多个 eq 条件的 AND 组合。
  const { data, error } = await supabase.from('notes').delete().match({ id }).select(); // 通过 id 删除笔记
  if (data?.length === 0) {
    return NextResponse.json({ message: 'you dont have permission to option this note' }, { status: 401 });
  }
  // 错误处理
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  // 返回删除成功的数据
  return NextResponse.json(data, { status: 200 });
}
