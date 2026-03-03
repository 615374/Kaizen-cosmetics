import { useState, useRef, useEffect } from "react";
import Cart from "./Cart";

export default function CartDrawer({ setCartOpen, setPage, onShippingChange }) {
  const [closing, setClosing] = useState(false);
  const [cp, setCp] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [errorShipping, setErrorShipping] = useState(null);
  
  const startX = useRef(null);

  // Cerrar el drawer con animación
  const closeDrawer = (nextPage = null) => {
    setClosing(true);
    setTimeout(() => {
      setCartOpen(false);
      if (nextPage) setPage(nextPage);
    }, 350);
  };

  // Gestión de gestos para mobile (swipe para cerrar)
  const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => {
    if (!startX.current) return;
    const diffX = e.touches[0].clientX - startX.current;
    if (diffX > 80) {
      closeDrawer();
      startX.current = null;
    }
  };

  // Lógica de Selección de Envío
  const handleSelectOption = (opt) => {
    setSelectedShipping(opt);
    // Notificamos al componente padre el nuevo costo para el Total
    if (onShippingChange) {
      onShippingChange(opt.costo);
    }
  };

  const handleCalculateShipping = async () => {
    if (cp.length < 4) {
      setErrorShipping("CP inválido");
      return;
    }
    
    setLoadingShipping(true);
    setErrorShipping(null);
    setShippingOptions([]);
    setSelectedShipping(null);
    if (onShippingChange) onShippingChange(0); // Reset costo al recalcular

    try {
      const response = await fetch("http://localhost:3001/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpDestino: cp, pesoTotal: 0.5 }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      // Filtramos Andreani o mostramos todo si no hay Andreani disponible
      const andreaniOptions = data.filter(opt => 
        opt.correo.toLowerCase().includes("andreani")
      );

      setShippingOptions(andreaniOptions.length > 0 ? andreaniOptions : data);
      
      if (data.length === 0) setErrorShipping("Sin envíos para este CP");

    } catch (err) {
      console.error("Error en cotización:", err);
      setErrorShipping("No disponible en este momento");
    } finally {
      setLoadingShipping(false);
    }
  };

  return (
    <>
      <div className={`cart-overlay ${closing ? "closing" : ""}`} onClick={() => closeDrawer()} />

      <aside 
        className={`cart-drawer ${closing ? "closing" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <button className="cart-close" onClick={() => closeDrawer()}>✕</button>

        <div className="cart-content">
          {/* El componente Cart interno */}
          <Cart />

          {/* --- CALCULADOR DE ENVÍO --- */}
          <div className="shipping-section">
            <p className="shipping-title">Cálculo de Envío (Andreani)</p>
            
            <div className="shipping-input-wrapper">
              <input
                type="text"
                placeholder="Código Postal"
                value={cp}
                onChange={(e) => setCp(e.target.value)}
                maxLength={5}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculateShipping()}
              />
              <button onClick={handleCalculateShipping} disabled={loadingShipping}>
                {loadingShipping ? "..." : "Calcular"}
              </button>
            </div>

            {errorShipping && <p className="shipping-error">{errorShipping}</p>}

            <div className="shipping-results">
              {shippingOptions.map((opt, index) => (
                <div 
                  key={index} 
                  className={`shipping-item ${selectedShipping?.id === opt.id ? 'active' : ''}`}
                  onClick={() => handleSelectOption(opt)}
                >
                  <div className="shipping-info">
                    <span className="courier-name">{opt.correo}</span>
                    <span className="service-name">{opt.servicio}</span>
                  </div>
                  <strong className="shipping-price">${opt.costo}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cart-actions">
           <button 
             className="checkout-btn"
             disabled={shippingOptions.length > 0 && !selectedShipping}
             onClick={() => closeDrawer("checkout")}
           >
             {shippingOptions.length > 0 && !selectedShipping 
               ? "Seleccioná un envío" 
               : "Finalizar Compra"}
           </button>
        </div>
      </aside>
    </>
  );
}