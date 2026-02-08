import dotenv from 'dotenv';
import sql from './db.js';

dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected successfully!');
    console.log('📅 Server time:', result[0].now);
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
