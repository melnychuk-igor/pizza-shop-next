'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { Category } from '@prisma/client';
import { Filters } from './filters';

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const filtersRef = React.useRef<HTMLDivElement | null>(null);

  const showMenuFilters = () => {
    setShowFilters((prev) => !prev);
  };

  // 👉 Закриття при кліку поза Filters
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showFilters]);

  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-2 lg:py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className="flex items-center justify-between relative">
        <Categories items={categories} />

        <div
          ref={filtersRef}
          className={cn(
            'absolute top-[64px] left-0 -translate-x-full transition-transform bg-white pl-4 pr-8 pb-4 block lg:hidden overflow-y-auto max-h-[calc(100svh_-_76px)]',
            { 'translate-x-0': showFilters }
          )}
        >
          <Filters />
        </div>

        <div
          className={cn('burger block lg:hidden', {
            'burger--active': showFilters,
          })}
          onClick={showMenuFilters}
        >
          <span></span>
        </div>

        <SortPopup />
      </Container>
    </div>
  );
};
