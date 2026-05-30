import { business } from '@/config/business';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Política de Privacidad | Estudio Cadile',
  description:
    'Política de privacidad y protección de datos personales de Estudio Cadile (Ley 25.326). Cómo tratamos los datos que dejás en formularios y en el asistente virtual.',
  path: '/privacidad',
});

export default function PrivacidadPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <Breadcrumbs items={[{ name: 'Privacidad', path: '/privacidad' }]} />
      <article className="prose-cadile mt-8">
        <h1 className="text-4xl">Política de privacidad</h1>
        <p className="text-sm text-petrol/60">Última actualización: {new Date().getFullYear()}</p>

        <p>
          En <strong>{business.name}</strong> protegemos tus datos personales conforme a la{' '}
          <strong>Ley 25.326 de Protección de Datos Personales</strong> de la República Argentina.
          Esta política explica qué datos recopilamos, con qué finalidad y cuáles son tus derechos.
        </p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          {business.name}, {business.legalRole} ({business.license.label}). Contacto:{' '}
          <a href={`mailto:${business.email}`}>{business.email}</a> · {business.phone.display}.
        </p>

        <h2>2. Datos que recopilamos</h2>
        <p>
          Recopilamos únicamente los datos que vos nos brindás voluntariamente a través de los
          formularios de cotización y contacto, del asistente virtual o del newsletter: por ejemplo,
          nombre, teléfono, email y los datos necesarios para cotizar la cobertura que solicitás.
        </p>

        <h2>3. Finalidad</h2>
        <p>
          Usamos tus datos exclusivamente para: (a) responder tu consulta; (b) cotizar y gestionar
          los seguros que solicites; (c) contactarte en relación con tu solicitud; y (d), si lo
          autorizás, enviarte contenidos y novedades. No usamos tus datos para otras finalidades sin
          tu consentimiento.
        </p>

        <h2>4. Asistente virtual (chatbot)</h2>
        <p>
          El asistente brinda información general orientativa sobre seguros. Las conversaciones se
          procesan para generar la respuesta y no deberías compartir datos sensibles. La información
          intercambiada no sustituye el asesoramiento de un Productor Asesor matriculado.
        </p>

        <h2>5. Conservación y cesión</h2>
        <p>
          Conservamos tus datos el tiempo necesario para cumplir las finalidades indicadas. Podemos
          compartir los datos estrictamente necesarios con las compañías aseguradoras para cotizar o
          gestionar la póliza que solicitás. No vendemos ni cedemos tus datos a terceros con fines
          publicitarios.
        </p>

        <h2>6. Tus derechos</h2>
        <p>
          Podés acceder, rectificar, actualizar o solicitar la supresión de tus datos escribiéndonos
          a <a href={`mailto:${business.email}`}>{business.email}</a>. La AGENCIA DE ACCESO A LA
          INFORMACIÓN PÚBLICA, órgano de control de la Ley 25.326, tiene la atribución de atender las
          denuncias y reclamos relativos al incumplimiento de las normas sobre protección de datos
          personales.
        </p>

        <h2>7. Seguridad</h2>
        <p>
          Adoptamos medidas razonables para proteger tus datos frente a accesos no autorizados,
          pérdida o alteración.
        </p>

        <h2>8. Cambios</h2>
        <p>
          Podemos actualizar esta política. Publicaremos cualquier cambio en esta misma página.
        </p>
      </article>
    </div>
  );
}
