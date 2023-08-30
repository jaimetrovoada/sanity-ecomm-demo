import FilterList from "@/components/filterList";
import ProductList from "@/components/productList";
import { getBrands, getCategories, getProducts } from "@/lib/queries";
import { cn } from "@/lib/utils";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}
const Page = async ({ searchParams }: Props) => {
  const { category, brand } = searchParams;
  const [products, pErr] = await getProducts();
  const [categories, cErr] = await getCategories();
  const [brands, bErr] = await getBrands();

  console.log({ category, brand });

  return (
    <main>
      <div className={cn("flex flex-row gap-4")}>
        <aside>
          <section>
            <h2 className={cn("font-semibold text-lg")}>Categories</h2>
            <FilterList list={categories} parameter="category" />
          </section>
          <section>
            <h2 className={cn("font-semibold text-lg")}>Brands</h2>
            <FilterList list={brands} parameter="brand" />
          </section>
        </aside>
        <section className={cn("flex flex-col flex-1")}>
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