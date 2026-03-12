import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Cart({ setPage, setCartOpen, closeDrawer, setCategoriaActiva, setSubcategoriaActiva, onShippingChange }) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  // Estados para envío
  const [cp, setCp] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [errorShipping, setErrorShipping] = useState(null);

  const totalFinal = cartTotal + (selectedShipping?.costo || 0);
  const totalEfectivo = Math.round(totalFinal * 0.9);

  // --- LÓGICA DE MERCADO PAGO (RESTAURADA) ---
  const handleCheckout = async () => {
    try {
      // Usamos la URL que tenías antes
      const res = await fetch("http://localhost:3001/api/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: cart,
          shipping: selectedShipping // Enviamos el envío seleccionado por si tu API lo usa
        }),
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

  // --- LÓGICA DE ENVÍO ---
  const handleCalculateShipping = async () => {
    if (cp.length < 4) return setErrorShipping("CP inválido");
    setLoadingShipping(true);
    setErrorShipping(null);
    try {
      const response = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpDestino: cp, pesoTotal: 0.5 }),
      });
      const data = await response.json();
      const andreani = data.filter(opt => opt.correo.toLowerCase().includes("andreani"));
      setShippingOptions(andreani.length > 0 ? andreani : data);
    } catch (err) { setErrorShipping("No disponible"); }
    finally { setLoadingShipping(false); }
  };

  const handleSelectOption = (opt) => {
    setSelectedShipping(opt);
    if (onShippingChange) onShippingChange(opt.costo);
  };

  const navegarYcerrar = () => {
    if (setCategoriaActiva) setCategoriaActiva("herramientas");
    if (setSubcategoriaActiva) setSubcategoriaActiva(null);
    if (closeDrawer) {
      closeDrawer("productos");
    } else {
      setPage("productos");
      setCartOpen(false);
    }
  };

  if (cart.length === 0) return (
    <section className="cart-empty">
      <h2>Tu carrito está vacío</h2>
      <h4>Agregá productos y realizá tu compra.</h4>
      <button className="btn-primary" onClick={navegarYcerrar}>Ver productos</button>
    </section>
  );

  return (
    <section className="cart-wrapper">
      <h2>Mi carrito</h2>

      {/* 1. LISTA DE PRODUCTOS */}
      <div className="cart-list">
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
            <div className="cart-item-info">
              <h4>{item.nombre}</h4>
              {item.variante && <span className="cart-variant">Variante: {item.variante}</span>}
              <span className="cart-price">${item.precio.toLocaleString()}</span>
            </div>
            <div className="cart-item-actions">
              <div className="cart-qty-control">
                <button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>−</button>
                <span>{item.cantidad}</span>
                <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
              </div>
              <button className="cart-remove" onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        {/* 2. SUBTOTAL */}
        <div className="cart-summary-row">
          <span>Subtotal (sin envío)</span>
          <strong>${cartTotal.toLocaleString()}</strong>
        </div>

        {/* 3. ENVÍO (LÍNEAS DE PUNTA A PUNTA) */}
        <div className="shipping-box-inside">
          <p className="shipping-label">Cálculo de Envío</p>
          <div className="shipping-input-group">
            <input type="text" placeholder="Tu CP" value={cp} onChange={(e) => setCp(e.target.value)} />
            <button onClick={handleCalculateShipping}>{loadingShipping ? "..." : "Calcular"}</button>
          </div>
          {errorShipping && <p style={{color: 'red', fontSize: '0.8rem', marginTop: '5px'}}>{errorShipping}</p>}
          <div className="shipping-results-mini">
            {shippingOptions.map((opt, index) => (
              <div key={index} className={`shipping-opt ${selectedShipping?.id === opt.id ? 'active' : ''}`} onClick={() => handleSelectOption(opt)}>
                <span>{opt.correo}</span>
                <strong>${opt.costo}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TOTAL FINAL */}
        <div className="cart-summary-row2">
          <span>Total</span>
          <strong>${totalFinal.toLocaleString()}</strong>
        </div>

        {/* 5. EFECTIVO (TEXTO Y MONTO SEPARADOS PARA MOBILE) */}
        <div className="cart-summary-row cart-cash">
          <span>Pagando en efectivo (solo retiro)</span>
          <strong>${totalEfectivo.toLocaleString()}</strong>
        </div>
      </div>

      {/* 6. BOTONES DE ACCIÓN */}
      <div className="cart-actions-inner">
        <button className="btn-primary" onClick={handleCheckout}>
          REALIZAR COMPRA
        </button>
        <button className="btn-secondary" onClick={navegarYcerrar}>
          SUMAR OTRAS HERRAMIENTAS
        </button>
      </div>
    </section>
  );
}