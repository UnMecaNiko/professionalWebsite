/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /*
      `unoptimized: true` shipped every photo at full size and in its original
      format. The project covers live in the content repository's Supabase
      bucket, so the optimizer needs to be told that host is allowed.
    */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ykvgpcusdnzyzsqjmksr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
}

export default nextConfig
