import { Product } from "@/@types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";

interface Prop {
  product: Product;
}
const ProductCard = ({ product }: Prop) => {
  return (
    <Card className="flex flex-col overflow-hidden group">
      <div className="w-full">
        <AspectRatio className="bg-muted">
          <Image
            src={product.images[0].url}
            alt={`Image of ${product.title}`}
            fill
            className="rounded-md object-cover transition duration-500 group-hover:scale-105"
          />
        </AspectRatio>
      </div>
      <CardHeader className="flex flex-row justify-between p-2 pt-4 items-center">
        <CardTitle className="">
          <Link
            href={`/store/products/${product.slug.current}`}
            className="group-hover:underline text-lg line-clamp-1"
          >
            {product.title}
          </Link>
        </CardTitle>
        <div className="text-lg font-normal text-gray-600">
          ${product.price}
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
