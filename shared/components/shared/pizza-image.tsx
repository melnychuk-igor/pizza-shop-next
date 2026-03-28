import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  return (
    <div className={cn('flex items-center justify-center relative w-full lg:w-1/2 min-h-[320px]', className)}>
      <img
        src={imageUrl}
        alt="Logo"
        className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
          'w-[200px] [@media(min-width:1024px)_and_(min-height:800px)]:w-[300px] h-[200px] [@media(min-width:1024px)_and_(min-height:800px)]:h-[300px]': size === 20,
          'w-[250px] [@media(min-width:1024px)_and_(min-height:800px)]:w-[400px] h-[250px] [@media(min-width:1024px)_and_(min-height:800px)]:h-[400px]': size === 30,
          'w-[300px] [@media(min-width:1024px)_and_(min-height:800px)]:w-[500px] h-[300px] [@media(min-width:1024px)_and_(min-height:800px)]:h-[500px]': size === 40,
        })}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[270px] [@media(min-width:1024px)_and_(min-height:800px)]:w-[450px] h-[270px] [@media(min-width:1024px)_and_(min-height:800px)]:h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[230px] [@media(min-width:1024px)_and_(min-height:800px)]:w-[370px] h-[230px] [@media(min-width:1024px)_and_(min-height:800px)]:h-[370px]" />
    </div>
  );
};
