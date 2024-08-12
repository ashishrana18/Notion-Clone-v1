/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'files.edgestore.dev',
          pathname: '/**',
        },
      ],
    },
    reactStrictMode: true,
    swcMinify: true,
  };
  
  export default nextConfig;
  