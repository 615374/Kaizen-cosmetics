# Kaizen Cosmetics — Single-product e-commerce (React + Express)

## What is included
- `frontend/` — React (Vite) single-page app showcasing the product, cart and Checkout button.
- `backend/` — Express server with a `/api/create_preference` endpoint that creates a Mercado Pago preference (uses `mercadopago` SDK).
- `public/assets/` — product images (copied from the images you provided).

## Quick start (local)
1. **Backend**
   - cd backend
   - npm install
   - Create a `.env` file with your Mercado Pago access token:
     ```
     MERCADOPAGO_ACCESS_TOKEN=TEST-...    # use sandbox token for testing
     BACK_URL_SUCCESS=https://yourdomain.com/success
     ```
   - npm start / npm index.js
   - Server listens on port 3001 by default.

2. **Frontend**
   - cd frontend
   - npm install
   - npm run dev
   - The app will run on a Vite dev server (usually http://localhost:5173). The frontend expects the backend at `/api/create_preference` — run both in parallel, or configure a proxy.

## Mercado Pago (notes)
- For production you must use your real access token and follow Mercado Pago docs to set up webhooks and production credentials.
- For tests use Mercado Pago Sandbox credentials. Check Mercado Pago docs for how to create test cards and test flows.

## Branding / Fonts / Colors
- Brand colors are set in `frontend/src/index.css`. Adjust hex values to fine-tune.
- The header uses Roboto from Google Fonts. If you want to use Blaka for titles, add the `Blaka.ttf` to `frontend/public/fonts/` and update `index.html` to load it.

## How to prepare a zip for deployment
This repository is already packaged for you as a zip file in `/mnt/data/kaizen-ecommerce.zip` (download link provided in the chat). After downloading, run the steps above locally.

## Customization I can do next if you want (I can implement directly):
- Add responsive shipping cost estimator and checkout summary.
- Add order confirmation page and webhook handling for Mercado Pago notifications.
- Add admin panel to change price and stock.
- Implement image gallery and color variants.

