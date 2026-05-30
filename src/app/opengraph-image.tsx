import { ImageResponse } from 'next/og';
import { business } from '@/config/business';

export const runtime = 'edge';
export const alt = `${business.name} — Productor Asesor de Seguros`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0E3A45 0%, #08242B 100%)',
          padding: '72px',
          fontFamily: 'Georgia, serif',
          color: '#FAF8F4',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#E0A04B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0E3A45',
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{business.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.05, maxWidth: 900 }}>
            Tu seguro, con asesoramiento real.
          </div>
          <div style={{ fontSize: 28, color: '#E6DECF', maxWidth: 820, fontFamily: 'sans-serif' }}>
            Productora de seguros · Comparamos compañías líderes y te acompañamos en el siniestro.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#9CBEC3',
            fontFamily: 'sans-serif',
          }}
        >
          <span>{business.license.label}</span>
          <span>La Plata · Argentina</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
