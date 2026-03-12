import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (producto, quantity) => {
    setCart(prev => {
      // Buscamos si ya existe el producto (o la variante específica)
      const existente = prev.find(p => p.id === producto.id);

      if (existente) {
        return prev.map(p =>
          p.id === producto.id
            ? {
                ...p,
                // Validamos que la suma no supere el stock disponible
                quantity: Math.min(
                  p.quantity + quantity,
                  p.stock
                ),
              }
            : p
        );
      }

      // Si es nuevo, lo agregamos 
      return [...prev, { ...producto, quantity }];
    });
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  // Total de items 
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total en $ 
  const cartTotal = cart.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );
  
  const updateQuantity = (id, quantity) => {
    setCart(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              // No permite bajar de 1 ni superar el stock
              quantity: Math.max(1, Math.min(quantity, p.stock)),
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