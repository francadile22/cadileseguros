import { buildMetadata, faqPageSchema } from '@/lib/seo';
import { business } from '@/config/business';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata = buildMetadata({
  title: 'Preguntas Frecuentes sobre Seguros | Estudio Cadile',
  description:
    'Respuestas claras sobre seguros en Argentina: qué es una franquicia, cómo denunciar un siniestro, qué es la prima, infraseguro, ART, caución de alquiler y más. Asesoramiento de un PAS matriculado.',
  path: '/preguntas-frecuentes',
});

const groups: { title: string; faqs: { q: string; a: string }[] }[] = [
  {
    title: 'Sobre Estudio Cadile y las productoras',
    faqs: [
      {
        q: '¿Qué es un Productor Asesor de Seguros (PAS)?',
        a: 'Es un profesional matriculado que actúa como intermediario entre el asegurado y las compañías aseguradoras. Asesora, cotiza, gestiona la póliza y acompaña al cliente, especialmente en los siniestros. No es la aseguradora: su valor está en el asesoramiento independiente.',
      },
      {
        q: '¿Estudio Cadile es una compañía de seguros?',
        a: `No. ${business.name} es una productora de seguros (PAS matriculado, ${business.license.label}). Colocamos tu póliza en compañías aseguradoras líderes, pero la cobertura la brinda la aseguradora, no nosotros.`,
      },
      {
        q: '¿Cuánto cuesta asesorarme con una productora?',
        a: 'No tiene costo adicional para vos. El productor se remunera a través de la compañía, así que pagás la misma prima que pagarías contratando directo, pero con asesoramiento y acompañamiento.',
      },
      {
        q: '¿Atienden en todo el país?',
        a: 'Sí. Tenemos base en Gonnet, La Plata, pero gestionamos seguros de forma remota en toda Argentina. Cotizás, contratás y hacés trámites online o por WhatsApp.',
      },
    ],
  },
  {
    title: 'Conceptos de seguros',
    faqs: [
      {
        q: '¿Qué es la prima de un seguro?',
        a: 'La prima es el precio del seguro: lo que pagás a la compañía a cambio de la cobertura. Puede abonarse de forma mensual, trimestral o anual.',
      },
      {
        q: '¿Qué es la franquicia o deducible?',
        a: 'Es un monto fijo que queda a tu cargo en un siniestro de daño parcial; la aseguradora paga por encima de ese valor. Una franquicia más alta suele abaratar la prima. En robo total o destrucción total generalmente no se aplica.',
      },
      {
        q: '¿Qué es la suma asegurada?',
        a: 'Es el monto máximo que la aseguradora pagará ante un siniestro. Debe reflejar el valor real del bien para evitar el infraseguro (cobrar menos) o el sobreseguro (pagar de más sin beneficio).',
      },
      {
        q: '¿Qué es el infraseguro?',
        a: 'Ocurre cuando declarás una suma asegurada menor al valor real del bien. Ante un siniestro, la aseguradora indemniza en la misma proporción (regla proporcional), por lo que cobrás menos de lo esperado.',
      },
      {
        q: '¿Qué diferencia hay entre robo y hurto?',
        a: 'El robo implica violencia o fuerza sobre las cosas o las personas; el hurto es sin violencia. Es relevante porque algunas pólizas distinguen ambos supuestos a la hora de cubrir.',
      },
      {
        q: '¿Qué es la destrucción total?',
        a: 'Se considera destrucción total cuando el costo de reparación supera un umbral cercano al 80% del valor del bien. En ese caso la aseguradora indemniza como pérdida total en lugar de reparar.',
      },
    ],
  },
  {
    title: 'Siniestros',
    faqs: [
      {
        q: '¿Cuánto tiempo tengo para denunciar un siniestro?',
        a: 'Por regla general, dentro de las 72 horas de ocurrido (Ley de Seguros 17.418, art. 46). Conviene avisarnos lo antes posible para no perder la cobertura; algunos casos tienen plazos particulares.',
      },
      {
        q: '¿Qué hago en los primeros minutos tras un siniestro?',
        a: 'Primero, poné a salvo a las personas; si hay heridos, llamá al 911. Después reuní información (fotos, datos, testigos), hacé la denuncia policial si corresponde y avisanos para iniciar el reclamo.',
      },
    ],
  },
  {
    title: 'Coberturas',
    faqs: [
      {
        q: '¿Es obligatorio el seguro de auto?',
        a: 'Sí, la Responsabilidad Civil hacia terceros es obligatoria para circular en Argentina. Las coberturas de robo, incendio y daños propios son opcionales.',
      },
      {
        q: '¿Es obligatoria la ART?',
        a: 'Sí, para todo empleador con personal en relación de dependencia, incluido el de casas particulares. Cubre accidentes laborales, in itinere y enfermedades profesionales.',
      },
      {
        q: '¿La caución de alquiler sirve para alquilar sin garante?',
        a: 'Sí. Es una garantía emitida por una aseguradora que reemplaza al garante propietario, por lo que te permite alquilar sin que un tercero ponga una propiedad como respaldo.',
      },
    ],
  },
];

const allFaqs = groups.flatMap((g) => g.faqs);

export default function FaqPage() {
  return (
    <div className="py-10 lg:py-14">
      <JsonLd data={faqPageSchema(allFaqs)} />

      <div className="container-page">
        <Breadcrumbs items={[{ name: 'Preguntas frecuentes', path: '/preguntas-frecuentes' }]} />
        <div className="mt-8 max-w-3xl">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Todo lo que querés saber sobre seguros
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Respuestas claras y al grano. ¿No encontrás la tuya? Probá el asistente (abajo a la
            izquierda) o escribinos por WhatsApp.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 60}>
              <section>
                <h2 className="mb-5 text-2xl">{g.title}</h2>
                <div className="max-w-3xl">
                  <FaqAccordion faqs={g.faqs} />
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
