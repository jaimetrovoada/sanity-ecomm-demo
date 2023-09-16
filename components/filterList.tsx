"use client";

import { Brand, Category } from "@/@types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Props {
  categories: Category[];
  brands: Brand[];
}

const FormSchema = z.object({
  brands: z.array(z.string()),
  categories: z.array(z.string()),
});
function mergeSearchParams(params1: URLSearchParams, params2: URLSearchParams) {
  const mergedParams = new URLSearchParams(params1);

  params2.forEach((value, key) => {
    if (!mergedParams.has(key)) {
      mergedParams.append(key, value);
    }
  });

  return mergedParams.toString();
}
const FilterList = ({ brands, categories }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback((name: string, values: string[]) => {
    const params = values.reduce((acc, cur) => {
      acc.append(name, cur);
      return acc;
    }, new URLSearchParams());
    return params;
  }, []);

  const sCategories = searchParams.getAll("categories");
  const sBrands = searchParams.getAll("brands");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: sCategories,
      brands: sBrands,
    },
  });

  const submitDisabled = !(
    form.getFieldState("categories").isDirty ||
    form.getFieldState("brands").isDirty
  );
  console.log({
    submitDisabled: submitDisabled,
    bransT: form.getFieldState("brands").isDirty,
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = mergeSearchParams(
      createQueryString("brands", data.brands),
      createQueryString("categories", data.categories),
    );

    const newUrl = pathname + "?" + params;

    return router.push(newUrl);
  }

  return (
    <>
      <Accordion type="single" collapsible>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <AccordionItem value="brands">
              <AccordionTrigger className="py-2 capitalize">
                brands
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="brands"
                  render={() => (
                    <FormItem>
                      {brands?.map((option) => (
                        <FormField
                          key={option._id}
                          control={form.control}
                          name="brands"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option._id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      option.slug.current,
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field?.value,
                                            option.slug.current,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== option.slug.current,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.title}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="categories">
              <AccordionTrigger className="py-2 capitalize">
                categories
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      {categories?.map((option) => (
                        <FormField
                          key={option._id}
                          control={form.control}
                          name="categories"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option._id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      option.slug.current,
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field?.value,
                                            option.slug.current,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== option.slug.current,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.title}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <Button
              type="submit"
              disabled={submitDisabled}
              className="h-fit px-2 py-1 text-sm "
            >
              Filter
            </Button>
          </form>
        </Form>
      </Accordion>
    </>
  );
};

export default FilterList;
