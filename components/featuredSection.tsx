import { Featured, Product } from "@/@types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import ProductImage from "./productImage";

interface Props {
  name: string;
  description: string;
  products: Featured[];
}

const FeaturedSection = ({ name, description, products }: Props) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch [&_div#main]:odd:order-last">
      <div
        className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8"
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

      <ul className="grid grid-cols-[1fr_1px_1fr]">
        <li className="bg-white py-2">
          <Link
            href={`/store/products/${products[0].product?.slug.current}`}
            className="group block"
          >
            <ProductImage
              image={products[0].product?.images[0]!}
              alt={products[0].product?.title!}
            />

            <div className="mt-3 px-2">
              <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                {products[0].product?.title}
              </h3>

              <p className="mt-1 text-sm text-gray-700">
                {products[0].product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
          </Link>
        </li>
        <div className="h-full w-px bg-gray-300"></div>

        <li className="bg-white py-2">
          <Link
            href={`/store/products/${products[1].product?.slug.current}`}
            className="group block"
          >
            <ProductImage
              image={products[1].product?.images[0]!}
              alt={products[0].product?.title!}
            />

            <div className="mt-3 px-2">
              <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                {products[1].product?.title}
              </h3>

              <p className="mt-1 text-sm text-gray-700">
                {products[1].product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default FeaturedSection;
