import { NextRequest, NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/app/utils/supabase/server';
import { isDynamic } from '@/app/shared';

export const dynamic = isDynamic ? 'force-dynamic' : 'force-static';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}notes`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}notes`);
      } else {
        return NextResponse.redirect(`${origin}${next}notes`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}${next}/blog`);
}
