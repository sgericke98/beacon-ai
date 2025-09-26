import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { 
    serverActions: { allowedOrigins: ["*"] } 
  },
  async redirects() {
    return [
      // Preserve any legacy URLs if needed
      // Example: { source: "/old-path", destination: "/new-path", permanent: false },
    ];
  },
  images: { 
    unoptimized: true // Keep output identical; switch off if you adopt <Image>
  },
  // Preserve exact same build output
  output: 'standalone',
  // Keep the same path resolution as Vite
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd(), './src'),
    };
    return config;
  },
};

export default nextConfig;
