import { useState, useRef } from "react";
import Cart from "./Cart";

export default function CartDrawer({ setCartOpen, setPage }) {
  const [closing, setClosing] = useState(false);
  const startX = useRef(null);

  const closeDrawer = (nextPage = null) => {
    setClosing(true);

    setTimeout(() => {
      setCartOpen(false);
      if (nextPage) setPage(nextPage);
    }, 350);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!startX.current) return;

    const diffX = e.touches[0].clientX - startX.current;

    // swipe hacia la derecha
    if (diffX > 80) {
      closeDrawer();
      startX.current = null;
    }
  };

  return (
    <>
      <div
        className={`cart-overlay ${closing ? "closing" : ""}`}
        onClick={closeDrawer}
      />

      <aside
        className={`cart-drawer ${closing ? "closing" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <button className="cart-close" onClick={closeDrawer}>
          ✕
        </button>

        <Cart 
        setPage={setPage}
        setCartOpen={closeDrawer} 
        />
      </aside>
    </>
  );
}

