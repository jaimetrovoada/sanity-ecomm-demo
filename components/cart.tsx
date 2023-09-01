"use client";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cartReducer";

const Cart = () => {
  const { state } = useCart();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="">
        <ShoppingCart size={14} />
        <span className="text-sm">Cart ({state.cartItems.length})</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="p-4 w-screen md:w-[33vw] flex flex-col">
        <section className="flex-1">
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
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Cart;
