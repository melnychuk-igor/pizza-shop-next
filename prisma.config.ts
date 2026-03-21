// prisma.config.ts   (at the root of the project!)
// import 'dotenv/config';          // to load .env
// import { defineConfig, env } from 'prisma/config';

// export default defineConfig({
//   schema: 'prisma/schema.prisma',   // or './prisma/schema.prisma' if needed

//   migrations: {
//     path: 'prisma/migrations',      // usually like this
//   },

//   datasource: {
//     url: env('DATABASE_URL'),       // here we specify it
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