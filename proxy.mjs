export default {
  development: [
    {
      source: '/msService/:path*',
      destination: 'http://origin:port/msService/:path*'
    },
    {
      source: '/inter-api/:path*',
      destination: 'http://origin:port/inter-api/:path*'
    },
    {
      source: '/prober/:path*',
      destination: 'https://www.ttprober.com/:path*'
    },
    {
      source: '/greenDill/static/:path*',
      destination: 'http://origin:port/greenDill/static/:path*'
    },
    {
      source: '/dev/:path*',
      destination: 'http://origin:port/dev/:path*'
    }
  ],
  test: [
    {
      source: '/msService/:path*',
      destination: 'http://origin:port/msService/:path*'
    },
    {
      source: '/inter-api/:path*',
      destination: 'http://origin:port/inter-api/:path*'
    },
    {
      source: '/prober/:path*',
      destination: 'https://www.ttprober.com/:path*'
    },
    {
      source: '/greenDill/static/:path*',
      destination: 'http://origin:port/greenDill/static/:path*'
    },
    {
      source: '/test/:path*',
      destination: 'http://origin:port/test/:path*'
    }
  ]
};
