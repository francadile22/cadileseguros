import { business, partnerCompanies } from '@/config/business';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Aviso Legal | Estudio Cadile',
  description:
    'Aviso legal de Estudio Cadile, Productor Asesor de Seguros matriculado (SSN 105506). Condiciones de uso del sitio e información regulatoria.',
  path: '/aviso-legal',
});

export default function AvisoLegalPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <Breadcrumbs items={[{ name: 'Aviso legal', path: '/aviso-legal' }]} />
      <article className="prose-cadile mt-8">
        <h1 className="text-4xl">Aviso legal</h1>
        <p className="text-sm text-petrol/60">Última actualización: {new Date().getFullYear()}</p>

        <h2>1. Identificación</h2>
        <p>
          Este sitio pertenece a <strong>{business.name}</strong>, {business.legalRole}, inscripto
          ante la {business.ssn.name} bajo {business.license.label}. Domicilio de referencia:{' '}
          {business.address.street}, {business.address.locality}, {business.address.city},{' '}
          {business.address.region}, {business.address.country}. Contacto: {business.phone.display} ·{' '}
          {business.email}.
        </p>

        <h2>2. Naturaleza del servicio</h2>
        <p>
          {business.name} es un <strong>intermediario matriculado</strong> (Productor Asesor de
          Seguros). Asesora, cotiza, gestiona y acompaña la contratación de pólizas en compañías
          aseguradoras. <strong>No es una compañía aseguradora</strong> y, por lo tanto, no asegura,
          no cubre ni indemniza por sí mismo. La cobertura, sus alcances, exclusiones y la eventual
          indemnización corresponden exclusivamente a la aseguradora emisora de cada póliza, según
          sus condiciones contractuales.
        </p>

        <h2>3. Carácter informativo del contenido</h2>
        <p>
          La información publicada (incluidas las guías, preguntas frecuentes y el asistente virtual)
          tiene fines orientativos y generales y <strong>no constituye asesoramiento vinculante</strong>{' '}
          ni una oferta de cobertura. Las condiciones, precios y coberturas dependen de cada compañía
          y del perfil de cada cliente, y pueden variar. Ante una contratación concreta, prevalece lo
          establecido en la póliza.
        </p>

        <h2>4. Organismo de control</h2>
        <p>
          La actividad está supervisada por la {business.ssn.name} (SSN).{' '}
          {business.ssn.phoneLabel}. Más información en{' '}
          <a href={business.ssn.url} target="_blank" rel="noopener">
            {business.ssn.url}
          </a>
          .
        </p>

        <h2>5. Compañías aseguradoras</h2>
        <p>
          {business.name} opera con las siguientes compañías, entre otras:{' '}
          {partnerCompanies.map((c) => c.name).join(', ')}. Las marcas mencionadas pertenecen a sus
          respectivos titulares.
        </p>

        <h2>6. Propiedad intelectual</h2>
        <p>
          Los contenidos, textos y diseño de este sitio son propiedad de {business.name} o se
          utilizan con autorización. No está permitida su reproducción sin consentimiento.
        </p>

        <h2>7. Responsabilidad</h2>
        <p>
          {business.name} procura mantener la información actualizada y correcta, pero no garantiza
          la ausencia de errores. El uso del sitio y de la información es responsabilidad del usuario.
        </p>

        <h2>8. Legislación aplicable</h2>
        <p>
          Este aviso se rige por las leyes de la República Argentina, en particular la Ley de Seguros
          17.418, la Ley 22.400 (Productores Asesores de Seguros) y la Ley 25.326 (Protección de
          Datos Personales).
        </p>
      </article>
    </div>
  );
}
