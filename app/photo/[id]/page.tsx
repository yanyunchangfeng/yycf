'use client';

import { FC } from 'react';
import { PhotoParams } from '@/app/shared';
import React from 'react';
import { Skeleton, AspectRatioImage } from '@/app/components';
import { toast } from 'sonner';

const Page: FC<PhotoParams> = ({ params: { id } }) => {
  const [photo, setPhoto] = React.useState<{ src: string; id: string }[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchData = async () => {
    const res = await fetch(`/api/photo/${id}`);
    if (!res.ok) {
      const message = (await res.json())?.message ?? 'Unknown error';
      throw new Error(`Status: ${res.status} Reason: ${message}`);
    }
    const data = await res.json();
    return data as { src: string; id: string }[];
  };
  const fetchPhoto = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData();
      setPhoto(data);
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
    const src = photo[0]?.src;
    return <AspectRatioImage src={src} fill alt="dog" className="w-[400px]  mx-auto self-center" />;
  }, [isLoading, photo]);

  return PhotoItem;
};

export default Page;
