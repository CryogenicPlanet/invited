module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: '/docs/api',
        destination: '/docs/api/index.html',
        permanent: true
      },
      {
        source: '/docs/client',
        destination:
          'https://github.com/CryogenicPlanet/invited/blob/master/packages/client-package/README.md',
        permanent: true
      }
    ]
  }
}
