import Header from "@/components/header";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { getBrands, getCategories } from "@/lib/queries";
import CartProvider from "@/components/cartProvider";
import { Toaster } from "@/components/ui/toaster";
import { Brand, Category } from "@/@types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/store`),
  title: {
    template: "%s | Oxygen Store",
    default: "Oxygen Store",
  },
  description: "A eCommerce site built with Next.js and Sanity CMS",
  keywords: [
    "sanity",
    "sanity cms",
    "sanity-nextjs",
    "ecommerce",
    "e-commerce",
  ],
  openGraph: {
    title: {
      template: "%s | Oxygen Store",
      default: "Oxygen Store",
    },
    description: "A eCommerce site built with Next.js and Sanity CMS",
    url: "/",
    siteName: "Oxygen Store",
    images: {
      url: "/api/og",
      alt: "Oxygen Store",
    },

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | Oxygen Store",
      default: "Oxygen Store",
    },
    description: "A eCommerce site built with Next.js and Sanity CMS",
    images: {
      url: "/api/og",
      alt: "Oxygen Store",
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const brands = await getBrands();

  let categoriesData: Category[] = [];
  let brandsData: Brand[] = [];

  if (!(categories instanceof Error)) {
    categoriesData = categories;
  }

  if (!(brands instanceof Error)) {
    brandsData = brands;
  }
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("flex min-h-screen flex-col bg-white", inter.className)}
      >
        <CartProvider>
          <Header categories={categoriesData} brands={brandsData} />
          {children}
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
