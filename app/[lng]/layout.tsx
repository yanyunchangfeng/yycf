import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/app/globals.css';
import { ThemeProvider } from '@/app/components';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/components';
import { cookies } from 'next/headers';
import { themes, ParamsWithLng } from '@/app/shared';
import { dir } from 'i18next';
import { User } from '@/app/components/server/User';
import siteMetadata from '@/data/siteMetadata';
import { ImageObject, WithContext } from 'schema-dts';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  alternates: siteMetadata.alternates,
  icons: siteMetadata.icons
};

const jsonLd: WithContext<ImageObject> = {
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  creator: {
    '@type': 'Person',
    name: 'yanyunchangfeng'
  }
};
// 添加静态路由
export async function generateStaticParams() {
  return siteMetadata.languages.map((lng) => ({ lng }));
}
export default async function RootLayout({ children, params: { lng } }: ParamsWithLng & React.PropsWithChildren) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="violet" enableSystem disableTransitionOnChange themes={themes}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar lng={lng}>
              <User />
            </AppSidebar>
            <SidebarInset className="overflow-x-hidden px-4 pb-4">{children}</SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
