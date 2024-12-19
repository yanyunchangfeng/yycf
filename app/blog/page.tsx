import React from 'react';
import { AspectRatioImage } from '@/app/components';

export const revalidate = 0;

const getData = async () => {
  const { signal } = new AbortController();
  const results = await Promise.allSettled([
    fetch('https://api.thecatapi.com/v1/images/search', {
      signal
    }),
    fetch('https://api.thecatapi.com/v1/images/search', {
      signal
    }),
    fetch('https://api.thecatapi.com/v1/images/search', {
      signal
    })
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
