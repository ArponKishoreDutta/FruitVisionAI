/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#fff1f3',
          100: '#ffe4e8',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        fruit: {
          strawberry: '#FF2E63',
          orange: '#FF8C00',
          mango: '#FFC107',
          lime: '#10B981',
          berry: '#8B5CF6',
          sky: '#0EA5E9',
          apple: '#EF4444',
          lemon: '#EAB308',
          grape: '#9333EA',
          banana: '#F59E0B',
          kiwi: '#22C55E',
          watermelon: '#F43F5E',
        },
        space: {
          950: '#060810',
          900: '#0B0F19',
          800: '#111827',
          700: '#1a2235',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(340,100%,76%,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(270,100%,76%,0.1) 0px, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-slower': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'orbit': 'orbit 8s linear infinite',
        'blob': 'blob 10s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'count-up': 'countUp 1s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'neon-flicker': 'neonFlicker 3s ease-in-out infinite',
        'aurora': 'aurora 15s ease infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'border-dance': 'borderDance 4s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(6deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-4deg)' },
        },
        scan: {
          '0%': { top: '0%' },
          '50%': { top: '95%' },
          '100%': { top: '0%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.6' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '50% 50%', backgroundSize: '300% 300%' },
          '50%': { backgroundPosition: '100% 100%', backgroundSize: '200% 200%' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        borderDance: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      boxShadow: {
        'glow-strawberry': '0 0 30px -5px rgba(244, 63, 94, 0.6)',
        'glow-orange': '0 0 30px -5px rgba(255, 140, 0, 0.6)',
        'glow-mango': '0 0 30px -5px rgba(255, 193, 7, 0.6)',
        'glow-lime': '0 0 30px -5px rgba(16, 185, 129, 0.6)',
        'glow-berry': '0 0 30px -5px rgba(139, 92, 246, 0.6)',
        'glow-sky': '0 0 30px -5px rgba(14, 165, 233, 0.6)',
        'glow-rose': '0 0 40px -8px rgba(244, 63, 94, 0.5)',
        'glow-purple': '0 0 40px -8px rgba(147, 51, 234, 0.5)',
        'glow-amber': '0 0 40px -8px rgba(245, 158, 11, 0.5)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.1)',
        'card': '0 4px 24px -4px rgba(0,0,0,0.4), 0 2px 8px -2px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px -8px rgba(0,0,0,0.5), 0 4px 16px -4px rgba(0,0,0,0.4)',
      },
      blur: {
        '4xl': '100px',
        '5xl': '160px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
