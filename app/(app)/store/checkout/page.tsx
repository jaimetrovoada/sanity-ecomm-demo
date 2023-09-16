"use client";
import Main from "@/components/main";
import PaymentForm from "@/components/paymentForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CartActions, CartProduct, useCart } from "@/lib/cartReducer";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useIsClient } from "usehooks-ts";

const Page = () => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();
  const isClient = useIsClient();

  const increaseItemAmount = (item: CartProduct) => {
    dispatch({
      type: CartActions.INCREMENT_QUANTITY,
      payload: {
        ...item,
        quantity: item.quantity + 1,
      },
    });
  };

  const decreaseItemAmount = (item: CartProduct) => {
    if (item.quantity === 1) {
      return;
    }
    const quantity = item.quantity - 1;
    dispatch({
      type: CartActions.DECREMENT_QUANTITY,
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
    <Main className="flex h-full flex-col md:flex-row">
      <aside className="p-4 md:flex-1">
        <h2 className="mb-2 text-2xl font-semibold">Your Items</h2>
        <div>
          {isClient
            ? state.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-row items-center justify-between border-b border-gray-200 py-2"
                >
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-sm text-gray-700">
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-row items-center rounded-lg border border-gray-200 [&>*]:flex-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => decreaseItemAmount(item)}
                        disabled={item.quantity === 1}
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
              ))
            : null}
        </div>
      </aside>
      <section className="flex flex-col rounded-md bg-white p-4 shadow-md md:flex-1">
        <h2 className="mb-2 text-2xl font-semibold">Order Details</h2>
        <PaymentForm state={state} dispatch={dispatch} />
      </section>
    </Main>
  );
};

export default Page;
