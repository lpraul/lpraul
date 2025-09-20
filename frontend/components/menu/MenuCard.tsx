'use client';

import Image from 'next/image';
import { useId } from 'react';
import Button3D from '../ui/Button3D';
import { NutritionalTag } from './NutritionalTag';
import { useCart } from '@/store/cartStore';

export type MenuCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  calories?: number;
  tags?: string[];
  arReady?: boolean;
};

export function MenuCard({ id, name, description, price, image, calories, tags = [], arReady }: MenuCardProps) {
  const { addItem } = useCart();
  const generatedId = useId();

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-neon transition-transform duration-500 hover:-translate-y-1"
      tabIndex={0}
      aria-labelledby={`${generatedId}-title`}
    >
      <div className="grid-overlay" aria-hidden="true" />
      <div className="relative flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 id={`${generatedId}-title`} className="text-lg font-display uppercase tracking-[0.25em]">
              {name}
            </h3>
            <p className="text-sm text-white/70">{description}</p>
          </div>
          {arReady && <NutritionalTag type="ar">AR Ready</NutritionalTag>}
        </div>
        {image && (
          <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {typeof calories === 'number' && <NutritionalTag type="calories">{calories} kcal</NutritionalTag>}
          {tags.map((tag) => (
            <NutritionalTag key={tag} type="highlight">
              {tag}
            </NutritionalTag>
          ))}
        </div>
        <footer className="flex items-center justify-between pt-2">
          <span className="text-xl font-semibold text-accent-neon">${price.toFixed(2)}</span>
          <Button3D
            onClick={() =>
              addItem({
                id,
                name,
                description,
                price,
                quantity: 1,
                image,
                calories,
                tags,
                isArReady: arReady
              })
            }
          >
            agregar
          </Button3D>
        </footer>
      </div>
    </article>
  );
}

export default MenuCard;
