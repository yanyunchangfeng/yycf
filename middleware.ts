import { chain } from '@/app/utils';
import { withSupabase, withRedirect, withLogging, withLanguage } from '@/app/middlewares';

export default chain([withLogging, withRedirect, withSupabase, withLanguage]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
