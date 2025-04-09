import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import useCartData from "../hooks/useCartData";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { cart, loading, error, getCart, addToCart, deleteFromCart } =
    useCartData();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const products = Array.isArray(cart) ? cart : cart?.products || [];
    const totalQuantity = products.reduce((sum, product) => {
      return sum + (Number(product.quantity) || 0);
    }, 0);
    setCartItemCount(totalQuantity);
  }, [cart]);

  const contextValue = useMemo(
    () => ({
      cart,
      cartItemCount,
      loading,
      error,
      getCart,
      addToCart,
      deleteFromCart,
    }),
    [cart, cartItemCount, loading, error, getCart, addToCart, deleteFromCart]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
