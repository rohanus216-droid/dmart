# Dmart Backend - Consolidated

## 📁 Project Structure

This is now the **single backend folder** for the Dmart project containing:

- `server.js` - Express server for local development
- `save-order.js` - Vercel function for production deployment
- `db.js` - Database connection configuration
- `schema.sql` - Database schema

## 🚀 Installation

```bash
cd backends
npm install
```

## 🗄️ Database Setup

1. Go to Supabase SQL Editor
2. Run `schema.sql`

## 🔧 Run Server (Local Development)

```bash
npm start
# or
npm run dev
```

Server will run on `http://localhost:3000`

## 🌐 Deployment

### For Vercel (Production):
- The `save-order.js` function is automatically deployed
- Frontend automatically switches between local and production URLs

### For Other Platforms:
- Deploy the Express server (`server.js`)

## 📡 API Endpoints

**POST** `/api/save-order` - Save new order
**GET** `/api/orders` - Get all orders  
**DELETE** `/api/orders/:id` - Delete order

## 🔄 Environment Detection

The frontend automatically detects if running on:
- **Localhost** → Uses `http://localhost:3000`
- **Production** → Uses `https://dmart-admin-rust.vercel.app`

## 🛠️ Environment Variables

Create `.env` file:
```
DATABASE_URL=postgresql://postgres:1234DRACULAW@1!!@db.kiaqlarshmbylzjiwzec.supabase.co:5432/postgres
PORT=3000
```

## 📋 Request/Response Examples

**POST** `/api/save-order`

Request body:
```json
{
  "user": {
    "name": "John Doe",
    "phone": "+919876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "card": {
    "number": "4111111111111111",
    "expiry": "12/25",
    "cvv": "123",
    "name": "John Doe"
  },
  "total": 399,
  "cart": [
    {
      "name": "Product Name",
      "price": 399,
      "quantity": 1
    }
  ]
}
```

Response:
```json
{
  "ok": true,
  "order_id": 123
}
```
