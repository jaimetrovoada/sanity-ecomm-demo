"use client";

import { Brand, Category } from "@/@types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  parameter: "category" | "brand";
  list: Category[] | Brand[];
}
const FilterList = ({ parameter, list }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === "all") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const value = searchParams.get(parameter) || "all";

  const options = list
    ? [
        {
          title: "All",
          slug: {
            current: "all",
          },
        },
        ...list,
      ]
    : [
        {
          title: "All",
          slug: {
            current: "all",
          },
        },
      ];

  const current = options.find((item) => item.slug.current === value);

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        return router.push(
          pathname + "?" + createQueryString(parameter, value),
        );
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
        {options?.map((item) => (
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
  );
};

export default FilterList;
