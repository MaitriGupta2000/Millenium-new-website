/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/products/duoview-15-6-airlink-wireless',
      destination: '/products/duoview-15-6-airlite-wireless',
      permanent: true,
    },
    {
      source: '/products/triview-14-ultrasleek',
      destination: '/products/triview-14-ultra-thin',
      permanent: true,
    },
    {
      source: '/products/triview-15-6-flexsplit',
      destination: '/products/triview-15-6-foldable-dual-monitor',
      permanent: true,
    },
  ],
};

export default nextConfig;
