import * as dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

dotenv.config({path : `.env.${process.env.NODE_ENV || 'local'}`})

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: ['public'],
  introspect: { casing: 'preserve'},
  casing: 'snake_case'
});