import FeaturedSection from "@/components/featuredSection";
import Main from "@/components/main";
import { getCollections } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const collections = await getCollections();

  if (collections instanceof Error) {
    return (
      <Main className="flex flex-col gap-4">
        <p>crickets</p>
      </Main>
    );
  }

  if (!collections.length) {
    redirect("/store/products");
  }
  return (
    <Main className="flex flex-col gap-4">
      {collections.map((collection) => (
        <FeaturedSection
          key={collection._id}
          name={collection.title}
          description={collection.description}
          products={collection.recommendations}
        />
      ))}
    </Main>
  );
}
