"use client";

import { CartContext, cartReducer } from "@/lib/cartReducer";
import { useReducer } from "react";

interface Props {
  children: React.ReactNode;
}

const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    totalPrice: 0,
  });

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
