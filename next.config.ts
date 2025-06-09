
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three', 'globe.gl', 'three-globe'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto', 
    });
    return config;
  },
};

export default nextConfig;
