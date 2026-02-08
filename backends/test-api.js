import dotenv from 'dotenv';
import sql from './db.js';

dotenv.config();

async function testOrderInsert() {
  try {
    const testData = {
      user: {
        name: 'Test User',
        phone: '1234567890',
        address: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        pincode: '123456'
      },
      card: {
        number: '1234567890123456',
        expiry: '12/25',
        cvv: '123',
        name: 'Test User'
      },
      total: 100.50,
      cart: [{name: 'Test Product', price: 50.25, quantity: 2}]
    };

    console.log('Testing order insert with data:', {
      user: testData.user ? 'present' : 'missing',
      card: testData.card ? 'present' : 'missing',
      total: testData.total,
      cart: testData.cart ? `${testData.cart.length} items` : 'missing'
    });

    const result = await sql`
      INSERT INTO orders (name, phone, address, city, state, pincode, card_number, expiry, cvv, cardholder_name, amount, cart_items, created_at) 
      VALUES (
        ${testData.user.name}, 
        ${testData.user.phone}, 
        ${testData.user.address}, 
        ${testData.user.city}, 
        ${testData.user.state}, 
        ${testData.user.pincode}, 
        ${testData.card.number}, 
        ${testData.card.expiry}, 
        ${testData.card.cvv}, 
        ${testData.card.name}, 
        ${testData.total}, 
        ${JSON.stringify(testData.cart)}, 
        NOW()
      ) 
      RETURNING id
    `;

    console.log('✅ Order inserted successfully with ID:', result[0].id);
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Order insert failed:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail
    });
    await sql.end();
    process.exit(1);
  }
}

testOrderInsert();
