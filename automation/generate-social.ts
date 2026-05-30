/**
 * Genera un posteo de redes (borrador) para Estudio Cadile: arte + carrusel + captions.
 *
 *   npx tsx automation/generate-social.ts --tema "Qué es la franquicia" --keyword "que es la franquicia"
 *   npx tsx automation/generate-social.ts --id 6
 *   npx tsx automation/generate-social.ts --tema "..." --dry
 *
 * Salida: content/social/<slug>.json (status: "borrador"). El arte se previsualiza
 * con /api/social?id=<slug> y se aprueba en /studio.
 */
import fs from 'fs';
import path from 'path';
import { complete } from './lib/claude';
import { socialSystem, socialUser } from './lib/prompts';
import { slugify, arg, hasFlag, extractJson } from './lib/util';

const SOCIAL_DIR = path.join(process.cwd(), 'content', 'social');

async function main() {
  let tema = arg('tema');
  let keyword = arg('keyword') || tema || '';

  const id = arg('id');
  if (id) {
    const cal = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'automation', 'content-calendar.json'), 'utf-8'),
    );
    const item = cal.items.find((x: { id: number }) => x.id === Number(id));
    if (!item) throw new Error(`No encontré el tema ${id} en el calendario.`);
    tema = item.tema;
    keyword = item.keyword;
  }
  if (!tema) throw new Error('Falta --tema (o --id del calendario).');

  const slug = slugify(tema);
  let data: Record<string, unknown>;

  if (hasFlag('dry')) {
    data = dryTemplate(tema);
  } else {
    console.log(`🎨 Generando posteo: "${tema}"…`);
    const raw = await complete(socialSystem(), socialUser(tema, keyword), 2000);
    data = JSON.parse(extractJson(raw));
  }

  const post = {
    id: slug,
    tema,
    status: 'borrador',
    fecha: null,
    ...data,
  };

  fs.mkdirSync(SOCIAL_DIR, { recursive: true });
  fs.writeFileSync(path.join(SOCIAL_DIR, `${slug}.json`), JSON.stringify(post, null, 2) + '\n');
  console.log(`✅ Borrador guardado en content/social/${slug}.json`);
  console.log(`   Previsualizá el arte en: /api/social?id=${slug}`);
}

function dryTemplate(tema: string) {
  return {
    kind: 'concepto',
    eyebrow: 'Diccionario de seguros',
    title: tema.slice(0, 45),
    body: `Explicación breve sobre ${tema}. (Plantilla --dry, completar con IA.)`,
    footerNote: 'Te asesoramos sin compromiso · (221) 540-1604',
    carousel: ['Portada', 'Punto 1', 'Punto 2', 'Punto 3', 'CTA'],
    captions: [`Caption de ejemplo sobre ${tema}. ℹ️ Info general orientativa.`],
    hashtags: ['#Seguros', '#LaPlata', '#EstudioCadile'],
    imagePrompt: `editorial illustrative photo about ${tema}`,
  };
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
