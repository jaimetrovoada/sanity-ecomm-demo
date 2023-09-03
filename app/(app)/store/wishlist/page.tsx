"use client";

import { WishlistItem } from "@/@types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

const Page = () => {
  const [state, setState] = useLocalStorage<WishlistItem[]>("wishlist", []);
  const { toast } = useToast();

  const removeFromWishlist = (slug: string) => {
    setState((prev) => prev.filter((item) => item.slug !== slug));
    return toast({
      title: "Item removed from wishlist",
      duration: 1500,
    });
  };

  return (
    <main className="p-2 md:p-4">
      <section className="mx-auto w-full max-w-4xl bg-white p-4">
        <h2 className="text-2xl font-semibold">Wishlist</h2>
        {state.length === 0 ? (
          <p className="text-center">No items in your wishlist</p>
        ) : (
          <ul>
            {state.map((item) => (
              <li
                key={item.slug}
                className="group flex flex-row items-center justify-between border-b border-b-gray-200 py-2 text-gray-700 "
              >
                <Link
                  href={`/store/products/${item.slug}`}
                  className="group-hover:underline"
                >
                  {item.name}
                </Link>
                <Button
                  onClick={() => removeFromWishlist(item.slug)}
                  variant="ghost"
                  size="icon"
                >
                  <TrashIcon size={16} />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Page;
