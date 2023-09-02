"use client";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Brand, Category } from "@/@types";
import Cart from "./cart";

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
        "relative flex flex-row justify-between border-b border-b-gray-200 bg-white px-4 py-2",
      )}
    >
      <h1 className={cn("text-3xl", phatt.className)}>
        <Link href="/">OS</Link>
      </h1>
      <NavigationMenu>
        <NavigationMenuList>
          <Cart />
          <NavigationMenuItem>
            <Link href="/store/wishlist" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Wishlist
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-screen gap-3 p-4 lg:grid-cols-[1fr_1fr_1fr]">
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
                  <NavigationMenuItem className="font-semibold">
                    Categories
                  </NavigationMenuItem>
                  <ul className="flex flex-row flex-wrap gap-4 p-2">
                    {categories?.map((category) => (
                      <li
                        key={category.slug.current}
                        className="text-gray-700 underline"
                      >
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/store/products?category=${category.slug.current}`}
                          >
                            {category.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <NavigationMenuItem className="font-semibold">
                    Brands
                  </NavigationMenuItem>
                  <ul className="flex flex-row flex-wrap gap-4 p-2">
                    {brands?.map((brand) => (
                      <li
                        key={brand.slug.current}
                        className="text-gray-700 underline"
                      >
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/store/products?brand=${brand.slug.current}`}
                          >
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
