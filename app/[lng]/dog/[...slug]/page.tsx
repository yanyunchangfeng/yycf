'use client';
import { Header } from '@/app/components';
import { FC } from 'react';
import { ParamsWithLng } from '@/app/shared';
import { useTranslation } from '@/app/i18n/client';

interface BlogSlugProps {
  params: {
    slug: string[];
  };
}

const BlogSlug: FC<BlogSlugProps & ParamsWithLng> = ({ params }) => {
  const { t } = useTranslation(params.lng, 'basic');
  return (
    <>
      <Header lng={params.lng} />
      <h1 className="text-center p-2" suppressHydrationWarning>
        {t('title')}
      </h1>
      <div className="flex flex-1 justify-center items-center">blog {JSON.stringify(params)}</div>
    </>
  );
};

export default BlogSlug;
