"use client";
import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useLocalStorage } from "usehooks-ts";
import { Product, WishlistItem } from "@/@types";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
}

const WishlistButton = ({ product }: Props) => {
  const [state, setState] = useLocalStorage<WishlistItem[]>("wishlist", []);
  const { toast } = useToast();

  const onWishlist = state.findIndex(
    (item) => item.slug === product.slug.current,
  );

  const addToWishlist = () => {
    if (onWishlist > -1) {
      setState((prev) =>
        prev.filter((item) => item.slug !== product.slug.current),
      );

      return toast({
        title: "Item removed from wishlist",
        duration: 1500,
      });
    }

    setState((prev) => [
      ...prev,
      { name: product.title, slug: product.slug.current },
    ]);

    return toast({
      title: "Item added to wishlist",
      duration: 1500,
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={addToWishlist}>
      <HeartIcon
        size={24}
        className={cn("stroke-red-400", {
          "fill-red-400": onWishlist > -1,
        })}
      />
    </Button>
  );
};

export default WishlistButton;
