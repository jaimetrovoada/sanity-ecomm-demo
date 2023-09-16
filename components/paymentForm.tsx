"use client";

import { paymentSchema } from "@/app/api/checkout_sessions/route";
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().email(),
  address: z.string().min(2, { message: "Address is too short" }),
  city: z.string().min(2, { message: "City is too short" }),
  zipcode: z.string().min(2, { message: "Zip code is too short" }),
});

interface Props {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

const PaymentForm = ({ state, dispatch }: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isClient = useIsClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const stripe = await getStripe();
      const body = paymentSchema.parse({
        customer: {
          name: values.name,
          email: values.email,
          address: values.address,
          city: values.city,
          zipcode: values.zipcode,
        },
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
    console.log("submit", { values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="94111" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Main St, San Francisco, CA"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-auto flex flex-row justify-between font-semibold">
          <span>Total:</span>
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
        <Button type="submit" disabled={isLoading || !form.formState.isValid}>
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" /> Processing...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
