import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (producto, cantidad) => {
    setCart(prev => {
      const existente = prev.find(p => p.id === producto.id);

      if (existente) {
        return prev.map(p =>
          p.id === producto.id
            ? {
                ...p,
                cantidad: Math.min(
                  p.cantidad + cantidad,
                  p.stock
                ),
              }
            : p
        );
      }

      return [...prev, { ...producto, cantidad }];
    });
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  
  const updateQuantity = (id, cantidad) => {
  setCart(prev =>
    prev.map(p =>
      p.id === id
        ? {
            ...p,
            cantidad: Math.max(1, Math.min(cantidad, p.stock)),
          }
        : p
    )
  );
};


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
