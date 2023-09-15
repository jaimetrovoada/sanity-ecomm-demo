import { Skeleton } from "@/components/ui/skeleton";
import { HeartIcon, ShoppingCartIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/productCard";

const Loading = () => {
  return (
    <main className="container flex h-full flex-col gap-12 p-2 md:p-4">
      <div className="flex flex-col gap-4 rounded-md bg-white p-2 md:flex-row md:justify-evenly">
        <aside className="aspect-square h-full w-full md:w-1/3">
          <Skeleton className="h-full w-full" />
        </aside>
        <section className="flex w-full max-w-prose flex-col">
          <Skeleton className="mb-2 h-3 w-12" />

          <Skeleton className="h-9 w-48" />
          <div className="mt-8 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="mt-auto flex flex-row items-center justify-between border-t-2 border-gray-100 py-2">
            <Skeleton className="h-8 w-12" />
            <div className="flex flex-row gap-2">
              <Button variant="outline" size="icon">
                <HeartIcon size={24} className="stroke-red-400" />
              </Button>
              <Button variant="outline" size="icon" className="bg-yellow-400">
                <ShoppingCartIcon size={24} className="" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      <section>
        <h3 className="mb-4 inline-flex items-center gap-1 text-2xl font-semibold hover:underline">
          More
          <ArrowRight className="h-4 w-4" />
        </h3>
        <ul className="mx-auto grid max-w-screen-lg snap-x snap-mandatory auto-cols-[45%] grid-flow-col gap-4 overflow-auto scroll-smooth md:auto-cols-[20%]">
          <li>
            <ProductCard.Skeleton />
          </li>
          <li>
            <ProductCard.Skeleton />
          </li>
          <li>
            <ProductCard.Skeleton />
          </li>
          <li>
            <ProductCard.Skeleton />
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Loading;
