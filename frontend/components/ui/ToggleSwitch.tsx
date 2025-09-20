'use client';

import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useId } from 'react';

type ToggleSwitchProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function ToggleSwitch({ label, description, checked, onChange }: ToggleSwitchProps) {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
          {label}
        </label>
        {description && <p className="text-sm text-white/60">{description}</p>}
      </div>
      <div className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={handleChange}
        />
        <span
          aria-hidden="true"
          className={clsx(
            'block h-9 w-16 rounded-full border border-white/20 bg-white/10 transition-colors duration-300',
            checked ? 'border-accent-neon/50 bg-accent-neon/40' : 'bg-white/10'
          )}
        />
        <span
          aria-hidden="true"
          className={clsx(
            'absolute left-1 top-1 h-7 w-7 rounded-full bg-white shadow-lg transition-all duration-300',
            'before:absolute before:left-1/2 before:top-1/2 before:h-10 before:w-10 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-accent-cyan/30 before:opacity-0 before:blur-xl before:transition-opacity before:duration-300 before:content-[""]',
            checked ? 'translate-x-7 bg-accent-neon before:opacity-100' : 'translate-x-0'
          )}
        />
      </div>
    </div>
  );
}

export default ToggleSwitch;
