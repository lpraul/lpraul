import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './store/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        accent: {
          neon: 'var(--color-accent-neon)',
          cyan: '#00f5ff',
          magenta: '#ff00f5',
          lime: '#b5ff00'
        },
        glass: 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        sans: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        display: ['"Orbitron Variable"', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'monospace']
      },
      backdropBlur: {
        glass: '24px'
      },
      boxShadow: {
        neon: '0 10px 30px rgba(0, 245, 255, 0.45)',
        'neon-magenta': '0 10px 30px rgba(255, 0, 245, 0.35)',
        outline: '0 0 0 1px rgba(0,245,255,0.4)'
      },
      backgroundImage: {
        grid: 'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
        glow: 'radial-gradient(circle at top, rgba(0,245,255,0.4), transparent 60%)'
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        meteor: 'meteor 5s linear infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0,245,255,0.6)' },
          '50%': { boxShadow: '0 0 35px rgba(255,0,245,0.6)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        meteor: {
          '0%': { transform: 'translateX(-200%)', opacity: '0' },
          '10%, 90%': { opacity: '1' },
          '100%': { transform: 'translateX(200%)', opacity: '0' }
        }
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.glass-panel': {
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.16)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.45)'
        },
        '.text-glow': {
          textShadow: '0 0 12px rgba(0,245,255,0.6)'
        },
        '.focus-ring-neon': {
          outline: 'none',
          boxShadow:
            '0 0 0 2px rgba(10, 132, 255, 0.8), 0 0 0 6px rgba(0, 245, 255, 0.35)'
        }
      });
    })
  ]
};

export default config;
