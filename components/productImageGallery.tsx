"use client";
import { Product } from "@/@types";
import { useState } from "react";
import ProductImage from "./productImage";
import { Button } from "./ui/button";
import ScrollableArea from "./scrollableArea";
import { cn } from "@/lib/utils";

interface Props {
  images: Product["images"];
  title: string;
}
const ProductImageGallery = ({ images, title }: Props) => {
  const [mainImage, setMainImage] = useState(images[0]);
  return (
    <>
      <ProductImage image={mainImage} alt={title} priority />
      <ScrollableArea className="h-20 p-2 [&>button]:w-20 [&>button]:shrink-0">
        {images.map((image) => (
          <Button
            onClick={() => setMainImage(image)}
            variant={"ghost"}
            key={image._key}
            className={cn(
              "aspect-square h-auto overflow-hidden border-2 border-transparent p-0",
              {
                "border-slate-400": mainImage === image,
              },
            )}
          >
            <ProductImage image={image} alt={title} />
          </Button>
        ))}
      </ScrollableArea>
    </>
  );
};

export default ProductImageGallery;
