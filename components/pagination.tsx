"use client";

import { Button } from "./ui/button";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  count: number;
  currentPage: string | null;
}
const Pagination = ({ count, currentPage }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === "1") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const isFirstPage = currentPage === "1";
  const isLastPage = currentPage === count.toString();

  const prevLink = (function () {
    if (isFirstPage) {
      return pathname;
    }
    if (currentPage === "2") {
      return pathname;
    }
    return (
      pathname +
      "?" +
      createQueryString("page", (Number(currentPage || "1") - 1).toString())
    );
  })();

  const nextLink = (function () {
    if (isLastPage) {
      return pathname + "?" + createQueryString("page", currentPage || "1");
    }
    return (
      pathname +
      "?" +
      createQueryString("page", (Number(currentPage || "1") + 1).toString())
    );
  })();

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent"
        disabled={isFirstPage}
        aria-label="Previous page"
        aria-disabled={isFirstPage}
        asChild
      >
        <Link href={prevLink}>
          <ArrowLeft size={16} />
        </Link>
      </Button>
      <p>
        {Number(currentPage || "1")} / {count}
      </p>
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent"
        disabled={isLastPage}
        aria-label="Next page"
        aria-disabled={isLastPage}
        asChild
      >
        <Link href={nextLink}>
          <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  );
};

export default Pagination;
