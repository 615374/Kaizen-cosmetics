import { useRef, useState } from "react";
import Cart from "./Cart";

export default function CartDrawer({ 
  setCartOpen, 
  setPage, 
  onShippingChange, 
  setCategoriaActiva, 
  setSubcategoriaActiva 
}) {
  const [closing, setClosing] = useState(false);
  const startX = useRef(null);

  const closeDrawer = (nextPage = null) => {
    setClosing(true);
    setTimeout(() => {
      setCartOpen(false);
      if (nextPage) setPage(nextPage);
    }, 350);
  };

  return (
    <>
      <div className={`cart-overlay ${closing ? "closing" : ""}`} onClick={() => closeDrawer()} />
      <aside className={`cart-drawer ${closing ? "closing" : ""}`}>
        <button className="cart-close" onClick={() => closeDrawer()}>✕</button>
        <div className="cart-content">
          <Cart 
            setPage={setPage} 
            setCartOpen={setCartOpen} 
            closeDrawer={closeDrawer}
            setCategoriaActiva={setCategoriaActiva}
            setSubcategoriaActiva={setSubcategoriaActiva}
            onShippingChange={onShippingChange}
          />
        </div>
      </aside>
    </>
  );
}