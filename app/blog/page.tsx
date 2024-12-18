import { FC, use } from 'react';
import { AspectRatioImage } from '@/app/components';

const getData = async () => {
  // 基于时间的重新验证;
  // 使用基于时间的重新验证，你需要在使用 fetch 的时候设置 next.revalidate 选项（以秒为单位）：
  const res = await fetch('https://api.thecatapi.com/v1/images/search', { next: { revalidate: 5 } });

  if (!res.ok) {
    throw new Error('Failed to fetch api.thecatapi.com data');
  }
  const data = await res.json();
  return data?.[0]?.url;
};

// 异步组件
// const Blog: FC = async () => {
//   const { message } = await getData();
//   return (
//     <div className="h-60 mt-5 flex-1 rounded-xl  text-white flex items-center justify-center">
//       {message}
//     </div>
//   );
// };

const Blog: FC = () => {
  const src = use(getData());

  return (
    <div className="flex-1 flex items-center justify-center">
      <AspectRatioImage src={src} alt="cat" fill />
    </div>
  );
};

export default Blog;
