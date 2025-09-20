'use client';

import { useMemo, useState } from 'react';
import CheckoutDrawer from '@/components/cart/CheckoutDrawer';
import Button3D from '@/components/ui/Button3D';
import HologramCard from '@/components/ui/HologramCard';
import { useCart } from '@/store/cartStore';

const recommendation = {
  id: 'stellar-agua',
  name: 'Stellar Agua Tónica',
  description: 'Infusión cítrica ionizada, notas de jengibre orbital',
  price: 3.9,
  calories: 45,
  tags: ['refresco'],
  arReady: false
};

export default function CartPage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { state, addItem, subtotal, itemCount } = useCart();

  const eta = useMemo(() => {
    switch (state.status) {
      case 'idle':
        return 'Listo cuando tú decidas';
      case 'processing':
        return 'Confirmando cocina y riders';
      case 'preparing':
        return 'Chefs sintetizando sabores';
      case 'en-route':
        return 'Rider autónomo en camino';
      case 'delivered':
        return 'Pedido entregado';
      default:
        return 'Sincronizando';
    }
  }, [state.status]);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.4em] text-accent-neon">Estado en tiempo real</p>
        <h1 className="text-4xl font-display leading-tight">Gestiona tu carrito y seguimiento paso a paso</h1>
        <div className="flex flex-wrap items-center gap-4" aria-live="polite">
          <span className="rounded-full border border-accent-neon/40 bg-accent-neon/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent-neon">
            {state.status.toUpperCase()}
          </span>
          <span className="text-sm text-white/70">{eta}</span>
        </div>
      </header>

      <section className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-6">
          {state.items.length === 0 ? (
            <HologramCard
              title="Tu carrito está vacío"
              description="Añade platos del menú o prueba una recomendación inteligente"
              icon={<span aria-hidden className="text-3xl">🛸</span>}
              action={
                <Button3D onClick={() => addItem({ ...recommendation, quantity: 1, id: recommendation.id })}>
                  añadir bebida
                </Button3D>
              }
            >
              Sincronizamos tu historial gustativo para sugerirte combinaciones complementarias y balanceadas.
            </HologramCard>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">{item.name}</p>
                    <p className="text-xs text-white/50">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-accent-neon">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-white/50">{item.quantity} unidades</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Resumen</p>
              <span className="text-sm text-white/80">{itemCount} items</span>
            </div>
            <p className="mt-4 text-3xl font-display text-white">${subtotal.toFixed(2)}</p>
            <p className="text-sm text-white/50">Impuestos y envío calculados al confirmar</p>
            <Button3D className="mt-6 w-full" onClick={() => setDrawerOpen(true)}>
              avanzar checkout
            </Button3D>
          </div>

          <HologramCard
            title="Recomendación sensorial"
            description="Optimizada por IA según tus elecciones"
            icon={<span aria-hidden className="text-3xl">🌌</span>}
            action={
              <Button3D variant="ghost" onClick={() => addItem({ ...recommendation, quantity: 1, id: recommendation.id })}>
                sumar al carrito
              </Button3D>
            }
          >
            Refresca tu paladar con notas cítricas mientras preparas la mesa para una experiencia inmersiva.
          </HologramCard>
        </aside>
      </section>

      <CheckoutDrawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
