// prisma.config.ts   (в корені проєкту!)
import 'dotenv/config';          // щоб .env завантажувався
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',   // або './prisma/schema.prisma' якщо потрібно

  migrations: {
    path: 'prisma/migrations',      // зазвичай так
  },

  datasource: {
    url: env('DATABASE_URL'),       // саме тут вказуємо
  },
});