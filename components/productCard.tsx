import { Product } from "@/@types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

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
            alt="prod image"
            fill
            className="rounded-md object-cover transition duration-500 group-hover:scale-105"
          />
        </AspectRatio>
      </div>
      <CardHeader className="flex0">
        <CardTitle className="group-hover:underline">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>${product.price}</div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
