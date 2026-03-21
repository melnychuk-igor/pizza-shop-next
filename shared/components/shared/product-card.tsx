import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  return (
    <div className={className}>
      <Link
        href={`/product/${id}`}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex justify-center items-center p-1 bg-secondary rounded-lg h-[260px]">
          <img
            className="w-[215px] h-[215px] object-cover"
            src={imageUrl}
            alt={name}
          />
        </div>

        <div>
          <div className="flex flex-col justify-between ">
            <Title text={name} size="sm" className="mb-1 font-bold" />

            <p className="text-sm text-gray-400">
              {ingredients.map((ingredient) => ingredient.name).join(', ')}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-[20px]">
              from <b>{price} $</b>
            </span>

            <Button variant="secondary" className="text-base font-bold">
              <Plus size={20} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
