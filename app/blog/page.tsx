'use client';
import Link from 'next/link';
import { type FC } from 'react';
import React from 'react';
import { Skeleton, AspectRatioImage } from '@/app/components';
import { toast } from 'sonner';
import { BlogEntities } from '@/app/shared';

const Blog: FC = () => {
  const [photos, setPhotos] = React.useState<BlogEntities>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchData = async () => {
    const res = await fetch(`/api/blog`);
    const data = await res.json();
    if (!res.ok) {
      const message = data?.message ?? 'Unknown error';
      throw new Error(`Status: ${res.status} Reason: ${message}`);
    }
    return data as BlogEntities;
  };

  const fetchPhotos = async () => {
    try {
      const data = await fetchData();
      setPhotos(data);
    } catch (err) {
      toast.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchPhotos();
  }, []);

  const photoTem = React.useMemo(() => {
    if (isLoading) {
      return <Skeleton />;
    }
    return photos.map(({ id, base64 }) => {
      return (
        <Link key={id} href={`/blog/${id}`}>
          <AspectRatioImage src={base64} alt="dog" fill />
        </Link>
      );
    });
  }, [photos, isLoading]);

  return (
    <React.Profiler id="home" onRender={console.log}>
      <div className="flex flex-col justify-center items-center flex-1 gap-4">{photoTem} </div>
    </React.Profiler>
  );
};
export default Blog;
