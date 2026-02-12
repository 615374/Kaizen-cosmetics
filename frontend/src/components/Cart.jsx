import { useCart } from "../context/CartContext";

export default function Cart({ setPage, setCartOpen }) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const totalEfectivo = Math.round(cartTotal * 0.9);

  const handleCheckout = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });

    const data = await res.json();

    if (data.init_point) {
      window.location.href = data.init_point;
    }
  } catch (err) {
    console.error(err);
    alert("Error iniciando el pago");
  }
};


  if (cart.length === 0) {
    return (
      <section className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <h4>Agregá productos y realizá tu compra.</h4>
        <button
          className="btn-primary"
          onClick={() => {
           setPage("productos");
           setCartOpen(false);
          }}

        >
          Ver productos
        </button>
      </section>
    );
  }

  return (
    <section className="cart-wrapper">
      <h2>Mi carrito</h2>

      <div className="cart-list">
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.imagen}
              alt={item.nombre}
              className="cart-item-img"
            />

            <div className="cart-item-info">
              <h4>{item.nombre}</h4>

              {item.variante && (
                <span className="cart-variant">
                  Variante: {item.variante}
                </span>
              )}

              <span className="cart-price">
                ${item.precio.toLocaleString()}
              </span>
            </div>

            <div className="cart-item-actions">
              <div className="cart-qty-control">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.cantidad - 1)
                  }
                >
                  −
                </button>

                <span>{item.cantidad}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.cantidad + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RESUMEN */}
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal (sin envío)</span>
          <strong>${cartTotal.toLocaleString()}</strong>
        </div>

        <div className="cart-summary-row2">
          <span>Total</span>
          <strong>${cartTotal.toLocaleString()}</strong>
        </div>

        <div className="cart-summary-row cart-cash">
          <span>Pagando en efectivo (solo retiro)</span>
          <strong>${totalEfectivo.toLocaleString()}</strong>
        </div>
      </div>

      {/* ACCIONES */}
      <div className="cart-actions">
        <button
          className="btn-secondary"
          onClick={() => {
          setPage("productos");
          setCartOpen(false);
        }}

        >
          Ver más productos
        </button>

        <button className="btn-primary" onClick={handleCheckout}>
         Realizar compra
        </button>

      </div>
    </section>
  );
}
