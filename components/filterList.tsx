"use client";

import { Brand, Category } from "@/@types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface Props {
  parameter: "category" | "brand";
  list: Category[] | Brand[] | null;
}
const FilterList = ({ parameter, list }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  console.log({ pathname });

  const value = searchParams.get(parameter);
  const current = list?.find((item) => item.slug.current === value);

  return (
    <div className="p-2">
      <Select
        value={value || "all"}
        onValueChange={(value) => {
          if (value === "all") {
            router.push("/store/products");
          }
          router.push(pathname + "?" + createQueryString(parameter, value));
        }}
      >
        <SelectTrigger className="capitalize">
          <SelectValue
            className="capitalize"
            placeholder={parameter}
            aria-label={current?.title}
          >
            {current?.title || "All"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {list?.map((item) => (
            <SelectItem
              key={item.slug.current}
              value={item.slug.current}
              className="flex"
            >
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterList;
