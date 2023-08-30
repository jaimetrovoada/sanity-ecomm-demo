"use client";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Brand, Category } from "@/@types";

const phatt = localFont({
  src: "../assets/fonts/Phatt.ttf",
  variable: "--font-phatt",
  display: "swap",
});

interface Props {
  categories: Category[] | null;
  brands: Brand[] | null;
}

const Header = ({ categories, brands }: Props) => {
  return (
    <header
      className={cn(
        "relative border-b border-b-gray-200 p-2 flex flex-row justify-between",
      )}
    >
      <h1 className={cn("text-3xl", phatt.className)}>OS</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-screen lg:grid-cols-[1fr_1fr_1fr]">
                <li className="row-span-3 text-lg font-semibold">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/store/products"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      All Products
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/store/categories"
                      className="text-lg font-semibold underline"
                    >
                      Categories
                    </Link>
                  </NavigationMenuLink>
                  <ul className="flex flex-row flex-wrap gap-4 p-2">
                    {categories?.map((category) => (
                      <li
                        key={category.slug.current}
                        className="underline text-gray-700"
                      >
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/store/categories/${category.slug.current}`}
                          >
                            {category.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/store/brands"
                      className="text-lg font-semibold underline"
                    >
                      Brands
                    </Link>
                  </NavigationMenuLink>
                  <ul className="flex flex-row flex-wrap gap-4 p-2">
                    {brands?.map((brand) => (
                      <li
                        key={brand.slug.current}
                        className="underline text-gray-700"
                      >
                        <NavigationMenuLink asChild>
                          <Link href={`/store/brands/${brand.slug.current}`}>
                            {brand.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
