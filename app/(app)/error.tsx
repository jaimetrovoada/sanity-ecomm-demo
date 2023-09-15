"use client"; // Error components must be Client Components
import Main from "@/components/main";
import { Button } from "@/components/ui/button";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Main className="flex h-full max-h-full flex-col items-center justify-center">
      <section className="grid h-1/2 w-1/2 place-content-center gap-4 rounded-md bg-white p-4 text-center">
        <h2>Something went wrong!</h2>

        <p className="text-xl text-gray-500">
          Could not find the product you were looking for.
        </p>

        <Button onClick={() => reset()}>Try again</Button>
      </section>
    </Main>
  );
}
