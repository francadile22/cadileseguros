/**
 * Genera un artículo de blog en MDX (borrador) para Estudio Cadile.
 *
 *   npx tsx automation/generate-post.ts --tema "Qué cubre el seguro de hogar" --keyword "que cubre seguro hogar" --cobertura seguro-hogar
 *   npx tsx automation/generate-post.ts --id 3            # toma el tema del calendario
 *   npx tsx automation/generate-post.ts --tema "..." --dry  # plantilla sin IA (para probar sin API key)
 *
 * El archivo sale con draft: true → se revisa en /studio o por PR antes de publicar.
 */
import fs from 'fs';
import path from 'path';
import { complete } from './lib/claude';
import { blogPostSystem, blogPostUser } from './lib/prompts';
import { slugify, arg, hasFlag } from './lib/util';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

async function main() {
  let tema = arg('tema');
  let keyword = arg('keyword') || tema || '';
  let cobertura = arg('cobertura') || null;

  const id = arg('id');
  if (id) {
    const cal = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'automation', 'content-calendar.json'), 'utf-8'),
    );
    const item = cal.items.find((x: { id: number }) => x.id === Number(id));
    if (!item) throw new Error(`No encontré el tema ${id} en el calendario.`);
    tema = item.tema;
    keyword = item.keyword;
    cobertura = item.cobertura;
  }

  if (!tema) throw new Error('Falta --tema (o --id del calendario).');

  const slug = slugify(tema);
  let mdx: string;

  if (hasFlag('dry')) {
    mdx = dryTemplate(tema, keyword, cobertura);
  } else {
    console.log(`✍️  Generando artículo: "${tema}"…`);
    mdx = await complete(blogPostSystem(), blogPostUser(tema, keyword, cobertura), 4500);
    mdx = mdx.replace(/^```(mdx|markdown)?\n?/i, '').replace(/```$/i, '').trim();
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  fs.writeFileSync(file, mdx + '\n');
  console.log(`✅ Borrador guardado en content/blog/${slug}.mdx (draft: true)`);
}

function dryTemplate(tema: string, keyword: string, cobertura: string | null): string {
  const today = new Date().toISOString().slice(0, 10);
  return `---
title: "${tema}"
description: "Guía sobre ${keyword} con el asesoramiento de Estudio Cadile (PAS matriculado)."
date: "${today}"
author: "Equipo Estudio Cadile"
category: "Guía"
excerpt: "Respuesta breve sobre ${keyword}. (Plantilla generada en modo --dry; completar con IA.)"
readingMinutes: 5
${cobertura ? `cta: "${cobertura}"` : '# cta: <slug de cobertura>'}
draft: true
---

(Plantilla de borrador — generada sin IA con --dry.)

Respuesta-primero a "${keyword}" en una o dos oraciones.

## ¿Pregunta frecuente sobre ${tema}?

Respuesta directa debajo del encabezado.

| Concepto | ¿Cubre? |
| --- | --- |
| Ejemplo | Sí |

## Preguntas frecuentes

**Pregunta 1**
Respuesta.

> Información general orientativa. No sustituye el asesoramiento de un Productor Asesor matriculado.
`;
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
