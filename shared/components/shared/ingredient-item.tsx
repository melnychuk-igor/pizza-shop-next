import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md text-center relative cursor-pointer shadow-md bg-white border border-white transition-colors hover:border-primary',
        { 'border-primary': active },
        className,
      )}
      onClick={onClick}>
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img className='w-20 lg:w-full h-auto object-contain [@media(max-height:750px)]:max-h-20' src={imageUrl} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} $</span>
    </div>
  );
};
