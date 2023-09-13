"use client";
import { Product } from "@/@types";
import { useState } from "react";
import ProductImage from "./productImage";
import { Button } from "./ui/button";
import ScrollableArea from "./scrollableArea";

interface Props {
  images: Product["images"];
  title: string;
}
const ProductImageSlide = ({ images, title }: Props) => {
  const [mainImage, setMainImage] = useState(images[0]);
  return (
    <>
      <ProductImage image={mainImage} alt={title} priority />
      <ScrollableArea className="[&>button]:shrink-0 [&>button]:basis-1/4">
        {[...images, ...images, ...images, ...images].map((image) => (
          <Button
            onClick={() => setMainImage(image)}
            variant={"ghost"}
            key={image._key}
            className="aspect-square h-auto p-0"
          >
            <ProductImage image={image} alt={title} />
          </Button>
        ))}
      </ScrollableArea>
    </>
  );
};

export default ProductImageSlide;
