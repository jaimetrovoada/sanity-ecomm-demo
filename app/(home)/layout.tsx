import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`),
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
  return (
    <html lang="en">
      <body
        className={cn("flex h-dynamic flex-col bg-gray-200", inter.className)}
      >
        {children}
      </body>
    </html>
  );
}
