import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { SERVER_URL: process.env.SERVER_URL },
  // images: {
  //   remotePatterns: [
  //     { protocol: "https", hostname: "" },
  //     { protocol: "https", hostname: "" },
  //   ],
  // },
};

export default nextConfig;
