import { Product } from "@/@types";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import ProductImage from "./productImage";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface Prop {
  product: Product;
  useListStyle?: boolean;
}
const ProductCard = ({ product, useListStyle = false }: Prop) => {
  return (
    <Card
      className={cn(
        "group flex flex-col overflow-hidden rounded-none shadow-[0_0_0_1px] shadow-gray-500 ",
        {
          "flex-row md:flex-col": useListStyle,
        },
      )}
    >
      <div
        className={cn("w-full", {
          "w-1/4 md:w-full": useListStyle,
        })}
      >
        <ProductImage image={product.images[0]} alt={product.title} />
      </div>
      <CardHeader className="flex flex-col gap-1 border-t border-gray-500 p-2">
        <CardTitle className="">
          <Link
            href={`/store/products/${product.slug.current}`}
            className="text-base group-hover:underline"
          >
            {product.brand.title} {product.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-gray-600">
          {product.price.toLocaleString("en-Us", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </CardHeader>
    </Card>
  );
};

const PSkeleton = ({ useListStyle = false }: { useListStyle?: boolean }) => {
  return (
    <Card
      className={cn("group flex flex-col overflow-hidden", {
        "flex-row md:flex-col": useListStyle,
      })}
    >
      <Skeleton
        className={cn("aspect-square h-auto w-full", {
          "w-1/4 md:w-full": useListStyle,
        })}
      />
      <CardHeader className="flex w-full flex-col gap-4 p-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/4" />
      </CardHeader>
    </Card>
  );
};
ProductCard.Skeleton = PSkeleton;
export default ProductCard;
