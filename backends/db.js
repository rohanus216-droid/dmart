import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres({
  host: 'db.kiaqlarshmbylzjiwzec.supabase.co',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: '1234DRACULAW@1!!',
  ssl: 'require'
});

export default sql;
