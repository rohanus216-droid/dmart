#!/bin/bash

echo "Deploying to Vercel..."

# Install Vercel CLI if not already installed
npm install -g vercel

# Deploy to Vercel
vercel --prod

echo "Deployment complete!"
