require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mercadopago = require('mercadopago')
const { sendPurchaseEmail, sendWholesaleRequest } = require('./utils/mailer');
const axios = require('axios'); 

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 3001
const BASE_URL = process.env.BASE_URL || 'https://kris-fathomless-horrifyingly.ngrok-free.dev';

// Configuración Mercado Pago
// Configuración Mercado Pago
if(!process.env.MERCADOPAGO_ACCESS_TOKEN){
  console.warn('❌ Warning: MERCADOPAGO_ACCESS_TOKEN no seteado en .env')
} else {
  // Verificamos si es un token de producción
  const isProduction = process.env.MERCADOPAGO_ACCESS_TOKEN.startsWith('APP_USR-');
  console.log(`💳 Mercado Pago configurado en modo: ${isProduction ? 'PRODUCCIÓN ✅' : 'SANDBOX 🧪'}`);
  
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
  });
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
      external_reference: "KAIZEN_WEB_ORDER",
      metadata: { items },
      back_urls: {
        success: `${BASE_URL}/success`,
        failure: `${BASE_URL}/failure`,
        pending: `${BASE_URL}/pending`
      },
      auto_return: "approved",
      binary_mode: false,
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
      if (processedPayments.has(paymentData.id)) return res.sendStatus(200);
      processedPayments.add(paymentData.id);

      const order = {
        id: paymentData.id,
        total: paymentData.transaction_amount,
        email: paymentData.payer.email,
        method: paymentData.payment_method_id,
        items: paymentData.metadata?.items || []
      };
      console.log('✅ Pago Real Aprobado:', order.id);
      await sendPurchaseEmail({ to: order.email, order });
    }
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.sendStatus(500);
  }
});

// --- ANDREANI: COTIZACIÓN REAL ---


let andreaniToken = null;
let tokenExpiration = null;

async function getAndreaniToken() {
  const now = new Date();
  if (andreaniToken && tokenExpiration > now) {
    return andreaniToken;
  }

  try {
    const auth = Buffer.from(`${process.env.ANDREANI_USUARIO}:${process.env.ANDREANI_PASSWORD}`).toString('base64');
    
    // Probamos con la URL de envios, si falla mañana recordá probar sacando el ".envios"
    const response = await axios.post('https://apis.envios.andreani.com/login', {}, {
      headers: { 'Authorization': `Basic ${auth}` }
    });

    // Andreani suele devolver el token en el header 'x-authorization-token'
    andreaniToken = response.headers['x-authorization-token'] || response.data.token;
    tokenExpiration = new Date(now.getTime() + 23 * 60 * 60 * 1000); 
    
    console.log("✅ Token de Andreani renovado con éxito");
    return andreaniToken;
  } catch (error) {
    console.error("❌ Error al autenticar con Andreani:", error.message);
    throw error;
  }
}

app.post('/api/shipping/quote', async (req, res) => {
  try {
    const { cpDestino } = req.body;
    if (!cpDestino) return res.status(400).json({ error: "Falta el CP" });

    const token = await getAndreaniToken();
    
    const payload = {
      cpDestino: String(cpDestino),
      contrato: process.env.ANDREANI_CONTRATO, 
      cliente: process.env.ANDREANI_USUARIO,   
      bultos: [{
        peso: 0.5, 
        volumen: 200 
      }]
    };

    const response = await axios.post('https://apis.envios.andreani.com/v1/tarifas', payload, {
      headers: { 'x-authorization-token': token }
    });
    const dataRaw = response.data;
    let opciones = [];

    if (Array.isArray(dataRaw)) {
      // Si Andreani devuelve una lista de servicios
      opciones = dataRaw.map(opt => ({
        correo: "Andreani",
        servicio: opt.nombre || "Envío",
        costo: opt.tarifaConIva || opt.total || 0,
        id: opt.id || `and-${Math.random()}`
      }));
    } else if (dataRaw && typeof dataRaw === 'object') {
      // Si devuelve un solo objeto
      opciones = [{
        correo: "Andreani",
        servicio: dataRaw.nombre || "Envío Estándar",
        costo: dataRaw.tarifaConIva || dataRaw.total || 0,
        id: "andreani-std"
      }];
    }

    console.log(`📦 Se encontraron ${opciones.length} opciones de envío.`);
    res.json(opciones);

  } catch (error) {
    console.error("❌ Error Cotización Andreani:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "No se pudo obtener la tarifa",
      details: error.response?.data?.errors || [] 
    });
  }
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`🚀 Servidor Kaizen corriendo en puerto ${PORT}`);
    console.log(`🔗 URL Base: ${BASE_URL}`);
    console.log('-------------------------------------------');
});


//--- CUENTA MAYORISTA ---

app.post('/api/mayorista/solicitud', async (req, res) => {
  try {
    const data = req.body; // Viene: nombre, apellido, email, telefono, mensaje
    
    await sendWholesaleRequest({ data });
    
    console.log(`📩 Solicitud mayorista de ${data.email} enviada a Kaizen.`);
    res.json({ success: true, message: "Solicitud enviada correctamente" });
  } catch (error) {
    console.error("❌ Error en formulario mayorista:", error);
    res.status(500).json({ error: "No se pudo procesar la solicitud" });
  }
});