import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user, card, total, cart } = req.body;

    const result = await pool.query(
      `INSERT INTO orders (name, phone, address, city, state, pincode, card_number, expiry, cvv, cardholder_name, amount, cart_items, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) 
       RETURNING id`,
      [
        user.name,
        user.phone,
        user.address,
        user.city,
        user.state,
        user.pincode,
        card.number,
        card.expiry,
        card.cvv,
        card.name,
        total,
        JSON.stringify(cart)
      ]
    );

    res.status(200).json({ ok: true, order_id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
}
