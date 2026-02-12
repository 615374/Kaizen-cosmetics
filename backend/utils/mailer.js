const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendPurchaseEmail({ to, order }) {
  return transporter.sendMail({
    from: `"Kaizen Cosmetics" <${process.env.EMAIL_USER}>`,
    to,
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
        ${order.items.map(
          i => `<li>${i.quantity} x ${i.title} ($${i.unit_price})</li>`
        ).join("")}
      </ul>

      <p>💜 Gracias por elegir Kaizen Cosmetics</p>
    `
  });
}

module.exports = { sendPurchaseEmail };
