/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Atajos amigables hacia las secciones clave
      { source: '/whatsapp', destination: 'https://wa.me/5492215401604', permanent: false },
    ];
  },
};

export default nextConfig;
