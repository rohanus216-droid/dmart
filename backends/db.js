import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

// Use DATABASE_URL from environment, fallback to hardcoded for local development
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres.oznvrkuwhcfxtgijsdgf:1234DMARTDB@1@aws-1-ap-south-1.pooler.supabase.com:5432/postgres';

const sql = postgres(databaseUrl, {
  ssl: 'require'
});

export default sql;
