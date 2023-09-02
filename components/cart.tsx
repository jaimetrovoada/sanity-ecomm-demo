"use client";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cartReducer";
import Link from "next/link";
import { useIsClient } from "usehooks-ts";

const Cart = () => {
  const { state } = useCart();

  const isClient = useIsClient();

  const cartQuantity = state.cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="">
        <ShoppingCart size={14} />
        <span className="text-sm">Cart ({isClient ? cartQuantity : 0})</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="flex w-screen flex-col p-4 md:w-[33vw]">
        <h2 className="text-lg font-semibold">Cart</h2>
        <section className="flex-1 p-2 text-gray-700">
          {state.cartItems.map((item) => (
            <div key={item.id} className="flex flex-row justify-between">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </div>
          ))}
        </section>
        <section className="flex flex-row items-center justify-between">
          <Button size="sm" asChild>
            <Link href="/store/checkout">Checkout</Link>
          </Button>
          <span className="font-semibold">${state.totalPrice}</span>
        </section>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Cart;
