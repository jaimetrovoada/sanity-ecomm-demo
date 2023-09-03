import {
  Brand,
  Category,
  Order,
  Product,
  Collection,
  PaginatedProducts,
} from "@/@types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { nanoid } from "nanoid/async";
import { CartProduct } from "./cartReducer";

export async function getProducts(filters: {
  brand: string | undefined;
  category: string | undefined;
  pageIndex: string | undefined;
}) {
  const ITEMS_PER_PAGE = 5;
  const pageIndex = parseInt(filters.pageIndex || "1");
  try {
    const brandFilter = filters.brand
      ? "&& references(*[_type=='brand' && slug.current == $brand]._id)"
      : "";
    const categoryFilter = filters.category
      ? `&& references(*[_type=='category' && slug.current == $category]._id)`
      : "";

    const res = await client.fetch<PaginatedProducts>(
      groq`{
  'products':*[_type=="product" ${brandFilter} ${categoryFilter}][($pageIndex * $itemsPerPage)...($pageIndex + 1) * $itemsPerPage]{...,'tags':tags[]->{title, slug}, 'brand':brand->{title, slug}, 'images':images[].asset->{url}},
  'totalPageCount': count(*[_type=='product']) / $itemsPerPage,
'currentPage': $pageIndex + 1

}`,
      {
        brand: filters.brand || null,
        category: filters.category || null,
        itemsPerPage: ITEMS_PER_PAGE,
        pageIndex: pageIndex - 1,
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
      groq`*[_type=="product" && slug.current == $slug][0]{...,'tags':tags[]->{title, slug}, 'brand':brand->{title, slug}, 'images':images[].asset->{url}}`,
      { slug },
    );
    if (res === null) {
      throw new Error("Product not found");
    }
    return res as Product;
  } catch (error) {
    console.log({ error });
    return error as Error;
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

export async function getProductsByBrand(
  brand: string,
  filters?: { limit?: number; currentId?: string },
) {
  const limitFilter = filters?.limit ? `[0...${filters?.limit}]` : "";

  const excludeCurrentFilter = `&& !(_id == '${filters?.currentId}')`;

  try {
    const res = await client.fetch<Product[]>(
      groq`*[_type=="product" && references(*[_type=='brand' && slug.current == $brand]._id) ${excludeCurrentFilter}] ${limitFilter} {...,'tags':tags[]->{title, slug}, 'brand':brand->{title, slug}, 'images':images[].asset->{url}}`,
      { brand },
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

export async function getCollections(): Promise<Collection[] | Error> {
  try {
    const res = await client.fetch<Collection[]>(groq`*[
    _type=="collection"]
  {...,
    'recommendations':recommendations[]{..., product->{...,'tags':tags[]->{title, slug}, 'brand':brand->{title, slug}, 'images':images[].asset->{url}}},
  }`);

    return res as Collection[];
  } catch (error) {
    console.log({ error });
    return error as Error;
  }
}

export async function placeOrder(
  items: CartProduct[],
  total: number,
  customer: { name: string; email: string },
) {
  const today = new Date();
  const date = today.toISOString();

  const id = await nanoid(8);
  const key = await nanoid(12);

  const order: Order = {
    _type: "order",
    title: `${customer.name} - order_${id}`,
    slug: {
      _type: "slug",
      current: `order_${id}`,
    },
    total: total,
    items: items.map((item) => {
      return {
        title: item.name,
        quantity: item.quantity,
        _key: key,
        product: {
          _type: "reference",
          _ref: item.id,
        },
      };
    }),
    customer: customer,
    status: "pending",
    date: date,
  };

  try {
    const res = await client.create(order);
    return res;
  } catch (error) {
    console.log({ error });
    return error;
  }
}
