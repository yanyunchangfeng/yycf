'use client';
import { Introduction, Usage } from '@/app/components';
import { FC } from 'react';
import { ParamsWithLng } from '@/app/shared';

interface BlogSlugProps {
  params: {
    slug: string[];
  };
}

const BlogSlug: FC<BlogSlugProps & ParamsWithLng> = ({ params }) => {
  return (
    <>
      <Introduction lng={params.lng} />
      <div className="flex flex-1 justify-center items-center">blog {JSON.stringify(params)}</div>
      <Usage lng={params.lng} />
    </>
  );
};

export default BlogSlug;
