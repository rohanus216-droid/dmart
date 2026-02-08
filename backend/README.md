# Backend Setup

## Installation

```bash
cd backend
npm install
```

## Database Setup

1. Go to Supabase SQL Editor
2. Run `schema.sql`

## Run Server

```bash
npm start
```

Server will run on `http://localhost:3000`

## Environment Variables

Create `.env` file:
```
DATABASE_URL=postgresql://postgres:1234DRACULAW@1!!@db.kiaqlarshmbylzjiwzec.supabase.co:5432/postgres
PORT=3000
```

## API Endpoint

**POST** `/api/save-order`

Request body:
```json
{
  "user": {
    "name": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "pincode": "string"
  },
  "card": {
    "number": "string",
    "expiry": "string",
    "cvv": "string",
    "name": "string"
  },
  "total": number,
  "cart": []
}
```
