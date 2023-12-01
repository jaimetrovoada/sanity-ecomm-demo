import ProductCard from "@/components/productCard";
import FilterList from "@/components/filterList";
import { cn } from "@/lib/utils";
import Main from "@/components/main";

const Loading = () => {
  return (
    <Main className="flex flex-1 flex-col gap-2 lg:flex-row">
      <aside className="flex flex-col lg:sticky lg:top-0 lg:w-1/6 lg:self-start">
        <p className="uppercase">filters</p>
        <section className="flex-1 p-2 lg:flex-none">
          <FilterList categories={null} brands={null} />
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
    </Main>
  );
};

export default Loading;
