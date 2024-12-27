import proxy from './proxy.mjs';
const {
  ENV,
  NEXT_PUBLIC_BUILD_MODE,
  NEXT_PUBLIC_ASSET_PREFIX,
  NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_DIST_DIR,
  VERCEL_URL
} = process.env;

const mode = NEXT_PUBLIC_BUILD_MODE ?? undefined;
const assetPrefix = NEXT_PUBLIC_ASSET_PREFIX ?? undefined;
const basePath = NEXT_PUBLIC_BASE_PATH ?? undefined;
const distDir = NEXT_PUBLIC_DIST_DIR ?? undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix,
  basePath,
  output: mode,
  // productionBrowserSourceMaps: true,
  distDir,
  env: {
    VERCEL_URL
  },
  // webpack(config, { webpack }) {
  //   config.plugins.push(
  //     new webpack.DefinePlugin({
  //     })
  //   );
  //   return config;
  // },
  reactStrictMode: false,
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
        port: '',
        pathname: '/**'
      }
    ]
  },
  experimental: {
    turbo: {}
  }
};
const CorsHeaders = [
  { key: 'Access-Control-Allow-Credentials', value: 'true' },
  { key: 'Access-Control-Allow-Origin', value: '*' },
  {
    key: 'Access-Control-Allow-Methods',
    value: '*'
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: '*'
  },
  {
    key: 'Access-Control-Max-Age',
    value: '86400'
  }
];

if (mode !== 'export') {
  nextConfig.headers = async () => {
    return [
      {
        source: '/msService/:path*',
        headers: CorsHeaders
      }
    ];
  };

  nextConfig.rewrites = async () => {
    return {
      beforeFiles: proxy[ENV]
    };
  };
}

export default nextConfig;
