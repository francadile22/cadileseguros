import type { MetadataRoute } from 'next';
import { business } from '@/config/business';
import { getAllCoberturaSlugs } from '@/lib/coberturas';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl;
  const now = new Date();

  const staticRoutes = [
    '',
    '/coberturas',
    '/cotizar',
    '/siniestros',
    '/tramites',
    '/nosotros',
    '/blog',
    '/preguntas-frecuentes',
    '/contacto',
    '/aviso-legal',
    '/privacidad',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const coberturas = getAllCoberturaSlugs().map((slug) => ({
    url: `${base}/coberturas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...coberturas, ...posts];
}
