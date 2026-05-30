'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSending(true);
    try {
      // Reutiliza el endpoint de leads (doble opt-in: el equipo confirma la suscripción).
      await fetch('/api/cotizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cobertura: 'Newsletter',
          nombre: 'Suscriptor newsletter',
          telefono: '00000000',
          email,
          consentimiento: true,
          source: 'newsletter',
        }),
      });
      setOk(true);
    } finally {
      setSending(false);
    }
  }

  if (ok) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800">
        <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
        <p className="text-sm">
          ¡Listo! Te vamos a escribir para confirmar tu suscripción (doble opt-in).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="nl-email" className="sr-only">
        Tu email
      </label>
      <input
        id="nl-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tucorreo@email.com"
        className="flex-1 rounded-full border border-petrol-200 bg-white px-5 py-3 text-sm text-ink outline-none transition-colors focus:border-petrol"
      />
      <button type="submit" disabled={sending} className="btn-primary whitespace-nowrap">
        {sending ? 'Enviando…' : 'Suscribirme'} <Send className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
