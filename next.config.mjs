/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.29.196:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
