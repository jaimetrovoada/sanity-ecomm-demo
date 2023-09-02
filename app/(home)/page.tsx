import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid flex-1 grid-rows-2 gap-2 p-2 md:grid-cols-2 md:grid-rows-1 md:p-4">
      <div className="order-2 flex h-full flex-col rounded-md bg-white px-4 py-12 shadow-md md:order-1">
        <h2 className="text-center text-5xl font-bold">
          Lorem ipsum dolor sit amet.
        </h2>
        <p className="mx-auto mt-12 max-w-prose text-center text-gray-700">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id,
          exercitationem eum. Blanditiis eligendi deserunt repudiandae maiores
          soluta sint, excepturi praesentium. Doloremque voluptatibus odit
          laborum dignissimos.
        </p>
        <div className="mt-auto flex flex-row items-center justify-between gap-6 text-sm">
          <p className="max-w-prose text-center text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            quam provident ratione ab eum deserunt, eaque labore cum totam
            repellendus magni iusto sit maxime placeat.
          </p>
          <p className="max-w-prose text-center text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            quam provident ratione ab eum deserunt, eaque labore cum totam
            repellendus magni iusto sit maxime placeat.
          </p>
        </div>
      </div>
      <div className="relative order-1 flex items-center justify-center overflow-hidden rounded-md bg-[url('/images/hero_image.jpg')] bg-cover bg-center shadow-md md:order-2">
        <Button
          className="rounded-full border-2 border-white bg-gray-100/10 px-8 py-4 text-xl font-bold text-white backdrop-blur transition-all hover:bg-gray-100/25 hover:shadow-sm hover:shadow-white"
          variant="link"
          asChild
        >
          <Link href="/store">Shop Now</Link>
        </Button>
      </div>
    </main>
  );
}
