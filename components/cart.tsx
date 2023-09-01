"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cartReducer";
import { Badge } from "./ui/badge";

const Cart = () => {
  const { state } = useCart();

  const cartItemsLength = state.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <Popover>
      <PopoverTrigger className="py-2 px-4 relative">
        <Badge className="absolute top-0 right-0 px-1.5">
          {cartItemsLength}
        </Badge>
        <ShoppingCart className="w-8 h-8" />
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
