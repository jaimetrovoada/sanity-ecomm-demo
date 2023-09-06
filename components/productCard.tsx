import { Product } from "@/@types";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import ProductImage from "./productImage";

interface Prop {
  product: Product;
}
const ProductCard = ({ product }: Prop) => {
  return (
    <Card className="group flex flex-col overflow-hidden border-0 bg-transparent shadow-none">
      <div className="w-full overflow-hidden rounded-lg">
        <ProductImage image={product.images[0]} alt={product.title} />
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

export const ProductCardSkeleton = () => {
  return (
    <Card className="group flex flex-col overflow-hidden border-0 bg-transparent shadow-none">
      <Skeleton className="h-52 w-full overflow-hidden rounded-lg" />
      <CardHeader className="flex flex-col justify-between p-2 md:flex-row md:items-center">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
    </Card>
  );
};
