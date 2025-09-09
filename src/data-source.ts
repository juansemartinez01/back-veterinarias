import 'dotenv/config';
import { DataSource } from 'typeorm';

const isSSL = process.env.DATABASE_URL?.includes('sslmode=require');

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: isSSL ? { rejectUnauthorized: false } : undefined,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
