-- AlterTable
ALTER TABLE "_CartItemToIngredient" ADD CONSTRAINT "_CartItemToIngredient_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CartItemToIngredient_AB_unique";

-- AlterTable
ALTER TABLE "_IngredientToPizza" ADD CONSTRAINT "_IngredientToPizza_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_IngredientToPizza_AB_unique";
