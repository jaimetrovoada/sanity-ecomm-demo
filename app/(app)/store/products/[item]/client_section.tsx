"use client";
import { Product } from "@/@types";
import SizesGrid from "@/components/sizesGrid";
import CartButton from "@/components/cartButton";
import WishlistButton from "@/components/wishlistButton";
import { useState } from "react";

interface Props {
  product: Product;
}
const ClientSection = ({ product }: Props) => {
  const [size, setSize] = useState<string | null>(null);
  const handleSizeChange = (size: string) => {
    setSize(size);
  };
  return (
    <>
      <SizesGrid
        sizes={product.sizes}
        sizeState={size}
        handleSizeChange={handleSizeChange}
      />
      <div className="flex flex-row items-center justify-between border-t-2 border-gray-100 py-2">
        <span className="text-2xl font-medium">${product?.price}</span>
        <div className="flex flex-row gap-2">
          <WishlistButton product={product} />
          <CartButton product={product} size={size} />
        </div>
      </div>
    </>
  );
};

export default ClientSection;
