import { Pool } from 'pg';

const pool = new Pool({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  username: 'postgres.oznvrkuwhcfxtgijsdgf',
  password: '1234DMARTDB@1',
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  console.log('Save order API called with method:', req.method);
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Request body received:', { 
      user: req.body.user ? 'present' : 'missing',
      card: req.body.card ? 'present' : 'missing', 
      total: req.body.total,
      cart: req.body.cart ? `${req.body.cart.length} items` : 'missing'
    });

    const { user, card, total, cart } = req.body;

    // Validate required fields
    if (!user || !card || !total || !cart) {
      console.error('Missing required fields:', { user: !!user, card: !!card, total: !!total, cart: !!cart });
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    console.log('Attempting database connection...');
    
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

    console.log('Order saved successfully with ID:', result.rows[0].id);
    res.status(200).json({ ok: true, order_id: result.rows[0].id });
  } catch (error) {
    console.error('Database error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail
    });
    res.status(500).json({ ok: false, error: error.message });
  }
}
