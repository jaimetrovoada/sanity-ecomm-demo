"use client";

import { Brand, Category } from "@/@types";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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

  return (
    <div className="p-2">
      {list?.map((item) => (
        <div key={item.slug.current}>
          <Checkbox
            id={item.slug.current}
            onCheckedChange={() => {
              router.push(
                pathname +
                  "?" +
                  createQueryString(parameter, item.slug.current),
              );
            }}
            checked={item.slug.current === searchParams.get(parameter)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterList;
