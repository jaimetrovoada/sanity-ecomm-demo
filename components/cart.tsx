"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cartReducer";

const Cart = () => {
  const { state } = useCart();
  console.log({ state });
  return (
    <Popover>
      <PopoverTrigger className="py-2 px-4">
        <ShoppingCart className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent>
        <section className="max-h-28 h-full">
          <h2>Cart</h2>
          {state.cartItems.map((item) => (
            <div key={item.id} className="flex flex-row justify-between">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </div>
          ))}
        </section>
        <section className="flex flex-row justify-between">
          <Button size="sm">Checkout</Button>
          <span>${state.totalPrice}</span>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
