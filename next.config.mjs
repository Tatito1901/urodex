/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  // Garantizar que los archivos estáticos se manejen correctamente
  output: 'standalone',
  // Configuración específica para Vercel
  async headers() {
    return [
      {
        // Aplicar estas configuraciones a todos los archivos en /images
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Caché por 1 año
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Permitir acceso desde cualquier origen
          },
        ],
      },
      {
        // Configuración específica para archivos MP4
        source: '/images/:path*.mp4',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
    ];
  },
}

export default nextConfig
