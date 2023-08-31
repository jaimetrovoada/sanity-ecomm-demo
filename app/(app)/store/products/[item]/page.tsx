import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getProductBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

interface Props {
  params: {
    item: string;
  };
}
const Page = async ({ params }: Props) => {
  const { item } = params;
  const [product, err] = await getProductBySlug(item);

  console.log({ product });
  if (err) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-4 md:flex-row container mx-auto">
      <aside className="w-1/3">
        <AspectRatio className="bg-muted">
          <Image
            src={product?.images[0].url!}
            alt={`Image of ${product?.title}`}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </aside>
      <section className="flex flex-col ">
        <h2 className="text-sm text-gray-500 tracking-widest">
          {product?.brand.title}
        </h2>
        <h1 className="font-semibold text-3xl">{product?.title}</h1>
        <p className="text-gray-600 leading-relaxed max-w-prose w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          eveniet praesentium inventore fugit exercitationem amet ex cum cumque
          iure dolor? Excepturi impedit modi ad molestiae tenetur expedita rerum
          doloremque dolorem ea minus nemo ipsa error iure velit saepe a,
          officia quas, fugiat dolor ut. In eius facere doloremque iusto culpa.
        </p>
        <div className="flex flex-row justify-between items-center mt-auto border-t-2 border-gray-100">
          <span className="font-medium text-2xl">${product?.price}</span>
          <Button variant="outline" size="icon">
            <ShoppingCartIcon className="h-6 w-6" />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Page;
