// prisma.config.ts   (в корені проєкту!)
// import 'dotenv/config';          // щоб .env завантажувався
// import { defineConfig, env } from 'prisma/config';

// export default defineConfig({
//   schema: 'prisma/schema.prisma',   // або './prisma/schema.prisma' якщо потрібно

//   migrations: {
//     path: 'prisma/migrations',      // зазвичай так
//   },

//   datasource: {
//     url: env('DATABASE_URL'),       // саме тут вказуємо
//   },
// });

// import { defineConfig } from 'prisma/config'

// export default defineConfig({
//   schema: 'prisma/schema.prisma',

//   datasource: {
//     provider: 'postgresql',
//     url: process.env.DATABASE_URL,
//   },
// })



import 'dotenv/config'
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});



// import 'dotenv/config'
// import { env } from "prisma/config";
// import { defineConfig } from '@prisma/cli'


// export default defineConfig({
//   schema: 'prisma/schema.prisma',
//   migrations: { 
//     path: 'prisma/migrations',
//    //  seed: 'tsx prisma/seed.ts',
// 	seed: "node prisma/seed.js"
//   },
//   datasource: { 
//     url: env("DATABASE_URL") 
//   }
// });