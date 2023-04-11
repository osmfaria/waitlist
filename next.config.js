const nextConfig = {
  reactStrictMode: true,
}

const tablesreadyProxy = {
  target: 'https://api.tablesready.com',
  changeOrigin: true,
  headers: {
    appkey: 'caba572a-3bc6-4961-9612-940faa42de2f',
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
        source: '/api/:path*',
        destination: `${tablesreadyProxy.target}/${tablesreadyProxy.pathRewrite['^/api']}/:path*`,
      },
    ]
  },
}
