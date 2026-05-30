'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, Loader2 } from 'lucide-react';
import { business } from '@/config/business';
import { coberturasFull, otherCoverages } from '@/lib/coberturas';
import { cn } from '@/lib/utils';

const coverageOptions = [
  ...coberturasFull.filter((c) => c.published).map((c) => c.title),
  ...otherCoverages.map((o) => o.label),
];

// Campos de detalle según el tipo de cobertura (heurística simple por palabra clave).
function detailFields(cobertura: string): { name: string; label: string; placeholder?: string }[] {
  const c = cobertura.toLowerCase();
  if (c.includes('auto') || c.includes('moto') || c.includes('flota'))
    return [
      { name: 'Vehículo', label: 'Marca, modelo y año', placeholder: 'Ej: VW Gol 2019' },
      { name: 'Uso', label: 'Uso (particular / comercial)', placeholder: 'Particular' },
      { name: 'Localidad', label: 'Localidad donde circula', placeholder: 'La Plata' },
    ];
  if (c.includes('hogar') || c.includes('consorcio'))
    return [
      { name: 'Vivienda', label: 'Tipo de vivienda', placeholder: 'Casa / Departamento' },
      { name: 'Localidad', label: 'Localidad', placeholder: 'La Plata' },
    ];
  if (c.includes('art') || c.includes('riesgos'))
    return [
      { name: 'Empleados', label: 'Cantidad de empleados', placeholder: 'Ej: 5' },
      { name: 'Actividad', label: 'Actividad de la empresa', placeholder: 'Comercio' },
    ];
  if (c.includes('caución') || c.includes('caucion') || c.includes('alquiler'))
    return [
      { name: 'Monto', label: 'Monto del alquiler mensual', placeholder: 'Ej: $350.000' },
      { name: 'Plazo', label: 'Plazo del contrato', placeholder: '3 años' },
    ];
  return [{ name: 'Detalle', label: 'Contanos qué querés asegurar', placeholder: 'Breve descripción' }];
}

export function Cotizador({ initialCoverage }: { initialCoverage?: string }) {
  const [step, setStep] = useState(0);
  const [cobertura, setCobertura] = useState(initialCoverage ?? '');
  const [detalle, setDetalle] = useState<Record<string, string>>({});
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  const fields = cobertura ? detailFields(cobertura) : [];
  const steps = ['Cobertura', 'Detalles', 'Contacto', 'Listo'];

  function next() {
    setError('');
    setStep((s) => Math.min(s + 1, 3));
  }
  function back() {
    setError('');
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!consent) {
      setError('Necesitamos tu consentimiento para contactarte.');
      return;
    }
    if (nombre.trim().length < 2 || telefono.replace(/\D/g, '').length < 8) {
      setError('Revisá tu nombre y teléfono.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/cotizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cobertura,
          nombre,
          telefono,
          email,
          detalle,
          consentimiento: consent,
          website,
          source: 'cotizador',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'No se pudo enviar.');
      setStatus('ok');
      setStep(3);
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'No se pudo enviar.');
    }
  }

  if (status === 'ok') {
    return (
      <div className="card text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-4 text-2xl">¡Recibimos tu solicitud!</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          Un asesor de {business.name} te va a contactar en horario de atención ({business.hours})
          con las mejores opciones para <strong>{cobertura}</strong>.
        </p>
        <a href={business.phone.whatsapp} target="_blank" rel="noopener" className="btn-wa mx-auto mt-6">
          <MessageCircle className="h-4 w-4" aria-hidden /> ¿Es urgente? Escribinos por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Progreso */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Progreso del cotizador">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-1.5">
            <span
              className={cn(
                'h-1.5 rounded-full transition-colors',
                i <= step ? 'bg-amber' : 'bg-petrol-100'
              )}
            />
            <span className={cn('text-xs', i === step ? 'font-semibold text-petrol' : 'text-petrol/50')}>
              {label}
            </span>
          </li>
        ))}
      </ol>

      {/* Honeypot oculto */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px]"
        aria-hidden
      />

      {/* PASO 0: Cobertura */}
      {step === 0 && (
        <div>
          <h2 className="text-2xl">¿Qué querés cotizar?</h2>
          <p className="mt-2 text-sm text-ink/60">Elegí una cobertura para empezar.</p>
          <div className="mt-5 grid max-h-72 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {coverageOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setCobertura(opt);
                  setDetalle({});
                }}
                className={cn(
                  'rounded-xl border px-4 py-3 text-left text-sm transition-all',
                  cobertura === opt
                    ? 'border-petrol bg-petrol text-bone'
                    : 'border-petrol-200 bg-white/70 text-petrol hover:border-petrol/40'
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={next} disabled={!cobertura} className="btn-primary">
              Continuar <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* PASO 1: Detalles */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl">Contanos un poco más</h2>
          <p className="mt-2 text-sm text-ink/60">
            Sobre <strong>{cobertura}</strong>. Cuanto más sepamos, mejor cotizamos.
          </p>
          <div className="mt-5 space-y-4">
            {fields.map((f) => (
              <div key={f.name}>
                <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-petrol">
                  {f.label}
                </label>
                <input
                  id={f.name}
                  value={detalle[f.name] || ''}
                  onChange={(e) => setDetalle((d) => ({ ...d, [f.name]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-petrol-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-petrol"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={back} className="btn-ghost">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Volver
            </button>
            <button onClick={next} className="btn-primary">
              Continuar <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* PASO 2: Contacto */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl">¿Cómo te contactamos?</h2>
          <p className="mt-2 text-sm text-ink/60">Te escribe una persona del equipo, sin compromiso.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-petrol">
                Nombre y apellido
              </label>
              <input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-xl border border-petrol-200 bg-white px-4 py-3 text-sm outline-none focus:border-petrol"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-petrol">
                WhatsApp / Teléfono
              </label>
              <input
                id="telefono"
                inputMode="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="(221) ..."
                className="w-full rounded-xl border border-petrol-200 bg-white px-4 py-3 text-sm outline-none focus:border-petrol"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-petrol">
                Email <span className="text-petrol/40">(opcional)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-petrol-200 bg-white px-4 py-3 text-sm outline-none focus:border-petrol"
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-petrol-300 accent-petrol"
              />
              <span>
                Autorizo a {business.name} a contactarme por este medio para asesorarme. Leí la{' '}
                <a href="/privacidad" className="underline">
                  política de privacidad
                </a>{' '}
                (Ley 25.326).
              </span>
            </label>
          </div>

          {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}

          <div className="mt-8 flex justify-between">
            <button onClick={back} className="btn-ghost">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Volver
            </button>
            <button onClick={submit} disabled={status === 'sending'} className="btn-primary">
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando…
                </>
              ) : (
                <>
                  Enviar solicitud <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
