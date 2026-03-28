'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/shared/store';
import { ProductWithRelations } from '@/@types/prisma';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get('sort') ? searchParams.get('sort') : 'name_asc';

  const sortedItems = React.useMemo(() => {
    if (!sort) return items;

    const arr = [...items];

    const getPrice = (product: ProductWithRelations) =>
      product.items?.[0]?.price || 0;

    switch (sort) {
      case 'price_asc':
        return arr.sort((a, b) => getPrice(a) - getPrice(b));

      case 'price_desc':
        return arr.sort((a, b) => getPrice(b) - getPrice(a));

      case 'name_asc':
        return arr.sort((a, b) => a.name.localeCompare(b.name));

      case 'name_desc':
        return arr.sort((a, b) => b.name.localeCompare(a.name));

      default:
        return arr;
    }
  }, [items, sort]);

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div
        className={cn(
          'grid grid-cols-1 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3 justify-items-center gap-5 xl2:gap-6',
          listClassName
        )}
      >
        {sortedItems.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
            className=""
          />
        ))}
      </div>
    </div>
  );
};
