/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aofibiyydgbmgllhqpez.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**/**",
      },
    ],
  },
  output: "export ",
};

export default nextConfig;
