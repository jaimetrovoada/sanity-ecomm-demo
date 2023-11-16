import { Featured, Product } from "@/@types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import ProductImage from "./productImage";
import ProductCard from "./productCard";

interface Props {
  name: string;
  description: string;
  products: Featured[];
}

const FeaturedSection = ({ name, description, products }: Props) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch [&_div#main]:odd:order-last ">
      <div
        className="grid place-content-center bg-gray-100 p-6 shadow-[0_0_0_1px] shadow-gray-500 sm:p-8"
        id="main"
      >
        <div className="mx-auto max-w-md text-center lg:text-left">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              {name}
            </h2>

            <p className="mt-4 text-gray-500">{description} </p>
          </header>

          <a
            href="#"
            className="mt-8 inline-block rounded border border-gray-900 bg-gray-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
          >
            Shop All
          </a>
        </div>
      </div>

      <ul className="grid grid-cols-2">
        <li>
          <ProductCard product={products[0].product!} />
        </li>
        <li>
          <ProductCard product={products[1].product!} />
        </li>
      </ul>
    </section>
  );
};

export default FeaturedSection;
