import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "Editorial confiable"
        bone: {
          DEFAULT: '#FAF8F4', // fondo blanco hueso
          50: '#FDFCFA',
          100: '#FAF8F4',
          200: '#F1ECE3',
          300: '#E6DECF',
        },
        petrol: {
          // azul petróleo (primario)
          DEFAULT: '#0E3A45',
          50: '#EAF2F3',
          100: '#CFE0E2',
          200: '#9CBEC3',
          300: '#5E8E96',
          400: '#2E646E',
          500: '#0E3A45',
          600: '#0B2F38',
          700: '#08242B',
          800: '#06191E',
          900: '#030E11',
        },
        amber: {
          // acento cálido (CTA)
          DEFAULT: '#E0A04B',
          50: '#FBF3E6',
          100: '#F6E3C5',
          200: '#EFCB95',
          300: '#E7B36C',
          400: '#E0A04B',
          500: '#C9852E',
          600: '#A56A22',
          700: '#7E5019',
        },
        ink: '#13241F', // texto principal (verde casi negro, cálido)
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
        soft: '0 1px 2px rgba(14,58,69,0.04), 0 8px 24px -12px rgba(14,58,69,0.16)',
        lift: '0 2px 4px rgba(14,58,69,0.06), 0 24px 48px -20px rgba(14,58,69,0.28)',
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(224,160,75,0.5)' },
          '70%': { boxShadow: '0 0 0 12px rgba(224,160,75,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(224,160,75,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
