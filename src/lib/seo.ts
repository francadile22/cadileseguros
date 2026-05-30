import type { Metadata } from 'next';
import { business } from '@/config/business';
import { partnerCompanies } from '@/config/business';

const SITE = business.siteUrl;

/**
 * Helper de Metadata por página, con defaults coherentes (OG, Twitter, canonical).
 * La imagen OG se genera por convención de archivo (src/app/opengraph-image.tsx),
 * así que no hace falta declararla acá.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      locale: 'es_AR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD Schema.org generators (AEO / GEO)                           */
/* ------------------------------------------------------------------ */

export function insuranceAgencySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['InsuranceAgency', 'LocalBusiness', 'FinancialService'],
    '@id': `${SITE}/#organization`,
    name: business.name,
    description: business.whatItIs,
    url: SITE,
    telephone: business.phone.e164,
    email: business.email,
    image: `${SITE}/og-default.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.address.geo.lat,
      longitude: business.address.geo.lng,
    },
    areaServed: business.serviceArea,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    sameAs: [business.instagram.url],
    // Matrícula SSN como credencial / identificador profesional
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Matrícula SSN',
      value: business.license.number,
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Productor Asesor de Seguros',
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: business.ssn.name,
        url: business.ssn.url,
      },
    },
    knowsAbout: partnerCompanies.map((c) => c.name),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#org-base`,
    name: business.name,
    url: SITE,
    email: business.email,
    telephone: business.phone.e164,
    sameAs: [business.instagram.url],
    description: `${business.name} — ${business.legalRole}. ${business.license.label}, registrado en la ${business.ssn.name}.`,
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    url: `${SITE}/coberturas/${slug}`,
    provider: { '@id': `${SITE}/#organization` },
    areaServed: business.serviceArea,
    category: 'Seguros',
  };
}

export function howToReportClaimSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo denunciar un siniestro paso a paso',
    description:
      'Pasos para denunciar un siniestro en Argentina ante tu aseguradora, con el acompañamiento de un Productor Asesor matriculado.',
    step: [
      { '@type': 'HowToStep', name: 'Poné a salvo a las personas', text: 'Lo primero es la seguridad. Si hay heridos, llamá al 911 o a emergencias médicas.' },
      { '@type': 'HowToStep', name: 'Reuní la información', text: 'Sacá fotos, anotá datos de los involucrados y, si corresponde, hacé la denuncia policial.' },
      { '@type': 'HowToStep', name: 'Avisá a tu productor', text: 'Contactá a Estudio Cadile lo antes posible: te guiamos con la documentación.' },
      { '@type': 'HowToStep', name: 'Denunciá dentro de las 72 horas', text: 'La denuncia a la aseguradora debe hacerse en general dentro de las 72 hs (Ley 17.418).' },
      { '@type': 'HowToStep', name: 'Seguimiento del reclamo', text: 'Hacemos el seguimiento del expediente hasta la resolución.' },
    ],
  };
}

export function articleSchema({
  title,
  description,
  slug,
  author,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  slug: string;
  author: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE}/blog/${slug}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@type': 'Person', name: author },
    publisher: { '@id': `${SITE}/#organization` },
    mainEntityOfPage: `${SITE}/blog/${slug}`,
  };
}
