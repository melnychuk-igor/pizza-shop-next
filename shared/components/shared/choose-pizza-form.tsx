'use client';

import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';

import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';
import { cn } from '@/shared/lib/utils';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Pizza selection form
 */
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex flex-1 flex-col lg:flex-row')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-full lg:w-1/2 bg-[#f7f6f5] rounded-sm lg:rounded-none p-2 lg:p-4 xl:p-5 flex flex-col justify-between gap-3">
        <div className='flex flex-col justify-between'>
          <Title text={name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">{textDetaills}</p>

          <div className="flex flex-col gap-3 mt-3">
            <GroupVariants
              items={availableSizes}
              value={String(size)}
              onClick={(value) => setSize(Number(value) as PizzaSize)}
            />

            <GroupVariants
              items={pizzaTypes}
              value={String(type)}
              onClick={(value) => setType(Number(value) as PizzaType)}
            />
          </div>

          <div className="lg:bg-gray-50 py-2 lg:p-3 lg:rounded-md overflow-auto scrollbar mt-3">
            <div className="grid grid-cols-3 gap-3">
              {ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  onClick={() => addIngredient(ingredient.id)}
                  active={selectedIngredients.has(ingredient.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="lg:h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
