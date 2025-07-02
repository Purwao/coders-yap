/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.w3schools.com',
        pathname: '/w3css/**',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
    ],
  },
   experimental: {
    mdxRs: true, 
  },
};

export default nextConfig;
