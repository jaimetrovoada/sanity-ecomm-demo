import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getProductBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import RelatedProductsList from "@/components/relatedProductsList";
import type { Metadata } from "next";
import ProductImage from "@/components/productImage";
import { Suspense } from "react";
import ProductImageGallery from "@/components/productImageGallery";
import Main from "@/components/main";
import ClientSection from "./client_section";

interface Props {
  params: {
    item: string;
  };
}

const Page = async ({ params }: Props) => {
  const { item } = params;
  const product = await getProductBySlug(item);

  if (product instanceof Error) {
    return product;
  }

  if (!product) {
    return notFound();
  }

  return (
    <Main className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 border border-gray-500 bg-white p-2 md:flex-row md:justify-evenly">
        <aside className="flex w-full flex-col gap-1 md:w-1/3">
          <ProductImageGallery images={product.images} title={product.title} />
        </aside>
        <section className="flex w-full max-w-prose flex-col gap-2">
          <div>
            <h2 className="tracking-widest text-gray-500">
              {product.brand.title}
            </h2>
          </div>
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="mt-8 flex-1 leading-relaxed text-gray-600">
            {product.description}
          </p>
          <ClientSection product={product} />
        </section>
      </div>
      <Suspense fallback={<RelatedProductsList.Skeleton />}>
        <RelatedProductsList slug={item} />
      </Suspense>
    </Main>
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
