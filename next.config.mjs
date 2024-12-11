/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
};

export default nextConfig;
