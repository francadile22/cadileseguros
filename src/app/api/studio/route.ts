import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Aprueba o descarta borradores de contenido. Sin base de datos: muta los
 * archivos en /content.
 *  - En local (npm run dev): escribe directo en el filesystem.
 *  - En Vercel (FS de solo lectura): si hay GITHUB_TOKEN + GITHUB_REPO, commitea
 *    el cambio vía API de GitHub; si no, responde con instrucciones.
 *
 * Protegido por el middleware (Basic Auth con STUDIO_PASSWORD).
 */

interface Body {
  type: 'social' | 'blog';
  id: string;
  action: 'aprobar' | 'descartar';
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 });
  }

  const { type, id, action } = body;
  const rel =
    type === 'social' ? path.join('content', 'social', `${id}.json`) : path.join('content', 'blog', `${id}.mdx`);
  const abs = path.join(process.cwd(), rel);

  if (!fs.existsSync(abs) && action !== 'descartar') {
    return Response.json({ ok: false, error: 'No encontré el borrador.' }, { status: 404 });
  }

  // Calcula el nuevo contenido (o null si se descarta).
  let newContent: string | null = null;
  if (action === 'aprobar') {
    const current = fs.readFileSync(abs, 'utf-8');
    if (type === 'social') {
      const json = JSON.parse(current);
      json.status = 'aprobado';
      if (!json.fecha) json.fecha = new Date().toISOString().slice(0, 10);
      newContent = JSON.stringify(json, null, 2) + '\n';
    } else {
      newContent = current.replace(/^draft:\s*true\s*$/m, 'draft: false');
    }
  }

  // 1) Intento local (filesystem editable).
  try {
    if (action === 'descartar') {
      if (fs.existsSync(abs)) fs.unlinkSync(abs);
    } else if (newContent !== null) {
      fs.writeFileSync(abs, newContent);
    }
    return Response.json({ ok: true, via: 'fs' });
  } catch {
    // 2) FS de solo lectura (Vercel) → API de GitHub.
    const gh = await commitViaGithub(rel, newContent, action);
    if (gh.ok) return Response.json({ ok: true, via: 'github' });
    return Response.json(
      {
        ok: false,
        error:
          'No pude escribir el archivo (entorno de solo lectura) y no hay GITHUB_TOKEN configurado. Aprobá el contenido editando el archivo o desde el Pull Request.',
      },
      { status: 501 },
    );
  }
}

async function commitViaGithub(
  rel: string,
  content: string | null,
  action: 'aprobar' | 'descartar',
): Promise<{ ok: boolean }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/repo"
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token || !repo) return { ok: false };

  const api = `https://api.github.com/repos/${repo}/contents/${rel}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  try {
    const meta = await fetch(`${api}?ref=${branch}`, { headers }).then((r) => r.json());
    const sha = meta?.sha as string | undefined;
    if (action === 'descartar') {
      if (!sha) return { ok: true };
      const res = await fetch(api, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ message: `studio: descartar ${rel}`, sha, branch }),
      });
      return { ok: res.ok };
    }
    const res = await fetch(api, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `studio: aprobar ${rel}`,
        content: Buffer.from(content ?? '').toString('base64'),
        sha,
        branch,
      }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
