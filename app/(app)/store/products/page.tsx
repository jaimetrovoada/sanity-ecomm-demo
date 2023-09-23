import { Brand, Category } from "@/@types";
import FilterList from "@/components/filterList";
import Main from "@/components/main";
import Pagination from "@/components/pagination";
import ProductList from "@/components/productList";
import { getBrands, getCategories, getProducts } from "@/lib/queries";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { parseAsArrayOf, parseAsInteger, parseAsString } from "next-usequerystate/parsers";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const pageParser = parseAsInteger.withDefault(1)

const Page = async ({ searchParams }: Props) => {
  const sCategeories = parseAsArrayOf(parseAsString).parseServerSide(searchParams.categories)
  const sBrands = parseAsArrayOf(parseAsString).parseServerSide(searchParams.brands)
  const page = pageParser.parseServerSide(searchParams.page)

  const products = await getProducts({
    categories: sCategeories,
    brands: sBrands,
    pageIndex: page,
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
    <Main className="flex flex-1 flex-col gap-2 lg:flex-row">
      <aside className="flex flex-col lg:sticky lg:top-0 lg:w-1/6 lg:self-start">
        <p className="uppercase">filters</p>
        <section className="flex-1 p-2 lg:flex-none">
          <FilterList categories={categoriesData} brands={brandsData} />
        </section>
      </aside>
      <section className={cn("flex flex-1 flex-col")}>
        <ProductList products={products.products} />
        <Pagination
          count={Math.ceil(products.totalPageCount)}
          currentPage={page}
        />
      </section>
    </Main>
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
