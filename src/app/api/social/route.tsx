import { ImageResponse } from 'next/og';
import { business } from '@/config/business';
import { getPost, firstPostId } from '@/lib/social/posts';
import { loadBrandFonts } from '@/lib/social/fonts';

export const runtime = 'nodejs';

const PETROL = '#0E3A45';
const PETROL_DARK = '#08242B';
const BONE = '#FAF8F4';
const AMBER = '#E0A04B';
const MUTED = '#9CBEC3';

// Instagram retrato (4:5). Sirve igual para Facebook y LinkedIn.
const W = 1080;
const H = 1350;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || firstPostId();
  const post = getPost(id);
  if (!post) {
    return new Response('Post no encontrado', { status: 404 });
  }
  const fonts = await loadBrandFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `linear-gradient(150deg, ${PETROL} 0%, ${PETROL_DARK} 100%)`,
          padding: 84,
          color: BONE,
          fontFamily: 'Hanken Grotesk, sans-serif',
          position: 'relative',
        }}
      >
        {/* Halos de acento (Satori no soporta filter: blur, usamos círculos translúcidos) */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: 'rgba(224,160,75,0.16)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 360,
            height: 360,
            borderRadius: 360,
            background: 'rgba(46,100,110,0.35)',
          }}
        />

        {/* Cabecera: marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: AMBER,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: PETROL_DARK,
              fontSize: 50,
              fontWeight: 700,
              fontFamily: 'Fraunces, serif',
            }}
          >
            C
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 34, fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
              {business.name}
            </div>
            <div style={{ fontSize: 20, color: MUTED, letterSpacing: 2 }}>
              {`ASESORES EN SEGUROS · SSN ${business.license.number}`}
            </div>
          </div>
        </div>

        {/* Cuerpo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              background: 'rgba(224,160,75,0.16)',
              border: `1px solid ${AMBER}`,
              color: AMBER,
              borderRadius: 999,
              padding: '12px 26px',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 36,
            }}
          >
            {post.eyebrow}
          </div>

          <div
            style={{
              fontSize: post.title.length > 34 ? 82 : 96,
              lineHeight: 1.04,
              fontWeight: 600,
              fontFamily: 'Fraunces, serif',
              letterSpacing: -1,
              maxWidth: 880,
            }}
          >
            {post.title}
          </div>

          {/* Subrayado de acento */}
          <div style={{ width: 140, height: 8, background: AMBER, borderRadius: 8, marginTop: 36 }} />

          <div
            style={{
              fontSize: 34,
              lineHeight: 1.4,
              color: '#E6DECF',
              marginTop: 36,
              maxWidth: 860,
            }}
          >
            {post.body}
          </div>
        </div>

        {/* Pie */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(250,248,244,0.18)',
            paddingTop: 30,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, fontWeight: 600 }}>{business.instagram.handle}</div>
            <div style={{ fontSize: 22, color: MUTED }}>{post.footerNote}</div>
          </div>
          <div style={{ fontSize: 26, color: AMBER, fontWeight: 600 }}>{business.phone.display}</div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: fonts.length
        ? fonts.map((f) => ({ name: f.name, data: f.data, weight: f.weight, style: f.style }))
        : undefined,
    },
  );
}
