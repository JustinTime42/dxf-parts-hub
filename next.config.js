module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/storage/v1/object/public/**',
        },
      ],
    },
  }