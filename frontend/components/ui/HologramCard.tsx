'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useId } from 'react';

export type HologramCardProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export function HologramCard({ title, description, icon, action, className, children }: HologramCardProps) {
  const id = useId();

  return (
    <article
      aria-labelledby={`${id}-title`}
      className={clsx(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-foreground shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-neon',
        'focus-within:focus-ring-neon focus:outline-none',
        'glass-surface clip-path-futuristic',
        className
      )}
      tabIndex={0}
    >
      <div className="grid-overlay" aria-hidden="true" />
      <div className="relative z-10 flex flex-col gap-4">
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-cyan/20 text-accent-neon shadow-neon">
                {icon}
              </span>
            )}
            <div className="space-y-1">
              <h3 id={`${id}-title`} className="text-xl font-display tracking-[0.2em] uppercase">
                {title}
              </h3>
              {description && <p className="text-sm text-white/70">{description}</p>}
            </div>
          </div>
          {action}
        </header>
        {children && <div className="text-sm leading-relaxed text-white/80">{children}</div>}
      </div>
      <div className="pointer-events-none absolute -inset-px -z-10 bg-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </article>
  );
}

export default HologramCard;
