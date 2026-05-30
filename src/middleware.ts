import { NextResponse, type NextRequest } from 'next/server';

/**
 * Protege /studio y /api/studio con autenticación básica (sin base de datos).
 * Definí STUDIO_PASSWORD en el entorno (Vercel). Usuario: "cadile".
 * Si no hay STUDIO_PASSWORD configurada, el panel queda bloqueado por seguridad.
 */
export const config = {
  matcher: ['/studio/:path*', '/api/studio/:path*'],
};

export function middleware(req: NextRequest) {
  const expected = process.env.STUDIO_PASSWORD;

  if (!expected) {
    return new NextResponse('Panel deshabilitado: definí STUDIO_PASSWORD en el entorno.', {
      status: 503,
    });
  }

  const auth = req.headers.get('authorization');
  if (auth) {
    const [, encoded] = auth.split(' ');
    const decoded = atob(encoded || '');
    const [user, pass] = decoded.split(':');
    if (user === 'cadile' && pass === expected) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Autenticación requerida', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Estudio Cadile · Studio"' },
  });
}
