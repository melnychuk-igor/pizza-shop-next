'use client';

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [opened, setOpened] = React.useState(false);
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
    setOpened(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
    setOpened(false);
  };

  return (
    <>
      {focused && <div className="fixed inset-0 bg-black/50 z-30" />}

      <div ref={ref} className={cn('relative z-30 flex items-center', className)}>
        
        {/* 🔍 ІКОНКА */}
        {/* {!opened && ( */}
          <button
            onClick={() => setOpened(true)}
            className={cn(
              "flex items-center justify-center w-10 h-10 transition-opacity shadow-md rounded-full",
              {'opacity-0': opened},
            )}
          >
            <Search className="h-5 w-5 text-gray-500" />
          </button>
        {/* // )} */}

        {/* 🔎 INPUT */}
        <div
          className={cn(
            'transition-all duration-300 overflow-hidden',
            'absolute left-0 top-0 h-11 bg-white rounded-2xl shadow-md flex items-center',
            opened ? 'w-[280px] opacity-100 px-3 pointer-events-auto' : 'w-[40px] pointer-events-none opacity-0'
          )}
        >
          <Search className="h-5 w-5 min-w-5 text-gray-400 mr-2" />

          <input
            autoFocus={opened}
            className="w-full outline-none bg-transparent"
            type="text"
            placeholder="Find pizza..."
            onFocus={() => setFocused(true)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            onClick={() => {
              setOpened(false);
              setSearchQuery('');
            }}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* RESULTS */}
        {products.length > 0 && opened && (
          <div
            className={cn(
              'absolute w-[280px] bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0',
              focused && 'visible opacity-100 top-12',
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
              >
                <img
                  className="rounded-sm h-8 w-8"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};