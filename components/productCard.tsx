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
    <Card className="group flex flex-col overflow-hidden">
      <div className="w-full">
        <ProductImage image={product.images[0]} alt={product.title} />
      </div>
      <CardHeader className="flex flex-col justify-between p-2">
        <p className="text-sm text-slate-500">{product.tags[0].title}</p>
        <CardTitle className="">
          <Link
            href={`/store/products/${product.slug.current}`}
            className="text-base group-hover:underline"
          >
            {product.brand.title} {product.title}
          </Link>
        </CardTitle>
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
