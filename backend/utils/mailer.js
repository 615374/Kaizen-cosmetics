const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para compras
async function sendPurchaseEmail({ to, order }) {
  return transporter.sendMail({
    from: `"Kaizen Cosmetics" <${process.env.EMAIL_USER}>`,
    to: "kaizencosmetics33@gmail.com",
    subject: "💜 Gracias por tu compra en Kaizen Cosmetics",
    html: `
      <h2>¡Gracias por tu compra!</h2>
      <p>Tu pago fue aprobado correctamente.</p>
      <hr />
      <p><strong>Orden:</strong> ${order.id}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <p><strong>Método:</strong> ${order.method}</p>
      <h3>Productos</h3>
      <ul>
        ${order.items.map(i => `<li>${i.quantity} x ${i.title} ($${i.unit_price})</li>`).join("")}
      </ul>
      <p>💜 Gracias por elegir Kaizen Cosmetics</p>
    `
  });
}

// Función para el formulario de mayoristas
async function sendWholesaleRequest({ data }) {
  return transporter.sendMail({
    from: `"Web Kaizen" <${process.env.EMAIL_USER}>`,
    to: "kaizencosmetics33@gmail.com",
    subject: `🚀 Nueva Solicitud Mayorista: ${data.nombre} ${data.apellido}`,
    html: `
      <h2>Nueva solicitud de cuenta mayorista</h2>
      <p>Se ha recibido una nueva solicitud desde la web:</p>
      <hr />
      <p><strong>Nombre completo:</strong> ${data.nombre} ${data.apellido}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <p><strong>Mensaje del cliente:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
        ${data.mensaje || "Sin mensaje adicional."}
      </blockquote>
      <hr />
      <p><em>Este es un mensaje automático generado por el formulario de contacto.</em></p>
    `
  });
}

module.exports = { sendPurchaseEmail, sendWholesaleRequest };