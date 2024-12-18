import { FC } from 'react';

interface BlogSlugProps {
  params: {
    slug: string;
  };
}
const BlogSlug: FC<BlogSlugProps> = ({ params }) => {
  return (
    <div>
      <h1>blog {params.slug}</h1>
    </div>
  );
};

export default BlogSlug;
