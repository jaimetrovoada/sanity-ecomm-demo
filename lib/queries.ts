import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function getProducts() {
  try {
    const res = await client.fetch(groq`*[_type=="product"]{title, slug}`);
    return [res, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const res = await client.fetch(
      groq`*[_type=="product" && slug.current == $slug]{title, slug, description, price, brand, tags, images}`,
      { slug },
    );
    return [res, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
}

export async function getProductsByTag(tag: string) {
  try {
    const res = await client.fetch(
      groq`*[_type=="product" && references(*[_type=="category" && title == $categoryName]._id)]{title}`,
      { categoryName: tag },
    );
    return [res, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
}

export async function getCategories() {
  try {
    const res = await client.fetch(groq`*[_type=="category"]{title, slug}`);
    return [res, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
}

export async function getBrands() {
  try {
    const res = await client.fetch(groq`*[_type=="brand"]{title, slug}`);
    return [res, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
}
