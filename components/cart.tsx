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
        <h2 className="font-semibold text-lg">Cart</h2>
        <section className="flex-1 p-2 text-gray-700">
          {state.cartItems.map((item) => (
            <div key={item.id} className="flex flex-row justify-between">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </div>
          ))}
        </section>
        <section className="flex flex-row justify-between items-center">
          <Button size="sm">Checkout</Button>
          <span className="font-semibold">${state.totalPrice}</span>
        </section>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Cart;
