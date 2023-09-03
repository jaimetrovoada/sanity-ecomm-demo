import { ProductCardSkeleton } from "@/components/productCard";
import FilterList from "@/components/filterList";
import { cn } from "@/lib/utils";

const Loading = () => {
  return (
    <main className="p-2 md:p-4">
      <div className={cn("flex flex-col gap-4 md:flex-row")}>
        <aside className="flex md:w-1/6 md:flex-col">
          <section className="flex-1 p-2 md:flex-none">
            <h2 className={cn("font-semibold")}>Categories</h2>
            <FilterList list={null} parameter="category" />
          </section>
          <section className="flex-1 p-2 md:flex-none">
            <h2 className={cn("font-semibold")}>Brands</h2>
            <FilterList list={null} parameter="brand" />
          </section>
        </aside>
        <section className={cn("flex flex-1 flex-col")}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Loading;
