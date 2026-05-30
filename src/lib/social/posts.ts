/**
 * Definiciones de posteos para redes (Instagram / Facebook / LinkedIn).
 * Cada post tiene el diseño (para la imagen) y el copy (caption + hashtags).
 * En la Fase 2 estos objetos los genera la IA en borrador y vos aprobás/editás.
 */

export type PostKind = 'dato' | 'concepto' | 'promo';

export interface SocialPost {
  id: string;
  kind: PostKind;
  /** Etiqueta superior (chip). */
  eyebrow: string;
  /** Título principal (display). */
  title: string;
  /** Línea de apoyo / definición. */
  body: string;
  /** Pie del arte (CTA corto). */
  footerNote: string;
  /** Caption para el pie de la publicación. */
  caption: string;
  hashtags: string[];
}

export const samplePosts: SocialPost[] = [
  {
    id: 'siniestro-72h',
    kind: 'dato',
    eyebrow: 'Dato que te conviene saber',
    title: 'Tenés 72 horas para denunciar un siniestro',
    body: 'Por la Ley de Seguros 17.418, la denuncia a la aseguradora se hace, en general, dentro de las 72 hs. Avisanos y la gestionamos por vos.',
    footerNote: 'Guardá este posteo · Te puede salvar una cobertura',
    caption:
      '¿Sabías que tenés un plazo para denunciar un siniestro? ⏱️\n\nPor regla general, la denuncia a tu aseguradora debe hacerse dentro de las 72 horas de ocurrido (Ley de Seguros 17.418). Si se te pasa el plazo, podés perder la cobertura.\n\nLo bueno: no estás solo/a. En Estudio Cadile te decimos qué reunir y hacemos la denuncia y el seguimiento por vos.\n\n¿Tuviste un siniestro? Escribinos por WhatsApp 👉 (221) 540-1604\n\nℹ️ Info general orientativa. No sustituye el asesoramiento de un Productor Asesor matriculado.',
    hashtags: [
      '#Seguros',
      '#LaPlata',
      '#Gonnet',
      '#CityBell',
      '#SeguroDeAuto',
      '#Siniestro',
      '#EstudioCadile',
      '#ProductorDeSeguros',
    ],
  },
  {
    id: 'que-es-franquicia',
    kind: 'concepto',
    eyebrow: 'Diccionario de seguros',
    title: '¿Qué es la franquicia?',
    body: 'Es el monto fijo que queda a tu cargo en un daño parcial: la compañía paga la reparación por encima de ese valor. Más franquicia = prima más barata.',
    footerNote: 'Seguinos para entender tu póliza sin letra chica',
    caption:
      '📚 Diccionario de seguros: la FRANQUICIA\n\nLa franquicia (o deducible) es el monto fijo que vos ponés en un siniestro de daño parcial. La aseguradora se hace cargo de lo que supera ese valor.\n\n👉 Una franquicia más alta suele bajar el precio de tu póliza, pero implica que ponés más ante un siniestro chico.\n👉 En robo total o destrucción total, en general, no se aplica.\n\n¿Dudas con tu cobertura de auto? Te asesoramos sin compromiso.\n\nℹ️ Info general orientativa.',
    hashtags: [
      '#Seguros',
      '#SeguroDeAuto',
      '#Franquicia',
      '#LaPlata',
      '#EducaciónFinanciera',
      '#EstudioCadile',
      '#Tips',
    ],
  },
  {
    id: 'caucion-sin-garante',
    kind: 'promo',
    eyebrow: 'Caución de alquiler',
    title: 'Alquilá sin garante propietario',
    body: 'El seguro de caución reemplaza al garante: una aseguradora respalda tu contrato. Ideal si no tenés un familiar que ponga su casa.',
    footerNote: 'Cotizá tu caución hoy · (221) 540-1604',
    caption:
      '🔑 ¿Querés alquilar pero no tenés garante? Tranqui.\n\nEl seguro de CAUCIÓN DE ALQUILER reemplaza al garante propietario: una aseguradora le garantiza al dueño el cumplimiento del contrato. Así alquilás sin pedirle a un familiar que ponga su propiedad.\n\n✅ Aceptado por inmobiliarias\n✅ Aprobación ágil\n✅ Te asesoramos de punta a punta\n\nCotizá sin compromiso 👉 (221) 540-1604 o link en bio.\n\nℹ️ Sujeto a análisis de perfil y condiciones de la póliza.',
    hashtags: [
      '#CauciónDeAlquiler',
      '#AlquilarSinGarante',
      '#Alquileres',
      '#LaPlata',
      '#Gonnet',
      '#Seguros',
      '#EstudioCadile',
    ],
  },
];

export function getPost(id: string): SocialPost | undefined {
  return samplePosts.find((p) => p.id === id);
}
