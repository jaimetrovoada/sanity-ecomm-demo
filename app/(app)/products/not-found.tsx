import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container flex h-full max-h-full flex-col items-center justify-center p-2 md:p-4">
      <section className="grid h-1/2 w-1/2 place-content-center gap-4 rounded-md bg-white p-4 text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="text-xl text-gray-500">
          Could not find the product you were looking for.
        </p>

        <Button className="inline-block" asChild>
          <Link href="/store/products">Go back</Link>
        </Button>
      </section>
    </main>
  );
}
