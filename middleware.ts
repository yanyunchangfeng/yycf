import { chain } from '@/app/utils';
import { withSupabase, withRedirect, withLogging } from '@/app/middlewares';

export default chain([withLogging, withRedirect, withSupabase]);

export const config = {
  matcher: [
    {
      source: '/'
    },
    {
      source: '/blog'
    },
    {
      source: '/notes'
    }
  ]
};

// /notes/:path* 匹配 /notes、/notes/xxx、/notes/xxx/xxx
// /notes/:path? 匹配 /notes、/notes/xxx
// /notes/:path+ 匹配 /notes/xxx、/notes/xxx/xxx
