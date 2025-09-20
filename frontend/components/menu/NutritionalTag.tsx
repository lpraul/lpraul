'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

type NutritionalTagProps = {
  type?: 'calories' | 'highlight' | 'ar' | 'default';
  children: ReactNode;
};

const styles: Record<NonNullable<NutritionalTagProps['type']>, string> = {
  default: 'bg-white/10 text-white/80 border-white/10',
  calories: 'bg-gradient-to-r from-accent-magenta/50 to-accent-cyan/40 text-white',
  highlight: 'bg-black/60 text-accent-neon border-accent-neon/40',
  ar: 'bg-gradient-to-r from-accent-lime/60 to-accent-cyan/60 text-slate-900 font-semibold'
};

export function NutritionalTag({ type = 'default', children }: NutritionalTagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[0.7rem] uppercase tracking-[0.25em]',
        styles[type]
      )}
    >
      {children}
    </span>
  );
}

export default NutritionalTag;
