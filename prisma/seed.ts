// import { PrismaClient } from '@prisma/client';
// import { prisma } from './prisma-client';
import 'dotenv/config';  // this will automatically load .env
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { hashSync } from 'bcryptjs';
import { categories, _ingredients, products } from './constants';
import { Prisma } from './generated/client';

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// const prisma = new PrismaClient();
// const { PrismaClient } = require('@prisma/client')


const connectionString = process.env.DATABASE_URL;




if (!connectionString) {
  throw new Error('DATABASE_URL is not set in .env');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'], // optional
});


// const prisma = new PrismaClient()




const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(3, 9),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pepperoni Fresh',
      imageUrl:
        'https://pizza-shop-next.vercel.app/assets/images/pizzeria/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Cheese',
      imageUrl:
        'https://pizza-shop-next.vercel.app/assets/images/pizzeria/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Chorizo Fresh',
      imageUrl:
        'https://pizza-shop-next.vercel.app/assets/images/pizzeria/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Pizza "Pepperoni Fresh"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Pizza "Cheese"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Pizza "Chorizo Fresh"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Other products
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://pizza-shop-next.vercel.app/assets/images/story/story1.webp',
      },
      {
        previewImageUrl:
          'https://pizza-shop-next.vercel.app/assets/images/story/story2.webp',
      },
      {
        previewImageUrl:
          'https://pizza-shop-next.vercel.app/assets/images/story/story3.webp',
      },
      {
        previewImageUrl:
          'https://pizza-shop-next.vercel.app/assets/images/story/story4.webp',
      },
      {
        previewImageUrl:
          'https://pizza-shop-next.vercel.app/assets/images/story/story5.webp',
      },
      {
        previewImageUrl:
          'https://pizza-shop-next.vercel.app/assets/images/story/story6.webp',
      },
      {
        previewImageUrl:
          'https://pizza-shop-next.vercel.app/assets/images/story/story7.webp',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
        'https://pizza-shop-next.vercel.app/assets/images/story-items/story-item1-1.webp',
      },
      {
        storyId: 1,
        sourceUrl:
        'https://pizza-shop-next.vercel.app/assets/images/story-items/story-item1-2.webp',
      },
      {
        storyId: 2,
        sourceUrl:
        'https://pizza-shop-next.vercel.app/assets/images/story-items/story-item2-1.webp',
      },
    ],
  });
}


async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}


async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
