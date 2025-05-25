import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { SERVER_URL: process.env.SERVER_URL },
  images: {
    domains: [
      "ziqxesyaovpowhccmwiw.supabase.co", // 👈 додай сюди хост Supabase
    ],
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ziqxesyaovpowhccmwiw.supabase.co",
        pathname: "/storage/v1/object/public/book-covers/**",
      },
    ],
  },
  // images: {
  //   remotePatterns: [
  //     { protocol: "https", hostname: "" },
  //     { protocol: "https", hostname: "" },
  //   ],
  // },
};

export default nextConfig;
