require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mercadopago = require('mercadopago')
const { sendPurchaseEmail } = require('./utils/mailer');
const axios = require('axios'); 


// --- ENDPOINTS MERCADOPAGO ---

const app = express()
app.use(cors())
app.use(bodyParser.json())
const PORT = process.env.PORT || 3001

if(!process.env.MERCADOPAGO_ACCESS_TOKEN){
  console.warn('Warning: MERCADOPAGO_ACCESS_TOKEN not set.')
} else {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
  })
}



app.get('/success', (req, res) => {
  res.redirect('http://localhost:5173/success');
});

app.get('/failure', (req, res) => {
  res.redirect('http://localhost:5173/failure');
});

app.get('/pending', (req, res) => {
  res.redirect('http://localhost:5173/pending');
});



app.post('/api/create_preference', async (req, res) => {
  try{
    const { items } = req.body
    if(!items || !Array.isArray(items)) return res.status(400).json({error:'Invalid items'})

    const preference = {
      items: items.map(it => ({
      id: it.id,
      title: it.nombre || it.title,
      quantity: Number(it.cantidad || it.quantity),
      currency_id: 'ARS',
      unit_price: Number(it.precio || it.unit_price),
})),

      metadata: {
       items
      },

     back_urls: {
                 success: 'https://kris-fathomless-horrifyingly.ngrok-free.dev/success',
                 failure: 'https://kris-fathomless-horrifyingly.ngrok-free.dev/failure',
                 pending: 'https://kris-fathomless-horrifyingly.ngrok-free.dev/pending'
                },

                binary_mode: true,
                
              notification_url: 'https://kris-fathomless-horrifyingly.ngrok-free.dev/api/webhook'
 
    }

    const mpResp = await mercadopago.preferences.create(preference)
    return res.json(mpResp.body)
  }catch(err){
    console.error(err)
    return res.status(500).json({error: String(err)})
  }


})

const processedPayments = new Set();

app.post('/api/webhook', async (req, res) => {
  try {
    const notification = req.body;

    if (notification.type !== 'payment') {
      return res.sendStatus(200);
    }

    const paymentId = notification.data.id;

    const mpPayment = await mercadopago.payment.findById(paymentId);
    const paymentData = mpPayment.body;

    if (paymentData.status !== 'approved') {
      return res.sendStatus(200);
    }

    if (processedPayments.has(paymentData.id)) {
      console.log('🔁 Pago ya procesado:', paymentData.id);
      return res.sendStatus(200);
    }

    processedPayments.add(paymentData.id);

    const order = {
      id: paymentData.id,
      total: paymentData.transaction_amount,
      email: paymentData.payer.email,
      method: paymentData.payment_method_id,
      installments: paymentData.installments,
      items: paymentData.metadata?.items || []
    };

    console.log('✅ Orden aprobada:', order);

    // 📧 Enviar mail post-compra
    await sendPurchaseEmail({
      to: order.email,
      order
    });

    console.log('📩 Mail enviado a', order.email);

    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.sendStatus(500);
  }
});



app.get("/api/payment/:id", async (req, res) => {
  try {
    const paymentId = req.params.id;

    const mpPayment = await mercadopago.payment.findById(paymentId);
    const p = mpPayment.body;

    res.json({
      id: p.id,
      status: p.status,
      status_detail: p.status_detail,
      total: p.transaction_amount,
      method: p.payment_method_id,
      installments: p.installments,
      payer_email: p.payer.email,
      items: p.additional_info?.items || []
    });
  } catch (err) {
    console.error("Error obteniendo pago:", err);
    res.status(500).json({ error: "No se pudo obtener el pago" });
  }
});

app.listen(PORT, ()=>console.log('Server running on port', PORT))




// --- ENDPOINT SHIPNOW: COTIZACIÓN ---

// --- ENDPOINT SHIPNOW: COTIZACIÓN CORREGIDO ---
app.post('/api/shipping/quote', async (req, res) => {
  try {
    const { cpDestino } = req.body;
    const TOKEN = process.env.SHIPNOW_TOKEN; // Asegurate que en el .env diga SHIPNOW_TOKEN=A9l9aGPsmi...

    console.log("--- DEBUG SHIPNOW REQUEST ---");
    console.log("CP Destino:", cpDestino);
    
    // 1. URL Correcta: Para estimaciones se usa /shipping_options/estimate
    const response = await axios.post('https://api.shipnow.com.ar/shipping_options/estimate', {
      zip_code: String(cpDestino),
      items: [
        {
          weight: 0.5, // Peso en kg (ajustar según tus productos de Kaizen)
          quantity: 1
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log("--- DEBUG SHIPNOW RESPONSE ---");
    // Según tu doc, si devuelven un listado, viene dentro de "results"
    const dataRaw = response.data.results || response.data; 
    console.log("Datos a procesar:", JSON.stringify(dataRaw, null, 2));

    // 2. Mapeo adaptado a la respuesta real de Shipnow
    // Nota: Verificamos si es un array antes de mapear
    const opciones = Array.isArray(dataRaw) ? dataRaw.map(opt => ({
      correo: opt.courier_name || "Correo",
      servicio: opt.name || "Estándar",
      costo: opt.price || 0,
      id: opt.id
    })) : [];

    res.json(opciones);

  } catch (error) {
    // 3. Manejo de errores según el formato de la doc (vienen en un array "errors")
    const shipnowErrors = error.response?.data?.errors;
    console.error("ERROR SHIPNOW:", shipnowErrors || error.message);
    
    res.status(error.response?.status || 500).json({ 
      error: "No se pudo cotizar con Shipnow",
      details: shipnowErrors 
    });
  }
});
