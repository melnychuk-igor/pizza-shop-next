// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient()

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma
// }


// libs/prisma.ts
// libs/prisma.ts


// libs/prisma.ts


// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as {
//   prisma: ReturnType<typeof prismaClientSingleton> | undefined;
// };

// const prismaClientSingleton = () => {
//   const url = process.env.DATABASE_URL;

//   if (!url) {
//     throw new Error('DATABASE_URL не задано в .env або Vercel Environment Variables');
//   }

//   if (!url.startsWith('prisma://') && !url.startsWith('prisma+postgres://')) {
//     throw new Error(
//       'DATABASE_URL повинен починатися з prisma:// або prisma+postgres:// ' +
//       '(це Accelerate connection string). Перевір .env або Vercel.'
//     );
//   }

//   return new PrismaClient({
//     accelerateUrl: url,  // ← саме цей параметр для Prisma Accelerate
//     log:
//       process.env.NODE_ENV === 'development'
//         ? ['query', 'info', 'warn', 'error']
//         : ['error'],
//   });
// };

// export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }




// libs/prisma.ts — варіант з pg-адаптером (для postgres://...)
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error('DATABASE_URL не задано');
  }

  // Видаляємо перевірку протоколу або робимо її опціональною
  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn'] : ['error'],
  });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}




// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ['error'],
//   })

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma
// }
