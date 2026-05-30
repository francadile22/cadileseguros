/**
 * FUENTE ÚNICA DE VERDAD del negocio.
 * Editá SOLO acá los datos de contacto, matrícula, compañías, etc.
 * Estos valores son reales (ver prompt). No inventar ni cambiar sin autorización.
 */

export const business = {
  name: 'Estudio Cadile',
  legalRole: 'Productor Asesor de Seguros (PAS)',
  // Aclaración obligatoria: es intermediario, NO una aseguradora.
  whatItIs:
    'Productora / broker de seguros: un intermediario matriculado que asesora, cotiza, gestiona y acompaña al cliente colocando pólizas en compañías aseguradoras. No es una compañía aseguradora.',

  // Matrícula y organismo de control
  license: {
    number: '105506',
    label: 'Matrícula SSN N° 105506',
    issuer: 'Superintendencia de Seguros de la Nación (SSN)',
  },
  ssn: {
    name: 'Superintendencia de Seguros de la Nación',
    phone: '0800-666-8400',
    phoneLabel: 'Atención al asegurado: 0800-666-8400',
    url: 'https://www.argentina.gob.ar/superintendencia-de-seguros',
  },

  // Contacto
  phone: {
    display: '(221) 540-1604',
    e164: '+5492215401604',
    whatsapp: 'https://wa.me/5492215401604',
  },
  email: 'cadile.contacto@gmail.com',
  hours: 'Lunes a viernes, de 8 a 16 hs',
  hoursSchema: 'Mo-Fr 08:00-16:00',

  // Ubicación (editable)
  address: {
    street: 'Calle 30 4260',
    locality: 'Gonnet, City Bell',
    city: 'La Plata',
    region: 'Provincia de Buenos Aires',
    regionCode: 'AR-B',
    country: 'Argentina',
    countryCode: 'AR',
    postalCode: '1897',
    // Coordenadas aproximadas de Gonnet, La Plata (editable)
    geo: { lat: -34.8782, lng: -58.0245 },
  },
  serviceArea:
    'La Plata y Gran La Plata, Provincia de Buenos Aires. Gestión remota/online en todo el país.',

  // Redes
  instagram: {
    handle: '@estudiocadileseguros',
    url: 'https://www.instagram.com/estudiocadileseguros/',
  },

  // SEO / dominio
  siteUrl: 'https://estudiocadile.com.ar',
  locale: 'es-AR',

  // Trayectoria (placeholder editable)
  yearsLabel: '+15 años acompañando asegurados',
} as const;

/** Compañías aseguradoras con las que opera (partners). */
export const partnerCompanies = [
  { name: 'ATM Seguros', line: 'Patrimoniales' },
  { name: 'Alba Caución', line: 'Cauciones' },
  { name: 'Experta ART', line: 'Riesgos del trabajo' },
  { name: 'Federación Patronal', line: 'Patrimoniales y ART' },
  { name: 'Galicia Seguros', line: 'Patrimoniales y personales' },
  { name: 'Mercantil Andina', line: 'Patrimoniales' },
  { name: 'Provincia Seguros', line: 'Patrimoniales y personales' },
  { name: 'Río Uruguay Seguros (RUS)', line: 'Patrimoniales' },
  { name: 'San Cristóbal Seguros', line: 'Patrimoniales y personales' },
] as const;

export type PartnerCompany = (typeof partnerCompanies)[number];
