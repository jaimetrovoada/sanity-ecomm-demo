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

  const prevLink = (function () {
    if (currentPage === "1") {
      return "";
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
    if (currentPage === count.toString()) {
      return "";
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
        disabled={currentPage === "1"}
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
        disabled={currentPage === count.toString()}
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
