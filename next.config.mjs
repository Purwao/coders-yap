/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.w3schools.com',
        pathname: '/w3css/**',
      },
    ],
  },
   experimental: {
    mdxRs: true, 
  },
};

export default nextConfig;
