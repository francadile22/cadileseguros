import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Paleta "Azul marino + gris acero" (Estudio Cadile) ──
        // Nota: se conservan los nombres de tokens (petrol/amber/bone/ink) para
        // no romper clases existentes; los valores ahora son azul marino + gris.

        // Fondo claro (gris azulado muy claro, en vez de blanco hueso)
        bone: {
          DEFAULT: '#F4F7FB',
          50: '#FBFCFE',
          100: '#F4F7FB',
          200: '#E7EDF5',
          300: '#D6E0EC',
        },
        // PRIMARIO: azul marino
        petrol: {
          DEFAULT: '#0B2A4A',
          50: '#EEF3F9',
          100: '#D8E3F0',
          200: '#AEC3DD',
          300: '#7E9DC4',
          400: '#3F66A0',
          500: '#163E6B',
          600: '#0B2A4A',
          700: '#082039',
          800: '#06182B',
          900: '#040F1C',
        },
        // ACENTO (CTA): azul brillante — mantiene el nombre "amber"
        amber: {
          DEFAULT: '#2563EB',
          50: '#EFF5FF',
          100: '#DBE8FE',
          200: '#BFD5FE',
          300: '#93B8FD',
          400: '#5E93F8',
          500: '#2563EB',
          600: '#1D4FD0',
          700: '#1A40A8',
        },
        // Gris acero (slate) para textos secundarios y bordes
        steel: {
          DEFAULT: '#64748B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        ink: '#15243B', // texto principal (azul grisáceo oscuro)
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,42,74,0.04), 0 8px 24px -12px rgba(11,42,74,0.18)',
        lift: '0 2px 4px rgba(11,42,74,0.06), 0 24px 48px -20px rgba(11,42,74,0.30)',
        glow: '0 8px 30px -8px rgba(37,99,235,0.45)',
        glass: '0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 32px -12px rgba(11,42,74,0.22)',
      },
      maxWidth: {
        prose: '68ch',
      },
      backgroundImage: {
        'mesh-hero':
          'radial-gradient(40rem 30rem at 85% -10%, rgba(37,99,235,0.18), transparent 60%), radial-gradient(35rem 30rem at -5% 10%, rgba(11,42,74,0.10), transparent 55%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(37,99,235,0.5)' },
          '70%': { boxShadow: '0 0 0 12px rgba(37,99,235,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37,99,235,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
