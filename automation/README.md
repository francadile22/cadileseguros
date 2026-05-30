# Automatización de contenido — Estudio Cadile (Fase 2)

Sistema para generar **artículos de blog** (MDX) y **posteos de redes** (arte + carrusel + captions)
en borrador, con el branding y las reglas de Estudio Cadile. Vos revisás y aprobás; nada se publica solo.

## Piezas

| Archivo | Qué hace |
| --- | --- |
| `content-calendar.json` | 25 temas reales y buscables, con estado (`idea → borrador → aprobado → publicado`). |
| `generate-post.ts` | Genera un artículo de blog en MDX (`content/blog/<slug>.mdx`, `draft: true`). |
| `generate-social.ts` | Genera un posteo (`content/social/<slug>.json`, `status: borrador`): arte, carrusel y captions. |
| `run-pipeline.ts` | Toma los próximos temas en `idea` y genera blog + redes en borrador. |
| `lib/` | Cliente de Claude, prompts (con las reglas de marca), búsqueda de fotos gratis (Pexels) y utilidades. |

## Uso

```bash
# Un artículo puntual
npm run content:post -- --tema "Qué cubre el seguro de hogar" --keyword "que cubre seguro hogar" --cobertura seguro-hogar

# Un posteo puntual
npm run content:social -- --tema "Qué es la franquicia" --keyword "que es la franquicia"

# Desde el calendario (por id)
npm run content:post -- --id 3
npm run content:social -- --id 6

# Pipeline semanal (2 temas por defecto)
npm run content:pipeline -- --count 3

# Modo --dry: genera PLANTILLAS sin llamar a la IA (para probar sin API key)
npm run content:post -- --tema "Prueba" --dry
```

Requiere `ANTHROPIC_API_KEY` en el entorno (salvo `--dry`).
Opcional: `PEXELS_API_KEY` (gratis) para sugerir fotos de blog; `CONTENT_MODEL` (default `claude-sonnet-4-6`).

## Imágenes

- **Redes:** el arte se renderiza con el branding desde la web: `/(api)/social?id=<slug>` (1080×1350,
  sirve para Instagram, Facebook y LinkedIn). El JSON del posteo define título, cuerpo, carrusel y captions.
- **Blog:** la portada se puede generar branded (motor `next/og`) y, si configurás `PEXELS_API_KEY`,
  el generador sugiere una **foto gratuita** (con su atribución) para ilustrar dentro del texto.

## Revisión y aprobación (sin base de datos)

1. **Panel `/studio`** (protegido con `STUDIO_PASSWORD`): ves el arte + el copy y aprobás/descartás con un botón.
2. **Pull Request semanal**: el GitHub Action (`.github/workflows/content.yml`) corre el pipeline y abre un PR
   con los borradores. Mergeás para publicar.

## Disparar desde Routine / n8n

Llamá al script en un runner (o un contenedor) con la variable `ANTHROPIC_API_KEY`:

```bash
npx tsx automation/run-pipeline.ts --count 2
```

…y luego commiteá/pusheá los cambios (o abrí un PR) como hace el workflow de GitHub.

## Costos aproximados

- **Blog (Claude Sonnet):** ~3.000–5.000 tokens de salida por artículo → unos pocos centavos de USD por nota.
- **Social (Claude Sonnet):** ~800–1.500 tokens por posteo → fracción de centavo.
- **Imágenes:** las branded son gratis (se renderizan en tu propio deploy); Pexels es gratis con atribución.
- **Control de gasto:** generá pocos temas por corrida (`--count`), usá `--dry` para probar y, si querés bajar
  costo, cambiá `CONTENT_MODEL` a un modelo más económico (ej. `claude-haiku-4-5-20251001`).
