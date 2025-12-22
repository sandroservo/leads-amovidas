import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  compress: true,
  swcMinify: true,
  experimental: {
    optimizeCss: false, // Desabilitar otimização CSS para acelerar build
  },
};

export default nextConfig;
