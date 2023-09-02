import { Product } from "@/@types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getProductsByBrand } from "@/lib/queries";
import { Suspense } from "react";
import ProductCard from "./productCard";

interface Props {
  product: Product;
}

const RelatedProductsList = async ({ product }: Props) => {
  const [related, rErr] = await getProductsByBrand(
    product?.brand.slug.current!,
    {
      limit: 5,
      currentId: product?._id,
    },
  );

  return (
    <section>
      <h3 className="mb-4 inline-flex items-center gap-1 text-2xl font-semibold hover:underline">
        <Link href={`/store/products?brand=${product?.brand.slug.current}`}>
          More From {product?.brand.title}
        </Link>
        <ArrowRight className="h-4 w-4" />
      </h3>
      <Suspense fallback={<p>Loading...</p>}>
        <ul className="mx-auto grid max-w-screen-lg snap-x snap-mandatory auto-cols-max grid-flow-col gap-4 overflow-auto scroll-smooth md:auto-cols-[20%]">
          {related?.map((product) => (
            <li key={product._id} className="snap-start">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Suspense>
    </section>
  );
};

export default RelatedProductsList;
