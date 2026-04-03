/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'http://192.168.2.186:8080/api/:path*' },
    ];
  },
};

export default nextConfig;



