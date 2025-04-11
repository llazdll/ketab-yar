import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
    }
  ]
};
module.exports = {
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/a/ACg8ocKQ2CxF0AIlmRP5g_5mSYy_vsF0ej11-Hx304ySuPDHmv21BA=s96-c')],
  },
}

export default nextConfig;
