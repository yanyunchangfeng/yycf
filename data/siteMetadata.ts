const siteMetadata = {
  siteUrl: 'https://yycf.vercel.app',
  title: `Notes`,
  description: 'records notes here',
  author: 'yanyunchangfeng',
  keywords: ['yanyunchangfeng', 'Notes'],
  alternates: {
    canonical: 'https://yycf.vercel.app',
    languages: {
      'en-US': 'https://yycf.vercel.app/en',
      'zh-CN': 'https://yycf.vercel.app/zh'
    }
    // media: {
    //   'only screen and (max-width: 600px)': 'https://ai-music-next.vercel.app/mobile'
    // }
    // types: {
    //   'application/rss+xml': 'https://ai-music-next.vercel.app/rss'
    // }
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  socialBanner: '"https://cdn.jsdelivr.net/gh/yanyunchangfeng/cdn@1.0/assets/icons/cf-icon@0,75x.png"',
  languages: ['zh', 'en'],
  fallbackLanguage: 'en'
};

export default siteMetadata;
