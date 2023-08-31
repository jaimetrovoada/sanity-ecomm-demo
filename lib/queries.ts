import { Brand, Category, Order, Product } from "@/@types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { createOrderId } from "@/lib/utils";
import { nanoid } from "nanoid/async";

export async function getProducts(filters: {
  brand: string | undefined;
  category: string | undefined;
}) {
  try {
    const brandFilter = filters.brand
      ? "&& references(*[_type=='brand' && slug.current == $brand]._id)"
      : "";
    const categoryFilter = filters.category
      ? `&& references(*[_type=='category' && title == $category]._id)`
      : "";
    console.log({
      filters,
      query: `*[_type=="product" ${brandFilter} ${categoryFilter}]{...,'tags':tags[]->{title, slug}, 'brand':brand->{title, slug}, 'images':images[].asset->{url}}`,
    });
    const res = await client.fetch<Product[]>(
      groq`*[_type=="product" ${brandFilter} ${categoryFilter}]{...,'tags':tags[]->{title, slug}, 'brand':brand->{title, slug}, 'images':images[].asset->{url}}`,
      {
        brand: filters.brand || null,
        category: filters.category || null,
      },
    );
    return [res, null] as const;
  } catch (error) {
    console.log({ error });
    return [null, error] as const;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const res = await client.fetch<Product>(
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
    const res = await client.fetch<Product[]>(
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
    const res = await client.fetch<Category[]>(
      groq`*[_type=="category"]{title, slug}`,
    );
    return [res, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
}

export async function getBrands() {
  try {
    const res = await client.fetch<Brand[]>(
      groq`*[_type=="brand"]{title, slug}`,
    );
    return [res, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
}

export async function createOrder() {
  const today = new Date();
  const date = today.toISOString();
  const id = await createOrderId();

  console.log({ id });
  const key = await nanoid(12);

  const order: Order = {
    _type: "order",
    orderId: id,
    slug: {
      _type: "slug",
      current: id,
    },
    products: [
      {
        _type: "reference",
        _ref: "14893118-86b1-4c58-92fe-579d0ad73024",
        _key: key,
      },
    ],
    customer: {
      name: "test",
      email: "3kY8Y@example.com",
    },
    status: "pending",
    date: date,
  };
  try {
    const res = await client.create(order);
    console.log({ res });
    return [res, null] as const;
  } catch (error) {
    console.log({ error });
    return [null, error] as const;
  }
}
