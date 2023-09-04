import FeaturedSection from "@/components/featuredSection";
import { getCollections } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const collections = await getCollections();

  if (collections instanceof Error) {
    return (
      <main className="space-y-4 p-2 md:p-4">
        <p>crickets</p>
      </main>
    );
  }

  if (!collections.length) {
    redirect("/store/products");
  }
  return (
    <main className="space-y-4 p-2 md:p-4">
      {collections.map((collection) => (
        <FeaturedSection
          key={collection._id}
          name={collection.title}
          description={collection.description}
          products={collection.recommendations}
        />
      ))}
    </main>
  );
}
