import { defineConfig } from "@prisma/client";

export default defineConfig({
  datasource: {
    provider: "postgresql",
    // Use your Neon Postgres connection string here
    url: process.env.DATABASE_URL!,
  },
});
