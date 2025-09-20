'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

type Category = {
  id: string;
  label: string;
  description?: string;
  badge?: string;
};

type MenuCategoryTabsProps = {
  categories: Category[];
  onSelect: (category: Category) => void;
  activeCategory?: string;
};

export function MenuCategoryTabs({ categories, activeCategory, onSelect }: MenuCategoryTabsProps) {
  const [selected, setSelected] = useState(activeCategory ?? categories[0]?.id);

  useEffect(() => {
    if (activeCategory && activeCategory !== selected) {
      setSelected(activeCategory);
    }
  }, [activeCategory, selected]);

  return (
    <div
      role="tablist"
      aria-label="Categorías del menú"
      className="flex w-full flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3"
    >
      {categories.map((category) => {
        const isActive = selected === category.id;
        return (
          <button
            key={category.id}
            role="tab"
            aria-selected={isActive}
            className={clsx(
              'relative flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-0',
              'focus-ring-neon',
              isActive
                ? 'bg-gradient-to-r from-accent-cyan/80 via-accent-magenta/80 to-accent-lime/70 text-slate-950 shadow-neon'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            )}
            onClick={() => {
              setSelected(category.id);
              onSelect(category);
            }}
          >
            <span>{category.label}</span>
            {category.badge && (
              <span className="rounded-full bg-black/60 px-2 py-1 text-[0.65rem] font-medium text-white/80">
                {category.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default MenuCategoryTabs;
