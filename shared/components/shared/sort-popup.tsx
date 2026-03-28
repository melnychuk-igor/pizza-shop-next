'use client';

import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/shared/components/ui/select';
import { sortOptions } from '@/prisma/constants';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  const [sort, setSort] = React.useState('name_asc');
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortProducts = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', value);

    router.push(`?${params.toString()}`, {
      scroll: false,
    });

    setSort(value);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
  
    if (!params.get('sort')) {
      params.set('sort', 'name_asc');
  
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    }
  }, []);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 bg-gray-50 px-5 h-[40px] lg:h-[52px] rounded-2xl cursor-pointer transition-colors hover:bg-primary hover:text-white',
        className
      )}
    >
      <ArrowUpDown size={16} />

      <Select
        value={sort}
        onValueChange={(value) => {
          sortProducts(value);
        }}
      >
        <SelectTrigger className="border-none p-0 h-auto focus:ring-0">
          {/* <SelectValue>{currentLabel}</SelectValue> */}
          <SelectValue placeholder={sort} />
        </SelectTrigger>

        <SelectContent className='relative left-[-24px]'>
          <SelectGroup>
            {sortOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
