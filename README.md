# Vercel Deployment Fix

## Problem
Telegram bot localhost pe kaam kar raha tha lekin Vercel pe nahi, kyunki:
1. Bot token client-side exposed tha (security risk)
2. Browser CORS policy direct Telegram API calls block kar rahi thi
3. PHP file Vercel pe run nahi hota

## Solution
Backend serverless function banaya hai jo securely Telegram messages bhejta hai.

## Deployment Steps

### 1. Vercel pe Environment Variable set karo

Vercel Dashboard mein jao:
- Project Settings → Environment Variables
- Add karo:
  - **Name:** `TELEGRAM_BOT_TOKEN`
  - **Value:** `8485388962:AAGTktrO69ZS0qdX1vX2DTNX9rhe1a-nwwQ`
  - **Environment:** Production, Preview, Development (sab select karo)

### 2. Deploy karo

```bash
# Vercel CLI se (agar installed hai)
vercel --prod

# Ya Git push karo (agar GitHub connected hai)
git add .
git commit -m "Fixed Telegram bot for Vercel"
git push
```

### 3. Test karo

Deployed site pe jao aur checkout complete karo. Telegram pe message aana chahiye.

## Files Changed

1. **api/send-order.js** - New serverless function (backend)
2. **checkout.html** - Updated to use serverless function instead of direct API calls
3. **.env.example** - Environment variable template

## Security Benefits

✅ Bot token ab client-side visible nahi hai
✅ CORS issues resolved
✅ Backend se secure API calls
