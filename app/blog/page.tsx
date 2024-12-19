import React from 'react';
import { AspectRatioImage } from '@/app/components';

const getData = async () => {
  const results = await Promise.allSettled([
    fetch('https://api.thecatapi.com/v1/images/search', { next: { revalidate: 0 } }),
    fetch('https://api.thecatapi.com/v1/images/search', { next: { revalidate: 0 } }),
    fetch('https://api.thecatapi.com/v1/images/search', { next: { revalidate: 0 } })
  ]);
  const data = results.map(async (result, index) => {
    if (result.status === 'fulfilled') {
      return await result.value.json();
    } else {
      return { error: `Request ${index + 1} failed: ${result.reason}` };
    }
  });

  const finalData = await Promise.all(data);
  const flatData = finalData.flatMap((innerArray) => innerArray);
  console.log('🚀 ~ getData ~ flatData:', flatData);
  return flatData as { id: string; url: string; width: number; height: number; error?: string }[];
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

const Blog: React.FC = () => {
  const data = React.use(getData());

  const items = React.useMemo(() => {
    return data.map((item) => {
      if (item.error) {
        return null;
      }
      return <AspectRatioImage key={item.id} src={item.url} alt="cat" width={item.width} height={item.height} />;
    });
  }, [data]);

  return <div className="flex-1 flex flex-col gap-4 items-center justify-center">{items}</div>;
};

export default Blog;
