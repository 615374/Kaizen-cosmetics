require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mercadopago = require('mercadopago')
const { sendPurchaseEmail } = require('./utils/mailer');
const axios = require('axios'); 

const app = express()
app.use(cors())
app.use(bodyParser.json())
const PORT = process.env.PORT || 3001

// URL BASE (Cambiar en el .env cuando subas a producción, ej: https://kaizencosmetics.com)
const BASE_URL = process.env.BASE_URL || 'https://kris-fathomless-horrifyingly.ngrok-free.dev';

if(!process.env.MERCADOPAGO_ACCESS_TOKEN){
  console.warn('❌ Warning: MERCADOPAGO_ACCESS_TOKEN not set.')
} else {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
  })
}

// --- REDIRECCIONES POST-PAGO ---
app.get('/success', (req, res) => res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/success`));
app.get('/failure', (req, res) => res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/failure`));
app.get('/pending', (req, res) => res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/pending`));

// --- MERCADOPAGO: CREAR PREFERENCIA ---
app.post('/api/create_preference', async (req, res) => {
  try {
    const { items } = req.body
    if(!items || !Array.isArray(items)) return res.status(400).json({error:'Invalid items'})

    const preference = {
      items: items.map(it => ({
        id: String(it.id),
        title: it.nombre || it.title,
        quantity: Number(it.cantidad || it.quantity),
        currency_id: 'ARS',
        unit_price: Number(it.precio || it.unit_price),
      })),
     
      metadata: { items },
      back_urls: {
        success: `${BASE_URL}/success`,
        failure: `${BASE_URL}/failure`,
        pending: `${BASE_URL}/pending`
      },
      auto_return: "approved",
      binary_mode: true, // No permite pagos "pendientes" (o aprueba o rechaza)
      notification_url: `${BASE_URL}/api/webhook`
    }

    const mpResp = await mercadopago.preferences.create(preference)
    
    return res.json({ 
      id: mpResp.body.id, 
      init_point: mpResp.body.init_point 
    })
  } catch(err) {
    console.error("❌ Error Create Preference:", err)
    return res.status(500).json({error: "Error al generar el pago"})
  }
})

// --- WEBHOOK: NOTIFICACIONES DE PAGO ---
const processedPayments = new Set();

app.post('/api/webhook', async (req, res) => {
  try {
    const { query } = req;
    const topic = query.topic || query.type;

    if (topic !== 'payment') return res.sendStatus(200);

    const paymentId = query.id || req.body.data?.id;
    if (!paymentId) return res.sendStatus(200);

    const mpPayment = await mercadopago.payment.findById(paymentId);
    const paymentData = mpPayment.body;

    if (paymentData.status === 'approved') {
      if (processedPayments.has(paymentData.id)) {
        return res.sendStatus(200);
      }
      processedPayments.add(paymentData.id);

      const order = {
        id: paymentData.id,
        total: paymentData.transaction_amount,
        email: paymentData.payer.email,
        method: paymentData.payment_method_id,
        items: paymentData.metadata?.items || []
      };

      console.log('✅ Pago Real Aprobado:', order.id);

      // Enviar mail a la clienta y al comprador
      await sendPurchaseEmail({ to: order.email, order });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.sendStatus(500);
  }
});

// --- SHIPNOW: COTIZACIÓN ---
app.post('/api/shipping/quote', async (req, res) => {
  try {
    const { cpDestino } = req.body;
    const TOKEN = process.env.SHIPNOW_TOKEN;

    const response = await axios.post('https://api.shipnow.com.ar/shipping_options/estimate', {
      zip_code: String(cpDestino),
      items: [{ weight: 0.5, quantity: 1 }]
    }, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const dataRaw = response.data.results || response.data; 
    const opciones = Array.isArray(dataRaw) ? dataRaw.map(opt => ({
      correo: opt.courier_name || "Correo",
      servicio: opt.name || "Estándar",
      costo: opt.price || 0,
      id: opt.id
    })) : [];

    res.json(opciones);
  } catch (error) {
    console.error("ERROR SHIPNOW:", error.response?.data || error.message);
    res.status(500).json({ error: "No se pudo cotizar el envío" });
  }
});

app.listen(PORT, () => console.log(`🚀 Kaizen Server running on port ${PORT}`))