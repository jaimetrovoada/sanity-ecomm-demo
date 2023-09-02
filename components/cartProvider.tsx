"use client";

import { CartContext, CartState, cartReducer } from "@/lib/cartReducer";
import { useEffect, useReducer } from "react";
import { useLocalStorage } from "usehooks-ts";

interface Props {
  children: React.ReactNode;
}

const CartProvider = ({ children }: Props) => {
  const [lsState, setLsState] = useLocalStorage("cart", {
    cartItems: [],
    totalPrice: 0,
  } as CartState);

  const [state, dispatch] = useReducer(cartReducer, lsState);
  useEffect(() => {
    setLsState(state);
  }, [state]);

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
