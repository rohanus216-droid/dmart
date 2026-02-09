import { json } from '@vercel/node';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user, card, total, cart } = req.body;

    // Validate required fields
    if (!user || !card || !total || !cart) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // For now, just log the order (you can integrate with a database later)
    console.log('Order received:', {
      user: { name: user.name, phone: user.phone },
      total,
      items: cart.length
    });

    // Simulate order processing
    const orderId = 'ORD' + Date.now();
    
    res.json({ 
      ok: true, 
      order_id: orderId,
      message: 'Order placed successfully!'
    });

  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Internal server error' 
    });
  }
}
