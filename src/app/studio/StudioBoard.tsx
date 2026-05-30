'use client';

import { useState } from 'react';
import { Check, Trash2, Copy, ExternalLink, Loader2, ImageIcon } from 'lucide-react';
import type { SocialPost } from '@/lib/social/posts';
import { cn } from '@/lib/utils';

interface BlogItem {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  draft: boolean;
  date: string;
}

const statusStyle: Record<string, string> = {
  borrador: 'bg-amber-100 text-amber-700',
  aprobado: 'bg-emerald-100 text-emerald-700',
  publicado: 'bg-petrol-100 text-petrol',
};

export function StudioBoard({ social, blog }: { social: SocialPost[]; blog: BlogItem[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState('');

  async function act(type: 'social' | 'blog', id: string, action: 'aprobar' | 'descartar') {
    if (action === 'descartar' && !confirm('¿Descartar este borrador? Se elimina.')) return;
    setBusy(`${type}:${id}`);
    setMsg('');
    try {
      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'No se pudo.');
      setHidden((h) => new Set(h).add(`${type}:${id}`));
      setMsg(action === 'aprobar' ? '✅ Aprobado.' : '🗑️ Descartado.');
    } catch (e) {
      setMsg('❌ ' + (e instanceof Error ? e.message : 'Error'));
    } finally {
      setBusy(null);
    }
  }

  function copy(text: string) {
    navigator.clipboard?.writeText(text);
    setMsg('📋 Copiado al portapapeles.');
  }

  return (
    <div className="space-y-12">
      {msg && (
        <div className="sticky top-20 z-10 rounded-full border border-petrol-100 bg-white/90 px-4 py-2 text-sm text-petrol shadow-soft backdrop-blur">
          {msg}
        </div>
      )}

      {/* REDES */}
      <section>
        <h2 className="mb-5 text-2xl">Posteos para redes ({social.length})</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {social.map((p) => {
            const key = `social:${p.id}`;
            if (hidden.has(key)) return null;
            return (
              <div key={p.id} className="card flex flex-col gap-4 sm:flex-row">
                {/* Arte */}
                <div className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/social?id=${p.id}`}
                    alt={`Arte: ${p.title}`}
                    width={180}
                    height={225}
                    className="w-full rounded-xl border border-petrol-100 sm:w-44"
                  />
                  <a
                    href={`/api/social?id=${p.id}`}
                    target="_blank"
                    rel="noopener"
                    className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-petrol"
                  >
                    <ImageIcon className="h-3.5 w-3.5" /> Ver tamaño real
                  </a>
                </div>

                {/* Copy */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', statusStyle[p.status])}>
                      {p.status}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-petrol/50">{p.kind}</span>
                  </div>
                  <h3 className="mt-2 text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-xs leading-relaxed text-ink/70">
                    {p.captions[0]}
                  </p>
                  <p className="mt-2 text-xs text-petrol/60">{p.hashtags.join(' ')}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => act('social', p.id, 'aprobar')}
                      disabled={busy === key}
                      className="btn-primary px-4 py-2 text-xs"
                    >
                      {busy === key ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                      Aprobar
                    </button>
                    <button onClick={() => copy(p.captions[0])} className="btn-secondary px-4 py-2 text-xs">
                      <Copy className="h-3.5 w-3.5" /> Copiar caption
                    </button>
                    <button
                      onClick={() => act('social', p.id, 'descartar')}
                      disabled={busy === key}
                      className="btn-ghost px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Descartar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BLOG */}
      <section>
        <h2 className="mb-5 text-2xl">Artículos del blog ({blog.length})</h2>
        <div className="space-y-3">
          {blog.map((b) => {
            const key = `blog:${b.slug}`;
            if (hidden.has(key)) return null;
            return (
              <div key={b.slug} className="card flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        b.draft ? statusStyle.borrador : statusStyle.publicado,
                      )}
                    >
                      {b.draft ? 'borrador' : 'publicado'}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-petrol/50">{b.category}</span>
                  </div>
                  <h3 className="mt-1.5 truncate text-lg">{b.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-ink/60">{b.excerpt}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a href={`/blog/${b.slug}`} target="_blank" rel="noopener" className="btn-secondary px-3 py-2 text-xs">
                    <ExternalLink className="h-3.5 w-3.5" /> Ver
                  </a>
                  {b.draft && (
                    <button
                      onClick={() => act('blog', b.slug, 'aprobar')}
                      disabled={busy === key}
                      className="btn-primary px-4 py-2 text-xs"
                    >
                      {busy === key ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                      Publicar
                    </button>
                  )}
                  <button
                    onClick={() => act('blog', b.slug, 'descartar')}
                    disabled={busy === key}
                    className="btn-ghost px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Descartar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
