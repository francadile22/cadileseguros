# Estudio Cadile — Sitio web + Chatbot experto en seguros

Sitio de **Estudio Cadile**, Productor Asesor de Seguros (PAS) matriculado (SSN N° 105506).
Next.js (App Router) + TypeScript + Tailwind, con SEO técnico, AEO/GEO (Schema.org, `llms.txt`),
cotizador multi-paso, centro de siniestros y un **asistente conversacional con streaming**
basado en la API de Anthropic (Claude).

> Estudio Cadile es un **intermediario** (PAS): asesora y coloca pólizas en compañías aseguradoras.
> **No es una compañía aseguradora.** Este principio está reforzado en todo el sitio.

---

## Stack

- **Next.js 14** (App Router, SSG) + **TypeScript**
- **Tailwind CSS** (paleta "Editorial confiable": azul petróleo + ámbar, fuentes Fraunces + Hanken Grotesk)
- **@anthropic-ai/sdk** para el chatbot (streaming, prompt caching de la KB)
- **Resend** para el envío de leads por email (+ webhook opcional)
- **gray-matter** + **react-markdown** para blog y base de conocimiento por archivos
- **lucide-react** para iconografía

---

## Correr en local

```bash
npm install
cp .env.example .env.local   # completá las variables (ver abajo)
npm run dev                  # http://localhost:3000
```

Build de producción:

```bash
npm run build && npm run start
```

> El sitio funciona sin variables de entorno: el chatbot mostrará un aviso de "no configurado"
> y el cotizador registrará los leads en consola hasta que cargues las claves.

---

## Variables de entorno

Ver `.env.example`. Resumen:

| Variable | Uso | Obligatoria |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | API de Claude para el chatbot | Para que funcione el chat |
| `CHAT_MODEL` | Modelo del chat (default `claude-haiku-4-5-20251001`) | No |
| `RESEND_API_KEY` | Envío de leads por email | Recomendada |
| `LEAD_FROM_EMAIL` | Remitente verificado en Resend | Con Resend |
| `LEAD_TO_EMAIL` | Casilla que recibe los leads (default: email del negocio) | No |
| `LEAD_WEBHOOK_URL` | Webhook (n8n / Routine / CRM) que recibe cada lead en JSON | No |

**Nunca** expongas `ANTHROPIC_API_KEY` en el cliente: solo se usa del lado servidor en `/app/api/chat`.

---

## Estructura

```
config/business.ts            ← FUENTE ÚNICA de datos del negocio (editá acá)
content/
  coberturas (en src/lib)     ← registro tipado de coberturas
  blog/*.md                   ← artículos (frontmatter + markdown)
  kb/*.md                     ← base de conocimiento del chatbot
src/
  app/                        ← rutas (App Router)
    api/chat/route.ts         ← chatbot (streaming, rate limit, cache KB)
    api/cotizar/route.ts      ← leads (Resend + webhook, honeypot, rate limit)
    coberturas/[slug]/        ← landing por cobertura (SSG, SEO long-tail)
    blog/[slug]/              ← artículo (SSG)
    sitemap.ts / robots.ts    ← SEO técnico
    opengraph-image.tsx       ← OG dinámico (next/og)
  components/                 ← UI (Header, Footer, Chatbot, Cotizador, etc.)
  lib/                        ← seo, coberturas, blog, kb, chat-prompt, utils
public/
  llms.txt / llms-full.txt    ← contexto para crawlers de IA (AEO/GEO)
  favicon.svg
```

---

## Cómo editar contenido

### Datos del negocio
Editá **`config/business.ts`** (contacto, matrícula, dirección, compañías). Cambian en todo el sitio.

### Agregar una cobertura con landing propia
1. Abrí `src/lib/coberturas.ts`.
2. Sumá un objeto a `coberturasFull` con `published: true` (copiá uno existente como plantilla:
   `slug`, `metaTitle`, `summary`, `coversTable`, `faqs`, etc.).
3. Listo: se genera la página `/coberturas/<slug>` (SSG), aparece en el hub y en el sitemap,
   con su Schema `Service` + `FAQPage`.

> Para una cobertura sin landing todavía, sumala a `otherCoverages` (aparece como tarjeta "Cotizar").

### Agregar un post al blog
1. Creá `content/blog/mi-articulo.md` con frontmatter:
   ```md
   ---
   title: "Título con keyword"
   description: "Meta description (140-160 caracteres)."
   date: "2025-10-01"
   author: "Equipo Estudio Cadile"
   category: "Seguro de auto"
   excerpt: "Respuesta-primero citable para AEO."
   readingMinutes: 6
   cta: "seguro-automotor"   # slug de cobertura a la que invitar a cotizar
   draft: false              # true = no se publica
   ---
   ```
2. Escribí el cuerpo en markdown (usá H2 en forma de pregunta y una tabla cubre/no cubre para AEO).
3. Se genera `/blog/<slug>` con Schema `Article`.

### Ampliar la base de conocimiento del chatbot
La KB vive en **`content/kb/*.md`** (glosario, siniestros, marco legal, FAQ por cobertura).
- Agregá o editá archivos `.md` con frontmatter `title` y `tags` (las tags mejoran el matching).
- El bot selecciona los documentos más relevantes por keywords (RAG simple) y los inyecta como
  contexto. **Cuanto mejor sea la KB, mejor responde el bot.** No requiere redeploy de código:
  basta con editar los `.md` y volver a desplegar.

---

## Chatbot: cómo funciona y control de costos

- **Backend:** `src/app/api/chat/route.ts` llama a Claude con **streaming** (token a token).
- **System prompt:** `src/lib/chat-prompt.ts` arma el rol, límites, datos del negocio y la KB
  relevante (`src/lib/kb.ts`, RAG por keywords; la arquitectura queda lista para enchufar
  embeddings/vector store).
- **Guardarraíles:** solo habla de seguros, no da asesoramiento vinculante ni cotizaciones exactas,
  no inventa cláusulas, deriva a WhatsApp/cotizador ante intención de contratar/denunciar, y muestra
  disclaimer visible. Incluye **rate limiting** por IP y recorte de historial/entrada.
- **Costos:** por defecto usa `claude-haiku-4-5` (económico), con `max_tokens` acotado (700),
  historial recortado (10 mensajes) y **prompt caching** del system+KB para abaratar mensajes
  repetidos. Para subir calidad, cambiá `CHAT_MODEL` a `claude-sonnet-4-6`.
- **Multi-instancia:** el rate limit es en memoria (suficiente para single-instance). Para varias
  instancias, reemplazá el `Map` por Upstash/Redis.

---

## Deploy en Vercel (paso a paso)

1. Subí el repo a GitHub (ya está en este repositorio).
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importá el repo.
3. Framework: **Next.js** (autodetectado). No hace falta configurar build commands.
4. En **Environment Variables**, cargá `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `LEAD_FROM_EMAIL`,
   `LEAD_TO_EMAIL` (y `LEAD_WEBHOOK_URL` si lo usás).
5. **Deploy.** Vercel te da una URL de preview y, al promover, producción.
6. Configurá tu dominio (`estudiocadile.com.ar`) en **Settings → Domains** y actualizá
   `business.siteUrl` en `config/business.ts`.

---

## Checklist de calidad (Fase 1)

- **SEO** ✔ Metadata por página, canonical, títulos con keyword + localidad, sitemap dinámico,
  robots, URLs en español, encabezados semánticos, enlazado interno y breadcrumbs.
- **AEO / Schema** ✔ JSON-LD `InsuranceAgency`/`LocalBusiness`/`FinancialService`, `Organization`,
  `FAQPage`, `Service`, `BreadcrumbList`, `Article`, `HowTo` (siniestros). `llms.txt` + `llms-full.txt`.
  Respuesta-primero y tablas cubre/no cubre.
- **Accesibilidad** ✔ WCAG 2.1 AA: foco visible, skip link, roles ARIA, navegación por teclado,
  `prefers-reduced-motion`, contraste y textos alternativos.
- **Performance** ✔ SSG, `next/font`, OG por `next/og`, JS inicial ~90–100 kB, sin librerías pesadas.
- **Legales** ✔ Matrícula SSN, organismo de control, "no es aseguradora", Aviso Legal y Privacidad
  (Ley 25.326), consentimiento en formularios y disclaimer en el chatbot.

---

## Notas pendientes (reemplazar por datos reales)

- QR de AFIP / Data Fiscal en el footer (placeholder marcado).
- Testimonios y equipo (placeholders editables).
- Logo SSN oficial (texto provisorio).
- Formularios PDF descargables en `/public/formularios/`.
