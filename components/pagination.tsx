"use client";

import { Button } from "./ui/button";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQueryState, parseAsInteger } from "next-usequerystate";

interface Props {
  count: number;
  currentPage: number;
}
const Pagination = ({ count, currentPage }: Props) => {
  const pathname = usePathname();
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withOptions({
        shallow: false,
      })
      .withDefault(1),
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === count;

  const goToNext = () => {
    if (isLastPage) {
      return;
    }
    setPage((prev) => (prev ? prev + 1 : null));
  };
  const gotToPrev = () => {
    if (isFirstPage) {
      return;
    }
    if (page === 2) {
      setPage(null);
      return;
    }
    setPage((prev) => (prev ? prev - 1 : null));
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent"
        disabled={isFirstPage}
        aria-label="Previous page"
        aria-disabled={isFirstPage}
        onClick={gotToPrev}
      >
        <ArrowLeft size={16} />
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
        onClick={goToNext}
      >
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
