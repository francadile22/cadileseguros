import type { Metadata, Viewport } from 'next';
import { Fraunces, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { business } from '@/config/business';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { JsonLd } from '@/components/JsonLd';
import { insuranceAgencySchema, organizationSchema } from '@/lib/seo';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz'],
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken',
});

export const viewport: Viewport = {
  themeColor: '#0E3A45',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: 'Estudio Cadile | Seguros con asesoramiento real en La Plata',
    template: '%s',
  },
  description:
    'Estudio Cadile, Productor Asesor de Seguros matriculado (SSN 105506). Comparamos compañías líderes, te asesoramos sin costo y te acompañamos en el siniestro. La Plata y todo el país.',
  applicationName: business.name,
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  formatDetection: { telephone: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd data={[insuranceAgencySchema(), organizationSchema()]} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-petrol focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-bone"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFab />
        <Chatbot />
      </body>
    </html>
  );
}
