"use client";
import { Product } from "@/@types";
import { Button } from "@/components/ui/button";
import { CartActions, useCart } from "@/lib/cartReducer";
import { ShoppingCartIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Props {
  product: Product;
}

const CartButton = ({ product }: Props) => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();

  const addToCart = () => {
    const prod = state.cartItems.find((item) => item.id === product._id);

    if (prod) {
      const quantity = prod.quantity + 1;
      dispatch({
        type: CartActions.CHANGE_QUANTITY,
        payload: {
          id: product._id,
          quantity,
          name: product.title,
          price: product.price,
        },
      });

      return toast({
        title: "Item added to cart",
        duration: 1500,
      });
    }

    dispatch({
      type: CartActions.ADD_ITEM,
      payload: {
        id: product._id,
        quantity: 1,
        name: product.title,
        price: product.price,
      },
    });

    return toast({
      title: "Item added to cart",
      duration: 1500,
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={addToCart}>
      <ShoppingCartIcon className="h-6 w-6" />
    </Button>
  );
};

export default CartButton;
