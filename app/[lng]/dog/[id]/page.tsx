'use client';

import { FC } from 'react';
import { BlogParams, BlogEntities, ParamsWithLng } from '@/app/shared';
import React from 'react';
import { Skeleton, AspectRatioImage, Introduction, Usage } from '@/app/components';
import { toast } from 'sonner';
import siteMetadata from '@/data/siteMetadata';

const Page: FC<BlogParams & ParamsWithLng> = ({ params: { id, lng } }) => {
  const [photos, setPhotos] = React.useState<BlogEntities>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    const res = await fetch(`/api/dog/${id}`);
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
    return <AspectRatioImage src={src} fill alt={siteMetadata.origin} className="w-1/3 max-sm:w-full" />;
  }, [isLoading, photos]);

  return (
    <>
      <Introduction lng={lng} />
      <div className="flex flex-1 justify-center items-center">{PhotoItem}</div>
      <Usage lng={lng} />
    </>
  );
};

export default Page;
