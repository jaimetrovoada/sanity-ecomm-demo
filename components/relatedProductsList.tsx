import { Product } from "@/@types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard, { ProductCardSkeleton } from "./productCard";
import { getSameBrandProducts } from "@/lib/queries";

interface Props {
  slug: string;
}

const RelatedProductsList = async ({ slug }: Props) => {
  const related = await getSameBrandProducts(slug);
  if (!related || related instanceof Error || related.length === 0) {
    return (
      <section>
        <h2 className="mb-4 inline-flex items-center gap-1 text-2xl font-semibold hover:underline">
          Couldnt find any related products
        </h2>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 inline-flex items-center gap-1 text-2xl font-semibold hover:underline">
        <Link href={`/store/products?brand=${related[0].brand.slug}`}>
          More From {related[0].brand.title}
        </Link>
        <ArrowRight className="h-4 w-4" />
      </h2>
      <ul className="mx-auto grid max-w-screen-lg snap-x snap-mandatory auto-cols-max grid-flow-col gap-4 overflow-auto scroll-smooth md:auto-cols-[20%]">
        {related.map((product) => (
          <li key={product._id} className="snap-start">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

 const Skeleton = () => {
  return (
      <section>
        <h3 className="mb-4 inline-flex items-center gap-1 text-2xl font-semibold hover:underline">
          More
          <ArrowRight className="h-4 w-4" />
        </h3>
        <ul className="mx-auto grid max-w-screen-lg snap-x snap-mandatory auto-cols-[45%] grid-flow-col gap-4 overflow-auto scroll-smooth md:auto-cols-[20%]">
          <li>
            <ProductCardSkeleton />
          </li>
          <li>
            <ProductCardSkeleton />
          </li>
          <li>
            <ProductCardSkeleton />
          </li>
          <li>
            <ProductCardSkeleton />
          </li>
        </ul>
      </section>
  )
}
RelatedProductsList.Skeleton = Skeleton

export default RelatedProductsList;
