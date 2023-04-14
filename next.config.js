const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
}

const tablesreadyProxy = {
  target: 'https://api.tablesready.com',
  changeOrigin: true,
  headers: {
    appkey: process.env.APPKEY,
  },
  pathRewrite: {
    '^/api': '/public',
  },
}

module.exports = {
  ...nextConfig,
  async rewrites() {
    return [
      {
        source: '/api/tablesready/:path*',
        destination: `${tablesreadyProxy.target}${tablesreadyProxy.pathRewrite['^/api']}/:path*`,
      },
    ]
  },
}

