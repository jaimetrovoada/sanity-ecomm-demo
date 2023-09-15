import ProductCard from "@/components/productCard";
import FilterList from "@/components/filterList";
import { cn } from "@/lib/utils";

const Loading = () => {
  return (
    <main className="container flex flex-1 flex-col gap-2 py-4 lg:flex-row">
      <aside className="flex lg:sticky lg:top-0 lg:w-1/6 lg:flex-col lg:self-start">
        <section className="flex-1 p-2 lg:flex-none">
          <h2 className={cn("font-semibold")}>Categories</h2>
          <FilterList list={null} parameter="category" />
        </section>
        <section className="flex-1 p-2 lg:flex-none">
          <h2 className={cn("font-semibold")}>Brands</h2>
          <FilterList list={null} parameter="brand" />
        </section>
      </aside>
      <section className={cn("flex flex-1 flex-col")}>
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4 xl:grid-cols-5">
            <ProductCard.Skeleton useListStyle />
            <ProductCard.Skeleton useListStyle />
            <ProductCard.Skeleton useListStyle />
            <ProductCard.Skeleton useListStyle />
            <ProductCard.Skeleton useListStyle />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;
