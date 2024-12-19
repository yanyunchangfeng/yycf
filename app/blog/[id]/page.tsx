'use client';

import { FC } from 'react';
import { BlogParams, BlogEntities } from '@/app/shared';
import React from 'react';
import { Skeleton, AspectRatioImage } from '@/app/components';
import { toast } from 'sonner';

const Page: FC<BlogParams> = ({ params: { id } }) => {
  const [photos, setPhotos] = React.useState<BlogEntities>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    const res = await fetch(`/api/blog/${id}`);
    const data = await res.json();
    if (!res.ok) {
      const message = data?.message ?? 'Unknown error';
      throw new Error(`Status: ${res.status} Reason: ${message}`);
    }
    return data as BlogEntities;
  };
  const fetchPhoto = async () => {
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
    fetchPhoto();
  }, []);

  const PhotoItem = React.useMemo(() => {
    if (isLoading) {
      return <Skeleton />;
    }
    const src = photos[0]?.base64;
    return <AspectRatioImage src={src} fill alt="dog" className="w-[400px] mx-auto self-center" />;
  }, [isLoading, photos]);

  return PhotoItem;
};

export default Page;
