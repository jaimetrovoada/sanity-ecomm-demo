import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getProductBySlug, getSameBrandProducts } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import CartButton from "@/components/cartButton";
import WishlistButton from "@/components/wishlistButton";
import RelatedProductsList from "@/components/relatedProductsList";
import type { Metadata } from "next";
import ProductImage from "@/components/productImage";

interface Props {
  params: {
    item: string;
  };
}

const Page = async ({ params }: Props) => {
  const { item } = params;
  const product = await getProductBySlug(item);

  const related = await getSameBrandProducts(item);

  if (product instanceof Error) {
    return product;
  }

  if (!product) {
    return notFound();
  }

  return (
    <main className="container flex h-full max-h-full flex-col gap-12 p-2 md:p-4">
      <div className="flex flex-col gap-4 rounded-md bg-white p-2 md:flex-row md:justify-evenly">
        <aside className="w-full md:w-1/3">
          <ProductImage
            image={product.images[0]}
            alt={product.title}
            priority
          />
        </aside>
        <section className="flex w-full max-w-prose flex-col">
          <div>
            <h2 className="tracking-widest text-gray-500">
              {product.brand.title}
            </h2>
          </div>
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="mt-8 leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            eveniet praesentium inventore fugit exercitationem amet ex cum
            cumque iure dolor? Excepturi impedit modi ad molestiae tenetur
            expedita rerum doloremque dolorem ea minus nemo ipsa error iure
            velit saepe a, officia quas, fugiat dolor ut. In eius facere
            doloremque iusto culpa.
          </p>
          <div className="mt-auto flex flex-row items-center justify-between border-t-2 border-gray-100 py-2">
            <span className="text-2xl font-medium">${product?.price}</span>
            <div className="flex flex-row gap-2">
              <WishlistButton product={product} />
              <CartButton product={product} />
            </div>
          </div>
        </section>
      </div>
      {related instanceof Error || related.length === 0 ? (
        <p>Couldnt find any related products</p>
      ) : (
        <RelatedProductsList related={related} />
      )}
    </main>
  );
};

export default Page;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { item } = params;
  const product = await getProductBySlug(item);

  if (product instanceof Error) {
    return {};
  }

  return {
    title: product?.title,
    openGraph: {
      title: product?.title,
      url: `/products/${item}`,
      images: {
        url: `/api/og?product=${product?.slug.current}`,
        alt: `Oxygen Store - ${product?.title}`,
      },
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product?.title,
      images: {
        url: `/api/og?product=${product?.slug.current}`,
        alt: `Oxygen Store - ${product?.title}`,
      },
    },
  };
}
