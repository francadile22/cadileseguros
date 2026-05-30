'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { business } from '@/config/business';
import { cn } from '@/lib/utils';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  '¿Qué cubre el seguro de hogar?',
  'Tuve un choque, ¿qué hago?',
  '¿Cuánto sale asegurar mi auto?',
  '¿Necesito ART para mi empleada doméstica?',
];

const GREETING: Msg = {
  role: 'assistant',
  content:
    '¡Hola! Soy el asistente de Estudio Cadile. Te puedo orientar sobre seguros en Argentina: qué cubre cada cobertura, cómo denunciar un siniestro, cauciones, ART y más. ¿En qué te doy una mano?',
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error('bad response');
      }

      // Streaming token a token
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            'Uy, no pude responder en este momento. Escribinos por WhatsApp al ' +
            business.phone.display +
            ' y te atiende una persona del equipo.',
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* Lanzador (abajo a la izquierda para no tapar el WhatsApp) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de seguros'}
        className="fixed bottom-5 left-5 z-40 flex h-14 items-center gap-2 rounded-full bg-petrol px-4 text-bone shadow-lift transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && <span className="hidden text-sm font-semibold sm:inline">Asistente</span>}
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="Asistente de seguros de Estudio Cadile"
          className="fixed bottom-24 left-5 right-5 z-40 flex max-h-[70vh] flex-col overflow-hidden rounded-3xl border border-petrol-100 bg-bone shadow-lift animate-fade-up sm:right-auto sm:w-[26rem]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-petrol-100 bg-petrol px-4 py-3 text-bone">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-amber text-white">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <div className="leading-tight">
              <p className="font-display text-base font-semibold">Asistente Cadile</p>
              <p className="text-xs text-bone/70">Orientación en seguros · responde al toque</p>
            </div>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'rounded-br-sm bg-petrol text-bone'
                      : 'rounded-bl-sm border border-petrol-100 bg-white text-ink'
                  )}
                >
                  {m.content || (loading && i === messages.length - 1 ? '···' : '')}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-petrol-100 bg-white px-3.5 py-2.5 text-sm text-petrol/50">
                  escribiendo…
                </div>
              </div>
            )}

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-petrol-200 bg-white px-3 py-1.5 text-xs text-petrol transition-colors hover:border-amber hover:bg-amber-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-petrol-100 bg-bone p-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-petrol-200 bg-white px-3 py-1.5 focus-within:border-petrol">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu consulta…"
                aria-label="Escribí tu consulta"
                className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-petrol/40"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Enviar"
                className="grid h-8 w-8 place-items-center rounded-full bg-petrol text-bone transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <p className="mt-2 px-1 text-[10px] leading-snug text-petrol/50">
              Información general orientativa. No sustituye el asesoramiento de un Productor Asesor
              matriculado. No compartas datos sensibles.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
