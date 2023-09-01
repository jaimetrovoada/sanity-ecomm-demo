import { Product } from "@/@types";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";

interface Prop {
  product: Product;
}
const ProductCard = ({ product }: Prop) => {
  return (
    <Card className="group flex flex-col overflow-hidden border-0 bg-transparent shadow-none">
      <div className="w-full overflow-hidden rounded-lg">
        <AspectRatio className="bg-muted">
          <Image
            src={product.images[0].url}
            alt={`Image of ${product.title}`}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        </AspectRatio>
      </div>
      <CardHeader className="flex flex-col justify-between p-2 md:flex-row md:items-center">
        <CardTitle className="">
          <Link
            href={`/store/products/${product.slug.current}`}
            className="line-clamp-1 text-base group-hover:underline md:text-lg"
          >
            {product.title}
          </Link>
        </CardTitle>
        <div className="text-sm font-normal text-gray-600 md:text-base">
          ${product.price}
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
