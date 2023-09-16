"use client";

import { paymentSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CartAction, CartState } from "@/lib/cartReducer";
import getStripe from "@/lib/get-stripe";
import { placeOrder } from "@/lib/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Stripe from "stripe";
import { useIsClient } from "usehooks-ts";

interface Props {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

const PaymentForm = ({ state, dispatch }: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isClient = useIsClient();

  const onCheckout = async () => {
    setIsLoading(true);
    try {
      const stripe = await getStripe();
      const body = paymentSchema.parse({
        items: state.cartItems,
      });
      console.log({ body });
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as Stripe.Checkout.Session;
      const sessionId = data.id!;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log({ error });
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-auto flex flex-row justify-between border-b border-gray-200 p-2 font-semibold">
        <span className="text-gray-500">Total:</span>
        <span>
          {isClient
            ? state.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : Number(0).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
        </span>
      </div>
      <div className="mt-auto flex flex-row justify-between border-b border-gray-200 p-2 font-semibold">
        <span className="text-gray-500">Shipping:</span>
        <span>Free</span>
      </div>
      <Button onClick={onCheckout} disabled={isLoading} className="mt-4">
        {isLoading ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" /> Processing...
          </>
        ) : (
          "Proceed"
        )}
      </Button>
    </div>
  );
};

export default PaymentForm;
