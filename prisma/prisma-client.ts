// import { PrismaClient } from '@prisma/client';

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;



// import { PrismaClient } from '@prisma/client';

// const prismaClientSingleton = () => {
//   // Просто передаємо порожній обʼєкт
//   return new PrismaClient({
//     log: ['query', 'info'], // можна залишити для дебагу
//   });
// };

// declare global {
//   var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// // singleton для hot-reload Next.js
// export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;







import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is missing');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'info'] : ['error'],
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;