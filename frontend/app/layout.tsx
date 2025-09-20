import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Orbitron, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/store/cartStore';
import { ThemeProvider } from '@/components/ui/theme-context';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import Button3D from '@/components/ui/Button3D';
import type { ReactNode } from 'react';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'LPRAUL • Cocina del 2025',
    template: '%s — LPRAUL Kitchen OS'
  },
  description:
    'Sistema modular de pedidos para LPRAUL con estética futurista, soporte AR y experiencia omnicanal.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' }
    ],
    apple: '/icons/icon-512.svg'
  },
  themeColor: '#05020e'
};

export const viewport: Viewport = {
  themeColor: '#05020e'
};

type RootLayoutProps = {
  children: ReactNode;
};

function Sidebar() {
  const navItems = [
    { href: '/', label: 'Inicio', description: 'Panel holográfico', icon: '⌂' },
    { href: '/menu', label: 'Menú', description: 'Experiencia inmersiva', icon: '☰' },
    { href: '/orders', label: 'Pedidos', description: 'Seguimiento en vivo', icon: '⟳' },
    { href: '/profile', label: 'Perfil', description: 'Identidad biométrica', icon: '⧗' }
  ];

  return (
    <aside className="glass-surface relative flex h-full w-full max-w-xs flex-col gap-8 overflow-hidden p-6">
      <div className="grid-overlay" aria-hidden="true" />
      <div className="relative z-10 flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-3 text-2xl font-display uppercase tracking-[0.6em]">
          <span className="text-accent-neon">LP</span>
          <span className="text-white/70">RAUL</span>
        </Link>
        <nav aria-label="Principal" className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-white/5 bg-white/5 px-4 py-3 transition-colors duration-300 hover:border-accent-neon/40 hover:bg-white/10 focus:outline-none focus:ring-0 focus-visible:ring-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="text-lg text-accent-neon">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                      {item.label}
                    </p>
                    <p className="text-xs text-white/60">{item.description}</p>
                  </div>
                </div>
                <span aria-hidden className="text-white/40 transition-transform duration-300 group-hover:translate-x-1">
                  ›
                </span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="space-y-4">
          <ThemeToggle />
          <CallToActionCard />
        </div>
      </div>
    </aside>
  );
}

function CallToActionCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent-neon/30 bg-accent-neon/10 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,249,255,0.4),_transparent_60%)]" aria-hidden />
      <div className="relative flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Envío exprés</p>
        <h3 className="text-xl font-display text-white">Llega en menos de 20 minutos</h3>
        <Button3D as="link" href="/cart">
          ver carrito
        </Button3D>
      </div>
    </div>
  );
}

function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full gap-6 p-6 text-foreground">
      <Sidebar />
      <main className="glass-surface relative z-10 flex-1 overflow-hidden rounded-3xl p-8">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative flex min-h-full flex-col gap-8" id="main-content">
          {children}
        </div>
      </main>
    </div>
  );
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        {children}
        <ServiceWorkerRegister />
      </CartProvider>
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50">
          Ir al contenido principal
        </a>
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
