import Button3D from '@/components/ui/Button3D';
import HologramCard from '@/components/ui/HologramCard';
import NeonCanvas from '@/components/landing/NeonCanvas';
import Link from 'next/link';

const expressBadges = [
  { label: 'Envío 4D', description: 'Control en tiempo real del rider' },
  { label: 'Cobertura 12km', description: 'Domina la ciudad con logística autónoma' },
  { label: 'Huella cero', description: 'Packaging compostable con seguimiento de reciclaje' }
];

export default function Page() {
  return (
    <div className="relative flex flex-1 flex-col gap-16">
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-8">
          <p className="text-sm uppercase tracking-[0.5em] text-accent-neon">LPRAUL OS 2025</p>
          <h1 className="text-5xl font-display leading-tight text-balance">
            Cocina inteligente que responde a tus antojos en <span className="text-accent-neon">tiempo cuántico</span>.
          </h1>
          <p className="max-w-xl text-lg text-white/80">
            Orquesta pedidos, riders y experiencias inmersivas desde un solo hub. WebGL, AR y analítica predictiva
            trabajan en segundo plano para servir la cena del futuro.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button3D as="link" href="/menu">
              explorar menú
            </Button3D>
            <Button3D as="link" href="/cart" variant="secondary">
              seguimiento express
            </Button3D>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {expressBadges.map((badge) => (
              <div
                key={badge.label}
                className="rounded-2xl border border-accent-neon/20 bg-white/5 p-4 text-sm text-white/70 shadow-inner backdrop-blur-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-neon">{badge.label}</p>
                <p>{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-3xl">
          <NeonCanvas />
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
            src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-xl">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Pedido rápido</p>
              <p className="text-lg font-display text-white">Taco cósmico listo en 12:24</p>
            </div>
            <Button3D as="link" href="/menu" variant="ghost">
              lanzar
            </Button3D>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <HologramCard
          title="Kits inmersivos"
          description="Activa experiencias AR-ready para cada plato"
          icon={<span aria-hidden className="text-3xl">⚡</span>}
          action={<Link href="/menu" className="text-xs uppercase tracking-[0.3em] text-accent-neon">Ver categorías</Link>}
        >
          Visualiza recetas en 3D, superpone información nutricional en realidad aumentada y comparte pedidos con tu
          comunidad en cuestión de segundos.
        </HologramCard>
        <HologramCard
          title="IA logística"
          description="Predicciones de demanda hasta con 48h de antelación"
          icon={<span aria-hidden className="text-3xl">🛰️</span>}
          action={<Link href="/orders" className="text-xs uppercase tracking-[0.3em] text-accent-neon">Panel de pedidos</Link>}
        >
          El motor analiza tráfico, clima y hábitos para ajustar el inventario y los tiempos de envío en tiempo real.
          Mantente siempre un paso adelante.
        </HologramCard>
        <HologramCard
          title="Perfil sensorial"
          description="Personaliza sabores con telemetría gustativa"
          icon={<span aria-hidden className="text-3xl">💠</span>}
          action={<Link href="/profile" className="text-xs uppercase tracking-[0.3em] text-accent-neon">Configurar</Link>}
        >
          Tus preferencias nutricionales, alergias y ritmos circadianos se sincronizan para ofrecer combinaciones perfectas
          en cada visita.
        </HologramCard>
      </section>
    </div>
  );
}
