'use client';

import { useMemo, useState } from 'react';
import MenuCategoryTabs from '@/components/menu/MenuCategoryTabs';
import MenuCard from '@/components/menu/MenuCard';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import HologramCard from '@/components/ui/HologramCard';
import Button3D from '@/components/ui/Button3D';

const categories = [
  { id: 'signatures', label: 'Signature', badge: 'Top ventas' },
  { id: 'plant-based', label: 'Plant-Based', badge: 'Vegano' },
  { id: 'comfort', label: 'Comfort', badge: 'Novedad' },
  { id: 'sweet', label: 'Sweet Lab', badge: 'Limited' }
];

const menuItems = [
  {
    id: 'quantum-taco',
    name: 'Quantum Taco',
    description: 'Maíz azul, birria vegetal, polvo de lima liofilizada',
    price: 8.5,
    category: 'signatures',
    tags: ['picante', 'sin gluten'],
    calories: 420,
    arReady: true,
    image: '/images/quantum-taco.svg'
  },
  {
    id: 'lunar-ramen',
    name: 'Lunar Ramen',
    description: 'Caldo de kombu, noodles de spirulina, huevo 64°',
    price: 12.9,
    category: 'signatures',
    tags: ['confort'],
    calories: 540,
    arReady: true,
    image: '/images/lunar-ramen.svg'
  },
  {
    id: 'nebula-salad',
    name: 'Nebula Salad',
    description: 'Brotes vivos, hummus de remolacha, perlas cítricas',
    price: 10.2,
    category: 'plant-based',
    tags: ['vegano', 'raw'],
    calories: 320,
    arReady: false,
    image: '/images/nebula-salad.svg'
  },
  {
    id: 'galaxy-burger',
    name: 'Galaxy Burger',
    description: 'Proteína vegetal, cheddar de anacardo, pan brioche uv',
    price: 11.5,
    category: 'comfort',
    tags: ['plant-forward'],
    calories: 680,
    arReady: true,
    image: '/images/galaxy-burger.svg'
  },
  {
    id: 'meteorite-brownie',
    name: 'Meteorite Brownie',
    description: 'Cacao de origen, nibs caramelizados, helado nitro',
    price: 6.5,
    category: 'sweet',
    tags: ['sin gluten'],
    calories: 510,
    arReady: false,
    image: '/images/meteorite-brownie.svg'
  }
];

type FilterState = {
  veganOnly: boolean;
  spicy: boolean;
  arView: boolean;
};

const initialFilters: FilterState = {
  veganOnly: false,
  spicy: false,
  arView: false
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? 'signatures');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');

  const predictiveSuggestions = useMemo(() => {
    if (!searchTerm) return [] as string[];
    return menuItems
      .map((item) => item.name)
      .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);
  }, [searchTerm]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.category !== activeCategory) return false;
      if (filters.veganOnly && !item.tags.includes('vegano')) return false;
      if (filters.spicy && !item.tags.includes('picante')) return false;
      if (filters.arView && !item.arReady) return false;
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, filters, searchTerm]);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.4em] text-accent-neon">Menú interactivo</p>
          <h1 className="text-4xl font-display leading-tight">Explora, filtra y proyecta en realidad aumentada</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">Búsqueda predictiva</span>
              <input
                type="search"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Busca por ingrediente, mood o textura"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-describedby={predictiveSuggestions.length ? 'predictive-results' : undefined}
              />
            </label>
            {predictiveSuggestions.length > 0 && (
              <ul
                id="predictive-results"
                role="listbox"
                className="grid gap-2 rounded-2xl border border-white/10 bg-black/50 p-3 text-sm text-white/60"
              >
                {predictiveSuggestions.map((suggestion) => (
                  <li key={suggestion} role="option" className="rounded-xl bg-white/5 px-3 py-2">
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="space-y-3">
            <ToggleSwitch
              label="Modo AR"
              description="Visualiza preparaciones holográficas"
              checked={filters.arView}
              onChange={(checked) => setFilters((prev) => ({ ...prev, arView: checked }))}
            />
            <ToggleSwitch
              label="Solo vegano"
              description="Filtra por ingredientes plant-based"
              checked={filters.veganOnly}
              onChange={(checked) => setFilters((prev) => ({ ...prev, veganOnly: checked }))}
            />
            <ToggleSwitch
              label="Toque picante"
              description="Activa platos con picante natural"
              checked={filters.spicy}
              onChange={(checked) => setFilters((prev) => ({ ...prev, spicy: checked }))}
            />
          </aside>
        </div>
      </header>

      <MenuCategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelect={(category) => setActiveCategory(category.id)}
      />

      <section className="grid gap-6 lg:grid-cols-2">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} {...item} />
        ))}
        {filteredItems.length === 0 && (
          <HologramCard
            title="Sin resultados"
            description="Ajusta los filtros o lanza una vista AR para descubrir nuevas recetas"
            icon={<span aria-hidden className="text-3xl">🔍</span>}
            action={<Button3D as="link" href="/menu" variant="ghost">reiniciar</Button3D>}
          >
            Te recomendamos desactivar al menos un filtro para ampliar las sugerencias o explorar categorías vecinas.
          </HologramCard>
        )}
      </section>
    </div>
  );
}
