"use client";
import { Product } from "@/@types";
import { Button } from "@/components/ui/button";
import { CartActions, useCart } from "@/lib/cartReducer";
import { ShoppingCartIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Props {
  product: Product;
  size: string | null;
}

const CartButton = ({ product, size }: Props) => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();

  const addToCart = () => {
    const prod = state.cartItems.find((item) => item.id === product._id);
    if (!size) return;

    if (prod) {
      const quantity = prod.quantity + 1;
      dispatch({
        type: CartActions.INCREMENT_QUANTITY,
        payload: {
          id: product._id,
          quantity,
          name: product.title,
          price: product.price,
          image: product.images[0].asset.url,
          size: size,
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
        image: product.images[0].asset.url,
        size: size,
      },
    });

    return toast({
      title: "Item added to cart",
      duration: 1500,
    });
  };

  return (
    <Button
      variant="outline"
      className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-400/80"
      aria-label="Add to cart"
      onClick={addToCart}
      disabled={!size}
    >
      <ShoppingCartIcon size={16} />
      Add to cart
    </Button>
  );
};

export default CartButton;
