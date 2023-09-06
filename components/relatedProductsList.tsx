import { Product } from "@/@types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getSameBrandProducts } from "@/lib/queries";
import ProductCard, { ProductCardSkeleton } from "./productCard";

interface Props {
  product: Product;
}

const RelatedProductsList = async ({ product }: Props) => {
  const related = await getSameBrandProducts(
    product.brand.slug.current!,
    product._id,
  );

  if (related instanceof Error) {
    return;
  }

  return (
    <section>
      <h3 className="mb-4 inline-flex items-center gap-1 text-2xl font-semibold hover:underline">
        <Link href={`/store/products?brand=${product?.brand.slug.current}`}>
          More From {product?.brand.title}
        </Link>
        <ArrowRight className="h-4 w-4" />
      </h3>
      <ul className="mx-auto grid max-w-screen-lg snap-x snap-mandatory auto-cols-max grid-flow-col gap-4 overflow-auto scroll-smooth md:auto-cols-[20%]">
        {related ? (
          related.map((product) => (
            <li key={product._id} className="snap-start">
              <ProductCard product={product} />
            </li>
          ))
        ) : (
          <p>Couldnt find anything</p>
        )}
      </ul>
    </section>
  );
};

export default RelatedProductsList;
