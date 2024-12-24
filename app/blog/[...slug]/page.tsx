import { Header } from '@/app/components';
import { FC } from 'react';

interface BlogSlugProps {
  params: {
    slug: string[];
  };
}

const BlogSlug: FC<BlogSlugProps> = ({ params }) => {
  return (
    <>
      <Header />
      <div className="flex flex-1 justify-center items-center">blog {JSON.stringify(params)}</div>
    </>
  );
};

export default BlogSlug;
