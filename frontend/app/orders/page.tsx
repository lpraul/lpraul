import HologramCard from '@/components/ui/HologramCard';
import Button3D from '@/components/ui/Button3D';

const mockOrders = [
  {
    id: 'A52X-93',
    status: 'En ruta',
    eta: '08:32 min',
    items: ['Quantum Taco x2', 'Stellar Agua Tónica'],
    progress: 75
  },
  {
    id: 'A52X-90',
    status: 'Entregado',
    eta: 'Hace 2h',
    items: ['Lunar Ramen', 'Nebula Salad'],
    progress: 100
  }
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-accent-neon">Pedidos activos</p>
        <h1 className="text-4xl font-display leading-tight">Monitorea riders, tiempos y feedback en vivo</h1>
        <p className="max-w-xl text-white/70">
          Activa notificaciones multicanal, exporta reportes y sincroniza con tu kitchen display system.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        {mockOrders.map((order) => (
          <HologramCard
            key={order.id}
            title={`Orden ${order.id}`}
            description={`Estado: ${order.status}`}
            icon={<span aria-hidden className="text-3xl">🚀</span>}
            action={<Button3D as="link" href="/cart" variant="ghost">Ver detalles</Button3D>}
          >
            <p className="text-sm text-white/70">ETA: {order.eta}</p>
            <p className="text-xs text-white/50">{order.items.join(' • ')}</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-magenta"
                style={{ width: `${order.progress}%` }}
              />
            </div>
          </HologramCard>
        ))}
      </section>
    </div>
  );
}
