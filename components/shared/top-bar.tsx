import React from 'react';
import { cn } from '@/lib/utils';

import { SortPopup } from './sort-popup';
import { Categories } from './categories';
import { Container } from './container';

interface Props {
  className?: string;
}

export const Topbar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lgshadow-orange/10 z-10',
        className
      )}
    >
       {/* items={categories} */}
      <Container>
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
