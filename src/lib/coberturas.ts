/**
 * Registro de coberturas. Fuente de contenido para:
 *  - El hub /coberturas (filtrable por necesidad y categoría)
 *  - Las landings /coberturas/[slug] (SEO long-tail)
 *  - El contexto del chatbot
 *
 * Para AGREGAR una cobertura nueva con landing propia: sumá un objeto a
 * `coberturasFull` con `published: true`. Aparece sola en el hub, el sitemap
 * y se genera su página estática. Ver README.
 */

/** Grupos por "trabajo a resolver" del usuario (tabs de la home y filtro del hub). */
export const needGroups = [
  { id: 'auto', label: 'Mi auto', icon: 'Car', blurb: 'Auto, moto, bici y movilidad.' },
  { id: 'hogar', label: 'Mi casa', icon: 'Home', blurb: 'Hogar, tus cosas y tus dispositivos.' },
  { id: 'familia', label: 'Mi familia', icon: 'Heart', blurb: 'Vida, salud, accidentes y viajes.' },
  { id: 'empresa', label: 'Mi empresa', icon: 'Building2', blurb: 'ART, RC, comercio y flotas.' },
  { id: 'campo', label: 'Mi campo', icon: 'Wheat', blurb: 'Agro, ganado y maquinaria.' },
  { id: 'caucion', label: 'Alquileres y cauciones', icon: 'FileSignature', blurb: 'Garantías y cauciones.' },
] as const;

export type NeedGroupId = (typeof needGroups)[number]['id'];

export type CoverageRow = { item: string; covered: boolean; note?: string };

export interface Faq {
  q: string;
  /** Respuesta-primero: 1ª-2ª oración autocontenida (clave para AEO). */
  a: string;
}

export interface Cobertura {
  slug: string;
  title: string; // título de producto (H1)
  metaTitle: string; // <title> con keyword + localidad
  metaDescription: string;
  need: NeedGroupId;
  category: string; // categoría técnica (Patrimoniales, Personales, etc.)
  icon: string; // nombre de ícono lucide
  /** Respuesta-primero para AEO: qué es, en 1-2 oraciones. */
  summary: string;
  /** Bullets de qué cubre (resumen visual). */
  highlights: string[];
  /** Tabla cubre / no cubre (los modelos de IA la extraen muy bien). */
  coversTable: CoverageRow[];
  forWho: string[];
  requirements: string[];
  faqs: Faq[];
  /** Keywords de referencia (no se renderizan; documentan la intención SEO). */
  keywords: string[];
  published: boolean;
}

/** Coberturas con landing propia y contenido completo. */
export const coberturasFull: Cobertura[] = [
  {
    slug: 'seguro-automotor',
    title: 'Seguro de auto',
    metaTitle: 'Seguro de Auto en La Plata | Cotizá con Estudio Cadile',
    metaDescription:
      'Cotizá tu seguro de auto en La Plata y todo el país con Estudio Cadile, Productor Asesor matriculado (SSN 105506). Comparamos compañías líderes y te acompañamos en el siniestro.',
    need: 'auto',
    category: 'Patrimoniales',
    icon: 'Car',
    summary:
      'El seguro de auto cubre los daños que tu vehículo pueda causar a terceros y, según la cobertura, también el daño, robo o destrucción de tu propio auto. En Argentina la Responsabilidad Civil hacia terceros es obligatoria para poder circular.',
    highlights: [
      'Responsabilidad Civil obligatoria hacia terceros',
      'Robo e incendio total y parcial',
      'Daños por accidente (todo riesgo con o sin franquicia)',
      'Granizo, inundación y fenómenos climáticos (según cobertura)',
      'Auxilio mecánico y remolque',
    ],
    coversTable: [
      { item: 'Daños a terceros (personas y cosas)', covered: true, note: 'Cobertura obligatoria mínima.' },
      { item: 'Robo total del vehículo', covered: true, note: 'Desde cobertura intermedia.' },
      { item: 'Incendio total y parcial', covered: true },
      { item: 'Destrucción total por accidente', covered: true, note: 'Todo riesgo.' },
      { item: 'Daño parcial del propio auto', covered: true, note: 'Todo riesgo con franquicia.' },
      { item: 'Granizo y eventos climáticos', covered: true, note: 'Según cobertura contratada.' },
      { item: 'Desgaste o fallas mecánicas por uso', covered: false, note: 'No es un siniestro.' },
      { item: 'Conducir con registro vencido o en infracción grave', covered: false, note: 'Puede anular la cobertura.' },
      { item: 'Accesorios no declarados en la póliza', covered: false },
    ],
    forWho: [
      'Tenés un auto y querés circular en regla (la RC es obligatoria).',
      'Querés proteger tu vehículo contra robo, incendio o accidentes.',
      'Buscás comparar varias compañías sin perder horas.',
    ],
    requirements: [
      'Datos del vehículo (marca, modelo, año, uso, código postal donde duerme).',
      'DNI del titular y datos de contacto.',
      'Cédula verde / título (para emitir la póliza).',
    ],
    faqs: [
      {
        q: '¿Es obligatorio el seguro de auto en Argentina?',
        a: 'Sí. La cobertura de Responsabilidad Civil hacia terceros es obligatoria por ley para circular; sin ella no podés tener el auto en la vía pública. Las coberturas de robo, incendio y daños propios son opcionales y las elegís según lo que quieras proteger.',
      },
      {
        q: '¿Qué es la franquicia en el seguro de auto?',
        a: 'La franquicia es un monto fijo que queda a tu cargo en caso de un siniestro de daño parcial: la compañía paga la reparación por encima de ese valor. Una franquicia más alta suele abaratar la prima. En robo total y destrucción total generalmente no se aplica franquicia.',
      },
      {
        q: '¿Cuándo y cómo denuncio un choque o robo?',
        a: 'Tenés que denunciar el siniestro a la aseguradora lo antes posible y, por regla general, dentro de las 72 horas (Ley de Seguros 17.418). En Estudio Cadile te guiamos paso a paso y hacemos el seguimiento del reclamo por vos.',
      },
      {
        q: '¿Qué diferencia hay entre robo y hurto?',
        a: 'En seguros, el robo implica violencia o fuerza sobre las cosas o las personas, mientras que el hurto es sin violencia. Es importante porque algunas coberturas distinguen ambos supuestos; te ayudamos a leer la póliza para que sepas exactamente qué tenés cubierto.',
      },
      {
        q: '¿Cuánto cuesta asegurar mi auto?',
        a: 'El precio depende del vehículo, el uso, la zona, la cobertura elegida y tu perfil. No hay un precio único: por eso comparamos varias compañías y te pasamos las mejores opciones. Pedí tu cotización sin compromiso.',
      },
    ],
    keywords: ['seguro de auto la plata', 'cotizar seguro automotor', 'cuanto cuesta seguro auto', 'seguro todo riesgo'],
    published: true,
  },
  {
    slug: 'seguro-hogar',
    title: 'Seguro de hogar',
    metaTitle: 'Seguro de Hogar en La Plata | Cotizá con Estudio Cadile',
    metaDescription:
      'Seguro de hogar para casa o departamento en La Plata y todo el país. Protegé incendio, robo de contenido, daños por agua y RC. Cotizá con Estudio Cadile, PAS matriculado (SSN 105506).',
    need: 'hogar',
    category: 'Patrimoniales',
    icon: 'Home',
    summary:
      'El seguro de hogar protege tu vivienda y lo que hay adentro frente a incendio, robo, daños por agua y otros eventos, e incluye la responsabilidad civil por daños a vecinos o terceros. Sirve tanto si sos propietario como inquilino.',
    highlights: [
      'Incendio del edificio y del contenido',
      'Robo y daños por intento de robo',
      'Daños por agua (roturas de cañerías, filtraciones)',
      'Responsabilidad civil hacia vecinos y terceros',
      'Cristales y, según cobertura, electrodomésticos',
    ],
    coversTable: [
      { item: 'Incendio del inmueble y del contenido', covered: true },
      { item: 'Robo y hurto de contenido', covered: true, note: 'Según suma asegurada declarada.' },
      { item: 'Daños por agua (cañerías, filtraciones)', covered: true },
      { item: 'Responsabilidad civil hacia terceros', covered: true },
      { item: 'Rotura de cristales', covered: true },
      { item: 'Eventos climáticos (viento, granizo)', covered: true, note: 'Según cobertura.' },
      { item: 'Daños preexistentes o falta de mantenimiento', covered: false },
      { item: 'Dinero en efectivo y joyas no declaradas', covered: false, note: 'Requieren declaración específica.' },
      { item: 'Desgaste natural de instalaciones', covered: false },
    ],
    forWho: [
      'Sos propietario y querés proteger tu casa o departamento.',
      'Sos inquilino y querés cubrir tu contenido y tu RC.',
      'Vivís en consorcio y querés complementar el seguro del edificio.',
    ],
    requirements: [
      'Tipo de vivienda (casa/departamento), metros y ubicación.',
      'Suma estimada del contenido a asegurar.',
      'Datos de contacto del titular.',
    ],
    faqs: [
      {
        q: '¿Qué cubre el seguro de hogar?',
        a: 'Cubre tu vivienda y su contenido frente a incendio, robo, daños por agua, rotura de cristales y eventos climáticos, además de la responsabilidad civil por daños que ocasiones a vecinos o terceros. El alcance exacto depende de la cobertura y las sumas aseguradas que elijas.',
      },
      {
        q: '¿El inquilino necesita seguro de hogar?',
        a: 'Sí, le conviene. El seguro del edificio o del propietario no cubre las cosas del inquilino ni su responsabilidad civil. Con una póliza propia protegés tu contenido y respondés por daños como una filtración que afecte al vecino de abajo.',
      },
      {
        q: '¿Qué es el infraseguro?',
        a: 'El infraseguro ocurre cuando declarás una suma asegurada menor al valor real de tus bienes. Si pasa, ante un siniestro la compañía indemniza en la misma proporción (regla proporcional), así que cobrás menos. Te ayudamos a declarar una suma realista para evitarlo.',
      },
      {
        q: '¿Cubre los daños por agua de un departamento?',
        a: 'Sí, la mayoría de las coberturas incluyen daños por agua originados en roturas de cañerías o filtraciones dentro de tu unidad, y la RC por los daños que causes a otras unidades. No cubre daños por falta de mantenimiento o humedades preexistentes.',
      },
    ],
    keywords: ['seguro de hogar la plata', 'seguro casa departamento', 'seguro de hogar inquilino', 'que cubre seguro hogar'],
    published: true,
  },
  {
    slug: 'art-riesgos-del-trabajo',
    title: 'ART — Aseguradora de Riesgos del Trabajo',
    metaTitle: 'ART en La Plata | Contratá Riesgos del Trabajo con Estudio Cadile',
    metaDescription:
      'Contratá la ART para tu empresa o personal con Estudio Cadile, PAS matriculado (SSN 105506). Cobertura obligatoria de accidentes laborales y enfermedades profesionales. Asesoramiento y gestión en La Plata y todo el país.',
    need: 'empresa',
    category: 'Riesgos del trabajo',
    icon: 'HardHat',
    summary:
      'La ART (Aseguradora de Riesgos del Trabajo) es la cobertura obligatoria que protege a los trabajadores en relación de dependencia ante accidentes laborales y enfermedades profesionales. Toda empresa con empleados debe tener ART vigente; también aplica al personal de casas particulares.',
    highlights: [
      'Cobertura obligatoria para empleados en relación de dependencia',
      'Atención médica por accidentes y enfermedades laborales',
      'Prestaciones dinerarias por incapacidad (ILT, ILP)',
      'Cobertura de accidentes in itinere (camino al trabajo)',
      'Incluye personal de casas particulares (empleada doméstica)',
    ],
    coversTable: [
      { item: 'Accidente de trabajo', covered: true },
      { item: 'Enfermedad profesional listada', covered: true },
      { item: 'Accidente in itinere (ida y vuelta al trabajo)', covered: true },
      { item: 'Atención médica y farmacológica', covered: true },
      { item: 'Incapacidad Laboral Temporaria (ILT)', covered: true, note: 'Prestación dineraria.' },
      { item: 'Incapacidad Laboral Permanente (ILP)', covered: true },
      { item: 'Recalificación y reinserción laboral', covered: true },
      { item: 'Accidentes fuera del ámbito y horario laboral', covered: false, note: 'No relacionados al trabajo.' },
      { item: 'Trabajadores no registrados', covered: false, note: 'Deben estar dados de alta.' },
    ],
    forWho: [
      'Tenés una empresa o comercio con empleados en relación de dependencia.',
      'Empleás personal de casas particulares (empleada doméstica).',
      'Necesitás regularizar tu situación frente a la ley de riesgos del trabajo.',
    ],
    requirements: [
      'CUIT de la empresa o empleador.',
      'Nómina de empleados y actividad (CIIU).',
      'Datos de alta en AFIP del personal.',
    ],
    faqs: [
      {
        q: '¿Qué es la ART y para qué sirve?',
        a: 'La ART es la Aseguradora de Riesgos del Trabajo: cubre a los trabajadores en relación de dependencia ante accidentes laborales, accidentes camino al trabajo (in itinere) y enfermedades profesionales. Brinda atención médica y prestaciones dinerarias según el grado de incapacidad.',
      },
      {
        q: '¿Es obligatorio tener ART?',
        a: 'Sí. Toda persona o empresa que emplee trabajadores en relación de dependencia está obligada por ley a contratar una ART. También corresponde para el personal de casas particulares. No tenerla expone al empleador a responder con su patrimonio ante un accidente.',
      },
      {
        q: '¿Qué es la ILT y la ILP?',
        a: 'La ILT (Incapacidad Laboral Temporaria) es el período en que el trabajador no puede trabajar pero se espera su recuperación, y cobra una prestación dineraria. La ILP (Incapacidad Laboral Permanente) es cuando queda una secuela definitiva, total o parcial, que se indemniza según su grado.',
      },
      {
        q: '¿Necesito ART para mi empleada doméstica?',
        a: 'Sí. El personal de casas particulares registrado debe contar con una cobertura de riesgos del trabajo. Te asesoramos para contratarla y dejarte en regla; es una protección clave también para vos como empleador.',
      },
    ],
    keywords: ['art la plata', 'contratar art empresa', 'art empleada domestica', 'aseguradora riesgos del trabajo'],
    published: true,
  },
  {
    slug: 'caucion-alquiler',
    title: 'Seguro de caución de alquiler',
    metaTitle: 'Seguro de Caución de Alquiler en La Plata | Estudio Cadile',
    metaDescription:
      'Garantía de alquiler con seguro de caución: alquilá sin garante propietario. Estudio Cadile, PAS matriculado (SSN 105506), te asesora en La Plata y todo el país. Cotizá tu caución de alquiler.',
    need: 'caucion',
    category: 'Cauciones',
    icon: 'FileSignature',
    summary:
      'El seguro de caución de alquiler es una garantía que reemplaza al garante propietario: una aseguradora respalda el cumplimiento del contrato ante el propietario. Te permite alquilar sin pedirle a un familiar que ponga su casa como garantía.',
    highlights: [
      'Reemplaza al garante propietario tradicional',
      'Garantiza el pago del alquiler ante incumplimiento',
      'Puede cubrir expensas, servicios y daños según póliza',
      'Aprobación ágil con análisis de perfil',
      'Aceptada por inmobiliarias y propietarios',
    ],
    coversTable: [
      { item: 'Falta de pago de alquileres', covered: true },
      { item: 'Expensas y servicios impagos', covered: true, note: 'Según condiciones de la póliza.' },
      { item: 'Daños al inmueble', covered: true, note: 'Hasta el límite asegurado, según póliza.' },
      { item: 'Garantía frente al propietario por todo el contrato', covered: true },
      { item: 'Multas o intereses no pactados en el contrato', covered: false },
      { item: 'Daños preexistentes al ingreso', covered: false },
      { item: 'Uso del inmueble distinto al contractual', covered: false },
    ],
    forWho: [
      'Vas a alquilar y no tenés garantía propietaria.',
      'Sos propietario y querés alquilar con respaldo de una aseguradora.',
      'Sos inmobiliaria y buscás una garantía sólida para tus contratos.',
    ],
    requirements: [
      'Datos del inquilino y recibos de ingresos / situación laboral.',
      'Datos del contrato de alquiler (monto, plazo, inmueble).',
      'Datos del propietario o inmobiliaria (asegurado / beneficiario).',
    ],
    faqs: [
      {
        q: '¿Qué es el seguro de caución de alquiler?',
        a: 'Es una garantía de alquiler emitida por una aseguradora que reemplaza al garante propietario: respalda al dueño ante el incumplimiento del inquilino. Así podés alquilar sin necesidad de que un tercero ponga una propiedad como garantía.',
      },
      {
        q: '¿Cómo funciona la caución de alquiler?',
        a: 'Vos contratás la póliza y la aseguradora garantiza al propietario el cumplimiento del contrato (alquileres y, según la póliza, expensas, servicios y daños). Si dejás de pagar, la aseguradora le responde al dueño y luego gestiona el recupero. Es una garantía válida y aceptada por inmobiliarias.',
      },
      {
        q: '¿Cuánto cuesta una caución de alquiler?',
        a: 'El costo depende del monto del alquiler, el plazo del contrato y el perfil del inquilino. Suele pagarse como un porcentaje del contrato. Te cotizamos sin compromiso y comparamos opciones para que consigas la más conveniente.',
      },
      {
        q: '¿Sirve para alquilar sin garante?',
        a: 'Sí, ese es su principal uso: te permite alquilar sin garante propietario, porque la garantía la otorga la aseguradora. Es ideal si no tenés un familiar que pueda ofrecer una propiedad como respaldo.',
      },
    ],
    keywords: ['seguro de caucion alquiler la plata', 'garantia de alquiler', 'alquilar sin garante', 'caucion alquiler cuanto cuesta'],
    published: true,
  },
];

/** Otras coberturas que ofrece el estudio (sin landing dedicada todavía). Se muestran en el hub. */
export const otherCoverages: { label: string; need: NeedGroupId }[] = [
  { label: 'Seguro de moto', need: 'auto' },
  { label: 'Seguro de bici y monopatín', need: 'auto' },
  { label: 'Seguro de celular y notebook', need: 'hogar' },
  { label: 'Seguro de mascota', need: 'hogar' },
  { label: 'Seguro de identidad y bolso protegido', need: 'hogar' },
  { label: 'Seguro de vida y retiro', need: 'familia' },
  { label: 'Accidentes personales', need: 'familia' },
  { label: 'Sepelio', need: 'familia' },
  { label: 'Salud / prepaga', need: 'familia' },
  { label: 'Asistencia al viajero', need: 'familia' },
  { label: 'Responsabilidad civil (RC)', need: 'empresa' },
  { label: 'Seguro de comercio', need: 'empresa' },
  { label: 'Seguro técnico', need: 'empresa' },
  { label: 'Seguro de transporte y flotas', need: 'empresa' },
  { label: 'Seguro ambiental', need: 'empresa' },
  { label: 'Todo riesgo construcción / operativo', need: 'empresa' },
  { label: 'Seguro de consorcios', need: 'empresa' },
  { label: 'Seguro de cultivos', need: 'campo' },
  { label: 'Seguro de ganado', need: 'campo' },
  { label: 'Maquinaria agrícola e instalaciones rurales', need: 'campo' },
  { label: 'Caución judicial, aduanera y de obras', need: 'caucion' },
];

export function getCobertura(slug: string): Cobertura | undefined {
  return coberturasFull.find((c) => c.slug === slug && c.published);
}

export function getAllCoberturaSlugs(): string[] {
  return coberturasFull.filter((c) => c.published).map((c) => c.slug);
}

export function getCoberturasByNeed(need: NeedGroupId): Cobertura[] {
  return coberturasFull.filter((c) => c.published && c.need === need);
}
