-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  card_number VARCHAR(20) NOT NULL,
  expiry VARCHAR(10) NOT NULL,
  cvv VARCHAR(5) NOT NULL,
  cardholder_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  cart_items JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
