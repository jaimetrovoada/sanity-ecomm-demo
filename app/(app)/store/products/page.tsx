import FilterList from "@/components/filterList";
import ProductList from "@/components/productList";
import { getBrands, getCategories, getProducts } from "@/lib/queries";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const { category, brand } = searchParams;
  const [products, _] = await getProducts({
    category: category as string,
    brand: brand as string,
  });
  const [categories, cErr] = await getCategories();
  const [brands, bErr] = await getBrands();

  return (
    <main className="p-2 md:p-4">
      <div className={cn("flex flex-col gap-4 md:flex-row")}>
        <aside className="flex md:w-1/6 md:flex-col">
          <section className="flex-1 p-2 md:flex-none">
            <h2 className={cn("font-semibold")}>Categories</h2>
            <FilterList list={categories} parameter="category" />
          </section>
          <section className="flex-1 p-2 md:flex-none">
            <h2 className={cn("font-semibold")}>Brands</h2>
            <FilterList list={brands} parameter="brand" />
          </section>
        </aside>
        <section className={cn("flex flex-1 flex-col")}>
          <ProductList
            products={products}
            category={category as string}
            brand={brand as string}
          />
        </section>
      </div>
    </main>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Our Products",
  openGraph: {
    title: "Our Products",
    url: "/products",
    images: {
      url: "/api/og?title=Our Products",
      alt: "Oxygen Store - Products",
    },
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Products",
    images: {
      url: "/api/og?title=Our Products",
      alt: "Oxygen Store - Products",
    },
  },
};
