import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { SERVER_URL: process.env.SERVER_URL },
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ziqxesyaovpowhccmwiw.supabase.co",
        pathname: "/storage/v1/object/public/book-covers/**",
      },
      {
        protocol: "https",
        hostname: "ziqxesyaovpowhccmwiw.supabase.co",
        pathname: "/storage/v1/object/public/news-covers/**",
      },
      {
        protocol: "https",
        hostname: "ziqxesyaovpowhccmwiw.supabase.co",
        pathname: "/storage/v1/object/public/user-covers/**",
      },
    ],
  },
};

export default nextConfig;
