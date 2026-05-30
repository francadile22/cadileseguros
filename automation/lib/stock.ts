/**
 * Busca una foto gratuita (Pexels) para ilustrar el blog.
 * Requiere PEXELS_API_KEY (gratis en https://www.pexels.com/api/). Devuelve la
 * info para descargar + la atribución obligatoria. Si no hay key, devuelve null
 * y el artículo usa la portada branded como única imagen.
 */
export interface StockPhoto {
  url: string; // URL de descarga (tamaño large)
  alt: string;
  photographer: string;
  credit: string; // texto de atribución para incrustar
  source: string; // URL de la foto en Pexels
}

export async function findStockPhoto(query: string): Promise<StockPhoto | null> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&locale=es-ES`,
      { headers: { Authorization: key } },
    );
    const data = await res.json();
    const p = data?.photos?.[0];
    if (!p) return null;
    return {
      url: p.src?.large2x || p.src?.large,
      alt: p.alt || query,
      photographer: p.photographer,
      credit: `Foto de ${p.photographer} en Pexels`,
      source: p.url,
    };
  } catch {
    return null;
  }
}
