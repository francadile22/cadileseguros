/**
 * Carga las fuentes de marca (Fraunces display + Hanken body) para next/og (Satori).
 * Intenta traerlas desde Google Fonts; si la red falla, devuelve null y se usa el
 * fallback del motor. Se cachea en memoria entre invocaciones.
 */

type FontData = { name: string; data: ArrayBuffer; weight: 400 | 600 | 700; style: 'normal' };

let _cache: FontData[] | null = null;

async function fetchGoogleFont(
  family: string,
  weight: number,
  name: string,
): Promise<FontData | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`;
    const css = await fetch(cssUrl, {
      signal: ctrl.signal,
      headers: {
        // UA "viejo" => Google devuelve URLs .ttf (Satori no lee woff2).
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40 Safari/537.36',
      },
    }).then((r) => r.text());

    const match = css.match(/src:\s*url\(([^)]+\.ttf)\)/);
    if (!match) {
      clearTimeout(t);
      return null;
    }
    const data = await fetch(match[1], { signal: ctrl.signal }).then((r) => r.arrayBuffer());
    clearTimeout(t);
    return { name, data, weight: weight as 400 | 600 | 700, style: 'normal' };
  } catch {
    return null;
  }
}

export async function loadBrandFonts(): Promise<FontData[]> {
  if (_cache) return _cache;
  const results = await Promise.all([
    fetchGoogleFont('Fraunces', 600, 'Fraunces'),
    fetchGoogleFont('Hanken+Grotesk', 400, 'Hanken Grotesk'),
    fetchGoogleFont('Hanken+Grotesk', 600, 'Hanken Grotesk'),
  ]);
  _cache = results.filter((f): f is FontData => f !== null);
  return _cache;
}
