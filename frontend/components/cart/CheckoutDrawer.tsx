'use client';

import clsx from 'clsx';
import { useEffect, useId, useRef } from 'react';
import { useCart, type OrderStatus } from '@/store/cartStore';
import Button3D from '@/components/ui/Button3D';

const statusFlow: OrderStatus[] = ['idle', 'processing', 'preparing', 'en-route', 'delivered'];

const checkoutSteps: { id: 'menu' | 'customize' | 'review' | 'payment' | 'tracking'; label: string; description: string }[] = [
  { id: 'menu', label: 'Selección', description: 'Explora y añade platos' },
  { id: 'customize', label: 'Personaliza', description: 'Ajusta toppings y alérgenos' },
  { id: 'review', label: 'Resumen', description: 'Confirma cantidades y notas' },
  { id: 'payment', label: 'Pago', description: 'Elige método y propina' },
  { id: 'tracking', label: 'Tracking', description: 'Sigue el recorrido en vivo' }
];

type CheckoutDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CheckoutDrawer({ open, onClose }: CheckoutDrawerProps) {
  const dialogId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const { state, subtotal, itemCount, updateQuantity, removeItem, setStep, setStatus, clear } = useCart();

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const currentIndex = statusFlow.indexOf(state.status);
    if (currentIndex === -1 || currentIndex >= statusFlow.length - 1) {
      return;
    }
    const nextStatus = statusFlow[currentIndex + 1];
    const timer = setTimeout(() => {
      setStatus(nextStatus);
    }, 15000);
    return () => clearTimeout(timer);
  }, [open, setStatus, state.status]);

  const moveToNextStep = () => {
    const currentIndex = checkoutSteps.findIndex((step) => step.id === state.step);
    const nextStep = checkoutSteps[Math.min(checkoutSteps.length - 1, currentIndex + 1)];
    if (nextStep) {
      setStep(nextStep.id);
    }
  };

  return (
    <div
      className={clsx(
        'pointer-events-none fixed inset-0 z-40 flex items-end justify-end bg-black/40 transition-opacity duration-500',
        open ? 'pointer-events-auto opacity-100' : 'opacity-0'
      )}
      aria-hidden={!open}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${dialogId}-title`}
        className={clsx(
          'glass-surface relative w-full max-w-xl translate-y-0 rounded-t-3xl border border-white/15 bg-black/70 p-6 shadow-neon transition-transform duration-500',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Carrito en vivo</p>
            <h2 id={`${dialogId}-title`} className="text-2xl font-display text-white">
              {itemCount} items • ${subtotal.toFixed(2)}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/60 focus:outline-none focus:ring-0"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">{item.name}</p>
                <p className="text-xs text-white/50">{item.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label={`Reducir ${item.name}`}
                  className="h-8 w-8 rounded-full bg-white/10 text-white/80"
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                >
                  −
                </button>
                <span aria-live="polite" className="min-w-[2ch] text-center text-sm text-white">
                  {item.quantity}
                </span>
                <button
                  aria-label={`Aumentar ${item.name}`}
                  className="h-8 w-8 rounded-full bg-white/10 text-white/80"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="rounded-full bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/60"
                  onClick={() => removeItem(item.id)}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Estado del pedido</p>
          <ol className="space-y-3">
            {checkoutSteps.map((step, index) => {
              const isActive = step.id === state.step;
              const isCompleted = index < checkoutSteps.findIndex((s) => s.id === state.step);
              return (
                <li
                  key={step.id}
                  className={clsx(
                    'flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors',
                    isActive
                      ? 'border-accent-neon/40 bg-accent-neon/15 text-white'
                      : isCompleted
                        ? 'border-white/20 bg-white/10 text-white/70'
                        : 'border-white/10 bg-transparent text-white/50'
                  )}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em]">{step.label}</p>
                    <p className="text-xs text-white/60">{step.description}</p>
                  </div>
                  {isActive && <span aria-hidden className="text-accent-neon">●</span>}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button3D variant="secondary" onClick={clear}>
            limpiar
          </Button3D>
          <Button3D onClick={moveToNextStep}>continuar</Button3D>
        </div>
      </aside>
    </div>
  );
}

export default CheckoutDrawer;
