import { Brand, Category } from "@/@types";
import FilterList from "@/components/filterList";
import Pagination from "@/components/pagination";
import ProductList from "@/components/productList";
import { getBrands, getCategories, getProducts } from "@/lib/queries";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const { category, brand, page } = searchParams;
  const products = await getProducts({
    category: category as string,
    brand: brand as string,
    pageIndex: page as string,
  });

  const categories = await getCategories();
  const brands = await getBrands();

  let categoriesData: Category[] = [];
  let brandsData: Brand[] = [];

  if (products instanceof Error) {
    return new Error("Products not found");
  }
  if (!(categories instanceof Error)) {
    categoriesData = categories;
  }

  if (!(brands instanceof Error)) {
    brandsData = brands;
  }

  return (
    <main className="flex flex-1 flex-col p-2 md:overflow-hidden md:p-4">
      <div className={cn("flex h-full flex-col gap-4 md:flex-row")}>
        <aside className="flex md:w-1/6 md:flex-col">
          <section className="flex-1 p-2 md:flex-none">
            <h2 className={cn("font-semibold")}>Categories</h2>
            <FilterList list={categoriesData} parameter="category" />
          </section>
          <section className="flex-1 p-2 md:flex-none">
            <h2 className={cn("font-semibold")}>Brands</h2>
            <FilterList list={brandsData} parameter="brand" />
          </section>
        </aside>
        <section className={cn("flex flex-1 flex-col")}>
          <ProductList products={products.products} />
        </section>
      </div>
      <Pagination
        count={Math.ceil(products.totalPageCount)}
        currentPage={(page as string) || "1"}
      />
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
