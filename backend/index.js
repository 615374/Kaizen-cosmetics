require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mercadopago = require('mercadopago')

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

app.post('/api/create_preference', async (req, res) => {
  try{
    const { items } = req.body
    if(!items || !Array.isArray(items)) return res.status(400).json({error:'Invalid items'})

    const preference = {
      items: items.map(it=>({ 
        id: it.id, 
        title: it.title, 
        quantity: Number(it.quantity), 
        currency_id: 'ARS', 
        unit_price: Number(it.unit_price)
      })),
     back_urls: {
                 success: 'http://localhost:5173/success',
                 failure: 'http://localhost:5173/failure',
                 pending: 'http://localhost:5173/pending'
                }
     // auto_return: 'approved'
    }

    const mpResp = await mercadopago.preferences.create(preference)
    return res.json(mpResp.body)
  }catch(err){
    console.error(err)
    return res.status(500).json({error: String(err)})
  }
})

app.listen(PORT, ()=>console.log('Server running on port', PORT))