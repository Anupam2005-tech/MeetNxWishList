import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three', 'three-globe', 'react-globe.gl'],
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
    // This rule helps ensure that .mjs files within node_modules are correctly processed
    // as JavaScript modules by Webpack (or Turbopack's equivalent handling).
    // This can be crucial for packages that use the .mjs extension for their ES modules,
    // especially if the default loader configuration isn't handling them as expected,
    // even when they are included in transpilePackages.
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto', // Ensures Webpack (or its equivalent) handles it as a JS module, respecting its format.
    });
    return config;
  },
};

export default nextConfig;
