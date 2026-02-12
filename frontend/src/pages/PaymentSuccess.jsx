import { useEffect, useState } from "react";
import "./paymentSuccess.css";

export default function PaymentSuccess({ setPage, clearCart }) {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const paymentId = params.get("payment_id");
  

    if (paymentId) {
      fetch(`/api/payment/${paymentId}`)
        .then(res => res.json())
        .then(data => {
          setPayment(data);
          clearCart();
        })
        .catch(err => {
          console.error("Error obteniendo pago", err);
        })
        .finally(() => setLoading(false));
    } else {
      // fallback de seguridad
      setLoading(false);
    }
  }, []);
 
  if (loading) {
    return <div className="payment-loading">Procesando tu compra...</div>;
  }

  if (!payment) {
    return <div className="payment-error">No pudimos cargar tu compra</div>;
  }

  return (
    <section className="payment-success">
      <div className="payment-card">
        <div className="check-icon">✓</div>
        <h1>¡Gracias por tu compra!</h1>
        <p className="payment-sub">
          Tu pago se acreditó correctamente en Kaizen Cosmetics 💜
        </p>

        <div className="payment-info">
         <div className="info-row">
    <span>Operación</span>
    <span>#{payment.id}</span>
  </div>

  <div className="info-row">
    <span>Email</span>
    <span>{payment.payer_email}</span>
  </div>

  <div className="info-row">
    <span>Método</span>
    <span>{payment.method.toUpperCase()}</span>
  </div>

  <div className="info-row">
    <span>Cuotas</span>
    <span>{payment.installments}</span>
  </div>
          <p className="payment-total">
            Total pagado: ${payment.total.toLocaleString()}
          </p>
        </div>

        {payment.items.length > 0 && (
          <div className="payment-items">
            <h3>Productos</h3>
            {payment.items.map((item, i) => (
              <div key={i} className="payment-item">
                <span>{item.title}</span>
                <span>
                  {item.quantity} × ${item.unit_price}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          className="btn-primary"
          onClick={() => setPage("productos")}
        >
          Volver a la tienda
        </button>
      </div>
    </section>
  );
}

