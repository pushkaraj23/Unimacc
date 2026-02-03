import { createContext, useContext, useState, useCallback } from "react";

const CartDrawerContext = createContext(null);

export function CartDrawerProvider({ children }) {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const openCartDrawer = useCallback(() => {
    setIsCartDrawerOpen(true);
  }, []);

  const closeCartDrawer = useCallback(() => {
    setIsCartDrawerOpen(false);
  }, []);

  const toggleCartDrawer = useCallback(() => {
    setIsCartDrawerOpen((prev) => !prev);
  }, []);

  return (
    <CartDrawerContext.Provider
      value={{
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer,
      }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) {
    throw new Error("useCartDrawer must be used within CartDrawerProvider");
  }
  return ctx;
}
