import FeaturedSection from "@/components/featuredSection";
import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { getCollections } from "@/lib/queries";
import Link from "next/link";
import localFont from "next/font/local";

const phatt = localFont({
  src: "../../assets/fonts/Phatt.ttf",
  variable: "--font-phatt",
  display: "swap",
});

export default async function Home() {
  const collections = await getCollections();

  if (collections instanceof Error) {
    return (
      <Main className="flex flex-col gap-4">
        <p>crickets</p>
      </Main>
    );
  }
  return (
    <Main className="flex flex-col gap-4 px-2 md:px-4">
      <section className="relative flex h-[calc(100vh-2rem)] flex-col items-center justify-center overflow-hidden bg-[url('/images/hero_image.jpg')] bg-cover bg-center text-white">
        <h2 className={`text-center text-5xl font-bold ${phatt.className}`}>
          Oxygen Store
        </h2>

        <p className="mx-auto my-8 max-w-prose text-center text-xl">
          Breathe new life into your wardrobe.
        </p>
        <Button
          className="rounded-full border-2 border-white bg-gray-100/10 px-8 py-4 text-xl font-bold text-white backdrop-blur transition-all hover:bg-gray-100/25 hover:shadow-sm hover:shadow-white"
          variant="link"
          asChild
        >
          <Link href="/store">Shop Now</Link>
        </Button>
      </section>

      {collections.map((collection) => (
        <FeaturedSection
          key={collection._id}
          name={collection.title}
          description={collection.description}
          products={collection.recommendations}
        />
      ))}
    </Main>
  );
}
