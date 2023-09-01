import Image from "next/image";
import HeroImg from "@/assets/images/hero_image.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 flex-1 gap-2 p-4">
      <div className="h-full bg-white rounded-md flex flex-col px-4 py-12 shadow-md">
        <h2 className="text-5xl font-bold text-center">
          Lorem ipsum dolor sit amet.
        </h2>
        <p className="text-gray-700 max-w-prose text-center mx-auto mt-12">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id,
          exercitationem eum. Blanditiis eligendi deserunt repudiandae maiores
          soluta sint, excepturi praesentium. Doloremque voluptatibus odit
          laborum dignissimos.
        </p>
        <div className="flex flex-row justify-between items-center mt-auto text-sm gap-6">
          <p className="text-gray-700 max-w-prose text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            quam provident ratione ab eum deserunt, eaque labore cum totam
            repellendus magni iusto sit maxime placeat.
          </p>
          <p className="text-gray-700 max-w-prose text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            quam provident ratione ab eum deserunt, eaque labore cum totam
            repellendus magni iusto sit maxime placeat.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-md bg-[url('/images/hero_image.jpg')] bg-cover bg-center flex items-center justify-center shadow-md">
        <Button
          className="border-2 border-white px-8 py-4 rounded-full font-bold text-white bg-gray-100/10 backdrop-blur hover:bg-gray-100/25 hover:shadow-sm hover:shadow-white transition-all text-xl"
          variant="link"
          asChild
        >
          <Link href="/store">Shop Now</Link>
        </Button>
      </div>
    </main>
  );
}
