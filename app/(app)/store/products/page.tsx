import FilterList from "@/components/filterList";
import ProductList from "@/components/productList";
import SendOrderBtn from "@/components/sendOrderBtn";
import { getBrands, getCategories, getProducts } from "@/lib/queries";
import { cn } from "@/lib/utils";

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

  console.log({ products, length: products?.length });

  return (
    <main>
      <div className={cn("flex flex-col md:flex-row gap-4")}>
        <aside className="flex md:flex-col md:w-1/6">
          <section className="flex-1 p-2 md:flex-none">
            <h2 className={cn("font-semibold")}>Categories</h2>
            <FilterList list={categories} parameter="category" />
          </section>
          <section className="flex-1 p-2 md:flex-none">
            <h2 className={cn("font-semibold")}>Brands</h2>
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
