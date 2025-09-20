'use client';

import clsx from 'clsx';
import Link from 'next/link';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { forwardRef } from 'react';

type BaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  glow?: boolean;
  as?: 'button' | 'link';
  href?: string;
  surfaceClassName?: string;
};

type ButtonProps = BaseProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type Button3DProps = ButtonProps;

const buttonBaseStyles =
  'relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-0 focus:ring-0';

const surfaces: Record<NonNullable<Button3DProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-accent-cyan/90 via-accent-magenta/90 to-accent-lime/80 text-slate-950 shadow-neon hover:-translate-y-1 hover:shadow-neon-magenta',
  secondary:
    'bg-[rgba(12,11,34,0.85)] text-foreground shadow-outline hover:-translate-y-1 hover:shadow-neon',
  ghost:
    'border border-white/20 bg-transparent text-foreground hover:-translate-y-1 hover:border-accent-neon/70 hover:text-accent-neon'
};

const Button3D = forwardRef<HTMLButtonElement, Button3DProps>(function Button3D(
  { children, variant = 'primary', glow = true, as = 'button', href, className, surfaceClassName, ...props },
  ref
) {
  const surfaceClasses = clsx(
    buttonBaseStyles,
    surfaces[variant],
    glow && 'before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-accent-cyan/20 before:blur-2xl before:content-[""]',
    'focus-ring-neon',
    surfaceClassName
  );

  if (as === 'link' && href) {
    return (
      <Link href={href} className={clsx('group relative inline-block focus:outline-none focus:ring-0', className)}>
        <span className={surfaceClasses}>
          <span className="pointer-events-none block text-[0.65rem] tracking-[0.35em]">{children}</span>
        </span>
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = props;

  return (
    <button
      ref={ref}
      type={type}
      {...buttonProps}
      className={clsx('group relative inline-block focus:outline-none focus:ring-0', className)}
    >
      <span className={surfaceClasses}>
        <span className="pointer-events-none block text-[0.65rem] tracking-[0.35em]">{children}</span>
      </span>
    </button>
  );
});

export default Button3D;
