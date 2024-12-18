import { isDynamic } from '@/app/shared';
import { NextResponse, NextRequest } from 'next/server';

// 路由处理程序是指使用 Web Request 和 Response API 对于给定的路由自定义处理逻辑。

// 简单的来说，前后端分离架构中，客户端与服务端之间通过 API 接口来交互。这个“API 接口”在 Next.js 中有个更为正式的称呼，就是路由处理程序。

// 1. 定义路由处理程序
// 写路由处理程序，你需要定义一个名为 route.ts的特殊文件。（注意是 route 不是 router）
// 该文件必须在 app目录下，可以在 app 嵌套的文件夹下，但是要注意 page.js和 route.js不能在同一层级同时存在。

// 想想也能理解，page.ts和 route.ts本质上都是对路由的响应。page.ts主要负责渲染 UI，route.ts主要负责处理请求。如果同时存在，Next.js 就不知道用谁的逻辑了。

// (1.3).传入参数;
// (1.4).缓存行为;
// 默认情况下，使用 Response 对象（NextResponse 也是一样的）的 GET 请求会被缓存。

// 退出缓存
// 但大家也不用担心默认缓存带来的影响。实际上，默认缓存的条件是非常“严苛”的，这些情况都会导致退出缓存：
// GET 请求使用 Request 对象
// 添加其他 HTTP 方法，比如 POST
// 使用像 cookies、headers 这样的动态函数
// 路由段配置项手动声明为动态模式

// 重新验证

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

const fetchPosts = async () => {
  return [{ id: '0' }];
};

// Error: Page "/api/posts/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
export const generateStaticParams = async () => {
  // 从数据源获取所有博客文章的 slug
  const posts = await fetchPosts(); // 你需要根据实际情况修改 fetchPosts 函数

  return posts.map((post) => ({
    id: post.id
  }));
};

export async function GET(request: NextRequest, context: { params: Record<string, string> }) {
  //  访问 /home, pathname 的值为 /home
  const pathname = request.nextUrl.pathname;
  // 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
  const field = request.nextUrl.searchParams.get('dataField');
  console.log('field', field);
  console.log('pathname', pathname);
  console.log('context', context);
  const data = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)).json();
  const result = field ? { [field]: data[field] } : data;
  return NextResponse.json({ result });
}
