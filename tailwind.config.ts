import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#070B14',
        surface: '#0D1425',
        'surface-2': '#111827',
        purple: { neon: '#8B5CF6', light: '#A78BFA', dark: '#6D28D9' },
        blue: { electric: '#3B82F6', light: '#60A5FA' },
        pink: { neon: '#EC4899', light: '#F472B6' },
        cyan: { accent: '#06B6D4', light: '#22D3EE' },
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2)',
        'neon-blue':   '0 0 20px rgba(59,130,246,0.5),  0 0 40px rgba(59,130,246,0.2)',
        'neon-pink':   '0 0 20px rgba(236,72,153,0.5),  0 0 40px rgba(236,72,153,0.2)',
        'neon-cyan':   '0 0 20px rgba(6,182,212,0.5),   0 0 40px rgba(6,182,212,0.2)',
      },
      keyframes: {
        'pulse-neon': {
          '0%,100%': { opacity: '1', boxShadow: '0 0 5px currentColor, 0 0 20px currentColor' },
          '50%': { opacity: '0.7', boxShadow: '0 0 2px currentColor, 0 0 8px currentColor' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out 1s infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config
