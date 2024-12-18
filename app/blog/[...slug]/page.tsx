import { FC } from 'react';

interface BlogSlugProps {
  params: {
    slug: string[];
  };
}

const BlogSlug: FC<BlogSlugProps> = ({ params }) => {
  return (
    <div>
      <h1>blog {JSON.stringify(params)}</h1>
    </div>
  );
};

export default BlogSlug;
