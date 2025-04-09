/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        });
        return config;
    },
    output: 'standalone',
    // Add serverless function configuration
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname
    },
    // Add API specific configuration
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*',
            },
        ];
    },
};

export default nextConfig;
