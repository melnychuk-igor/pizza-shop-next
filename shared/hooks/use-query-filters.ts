'use client';

import React from 'react';
import { Filters } from './use-filters';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (isMounted.current) {
      const currentParams = qs.parse(searchParams.toString(), {
        comma: true,
      })

      const newParams  = {
        ...currentParams,

        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(newParams, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [filters]);
};
