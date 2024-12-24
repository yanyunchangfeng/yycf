'use client';

import React from 'react';
import { AspectRatioImage, Skeleton } from '@/app/components';
import { toast } from 'sonner';
import { CatEntities } from '@/app/shared';

const Home: React.FC = () => {
  const [cats, setCats] = React.useState<CatEntities>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    const res = await fetch(`/api/cats`);
    const data = await res.json();
    if (!res.ok) {
      const message = data?.message ?? 'Unknown error';
      throw new Error(`Status: ${res.status} Reason: ${message}`);
    }
    return data as CatEntities;
  };

  const initialData = async () => {
    try {
      const data = await fetchData();
      setCats(data);
    } catch (err) {
      toast.error(`Fetch Cats ${err}`);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    initialData();
  }, []);

  const items = React.useMemo(() => {
    if (isLoading) {
      return <Skeleton />;
    }
    return cats.map((item) => {
      return <AspectRatioImage key={item.id} src={item.base64} alt="cat" width={item.width} height={item.height} />;
    });
  }, [cats, isLoading]);

  return <div className="flex-1 flex flex-col gap-4 items-center justify-center">{items}</div>;
};

export default Home;
