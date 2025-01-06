'use client';
import Link from 'next/link';
import { type FC } from 'react';
import React from 'react';
import { Skeleton, AspectRatioImage, Header, Introduction } from '@/app/components';
import { toast } from 'sonner';
import { BlogEntities, ParamsWithLng } from '@/app/shared';
import siteMetadata from '@/data/siteMetadata';

const Dog: FC<ParamsWithLng> = ({ params: { lng } }) => {
  const [photos, setPhotos] = React.useState<BlogEntities>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchData = async () => {
    const res = await fetch(`/api/dog`);
    const data = await res.json();
    if (!res.ok) {
      const message = data?.message ?? 'Unknown error';
      throw new Error(`Status: ${res.status} Reason: ${message}`);
    }
    return data as BlogEntities;
  };

  const initialData = async () => {
    try {
      const data = await fetchData();
      setPhotos(data);
    } catch (err) {
      toast.error(`Fetch Blog ${err}`);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    initialData();
  }, []);

  const photoTem = React.useMemo(() => {
    if (isLoading) {
      return <Skeleton />;
    }
    return photos.map(({ id, base64 }) => {
      return (
        <Link key={id} href={`/${lng}/dog/${id}`} className="w-1/3 max-sm:w-full">
          <AspectRatioImage src={base64} alt={siteMetadata.origin} fill />
        </Link>
      );
    });
  }, [photos, isLoading]);

  return (
    <React.Profiler id="dog" onRender={console.log}>
      <Header lng={lng} />
      <Introduction lng={lng} />
      <div className="flex items-center justify-center flex-1 flex-col gap-4">{photoTem}</div>
    </React.Profiler>
  );
};
export default Dog;
