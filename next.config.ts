// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    bodySizeLimit: '10mb', // Adjust this value as needed (e.g., '5mb', '10mb')
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cchujnksrxotudotdnjx.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],

  },
}

module.exports = nextConfig