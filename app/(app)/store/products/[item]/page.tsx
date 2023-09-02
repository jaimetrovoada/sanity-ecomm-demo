import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getProductBySlug, getProductsByBrand } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CartButton from "@/components/cartButton";

interface Props {
  params: {
    item: string;
  };
}
const Page = async ({ params }: Props) => {
  const { item } = params;
  const [product, err] = await getProductBySlug(item);
  const [related, rErr] = await getProductsByBrand(
    product?.brand.slug.current!,
    {
      limit: 5,
      currentId: product?._id,
    },
  );

  if (err) {
    notFound();
  }

  return (
    <main className="container flex h-full max-h-full flex-col gap-12 pb-4">
      <div className="flex flex-1 flex-col gap-4 rounded-md bg-white p-2 md:flex-row md:justify-evenly">
        <aside className="w-full md:w-1/3">
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
          <div>
            <h2 className="tracking-widest text-gray-500">
              {product?.brand.title}
            </h2>
          </div>
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="mt-8 w-full max-w-prose leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            eveniet praesentium inventore fugit exercitationem amet ex cum
            cumque iure dolor? Excepturi impedit modi ad molestiae tenetur
            expedita rerum doloremque dolorem ea minus nemo ipsa error iure
            velit saepe a, officia quas, fugiat dolor ut. In eius facere
            doloremque iusto culpa.
          </p>
          <div className="mt-auto flex flex-row items-center justify-between border-t-2 border-gray-100 py-2">
            <span className="text-2xl font-medium">${product?.price}</span>
            <CartButton product={product!} />{" "}
          </div>
        </section>
      </div>
      <section>
        <h3 className="mb-4 inline-flex items-center gap-1 text-2xl font-semibold hover:underline">
          <Link href={`/store/products?brand=${product?.brand.slug.current}`}>
            More From {product?.brand.title}
          </Link>
          <ArrowRight className="h-4 w-4" />
        </h3>
        <ul className="mx-auto grid max-w-screen-lg snap-x snap-mandatory auto-cols-max grid-flow-col gap-4 overflow-auto scroll-smooth md:auto-cols-[20%]">
          {related?.map((product) => (
            <li
              key={product._id}
              className="snap-start overflow-hidden rounded-lg bg-gray-100 p-2"
            >
              <div className="w-full">
                <AspectRatio className="bg-muted">
                  <Image
                    src={product?.images[0].url!}
                    alt={`Image of ${product?.title}`}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>

              <span>{product?.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Page;
