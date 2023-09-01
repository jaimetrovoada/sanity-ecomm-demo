"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CartActions, CartProduct, useCart } from "@/lib/cartReducer";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { placeOrder } from "@/lib/queries";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().email(),
});

const Page = () => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("submit", { values });
    const res = await placeOrder(state.cartItems, state.totalPrice, values);
    if (res instanceof Error) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    return toast({
      title: "Success!",
      description: "Your order has been placed!",
    });
  };

  const increaseItemAmount = (item: CartProduct) => {
    dispatch({
      type: CartActions.CHANGE_QUANTITY,
      payload: {
        ...item,
        quantity: item.quantity + 1,
      },
    });
  };

  const decreaseItemAmount = (item: CartProduct) => {
    const quantity = item.quantity - 1;
    dispatch({
      type: CartActions.CHANGE_QUANTITY,
      payload: {
        ...item,
        quantity: quantity,
      },
    });
  };

  const removeItem = (item: CartProduct) => {
    dispatch({
      type: CartActions.REMOVE_ITEM,
      payload: item,
    });
    return toast({
      title: "Item removed from cart",
      description: `${item.name} has been removed from your cart.`,
      duration: 1500,
    });
  };

  return (
    <main className="h-full flex flex-col md:flex-row px-4">
      <aside className="md:flex-1 p-4">
        <h2 className="font-semibold text-2xl mb-2">Your Items</h2>
        <div>
          {state.cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-row justify-between items-center py-2 border-b border-gray-200 group"
            >
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span className="text-gray-700 text-sm">
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <div className="border border-gray-200 flex flex-row items-center rounded-lg [&>*]:flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => decreaseItemAmount(item)}
                  >
                    <MinusIcon size={16} />
                  </Button>
                  <span className="text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => increaseItemAmount(item)}
                  >
                    <PlusIcon size={16} />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="group-hover:text-red-400"
                  onClick={() => removeItem(item)}
                >
                  <TrashIcon size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <section className="md:flex-1 p-4 bg-white rounded-md shadow-md flex flex-col">
        <h2 className="font-semibold text-2xl mb-2">Order Details</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 flex-1"
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
            <div className="flex flex-row justify-between font-semibold mt-auto">
              <span>Total:</span>
              <span>
                {state.totalPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <Button type="submit">Place Order</Button>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default Page;