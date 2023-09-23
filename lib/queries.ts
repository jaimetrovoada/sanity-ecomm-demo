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
import { CartProduct } from "./cartReducer";

export async function getProducts(filters: {
  brands: string[] | null;
  categories: string[] | null;
  pageIndex: number;
}): Promise<PaginatedProducts | Error> {
  const ITEMS_PER_PAGE = 5;
  const { brands, categories, pageIndex } = filters;

  const brandFilter = brands?.length ? `&& brand->slug.current in $brands` : "";

  const categoryFilter = categories?.length
    ? "&& count((tags[]->slug.current)[@ in $categories]) > 0"
    : "";

  try {
    const res = await client.fetch<PaginatedProducts>(
      groq`
{
    'products': *[_type=="product" ${brandFilter} ${categoryFilter}]
      [($pageIndex * $itemsPerPage)...($pageIndex + 1) * $itemsPerPage]
      {
        ...,
        'tags': tags[]->{title, slug},
        'brand': brand->{title, slug},
        'images':images[]{...,asset->}
      },
    'totalPageCount': count(*[_type=='product' ${brandFilter} ${categoryFilter}]) / $itemsPerPage,
    'currentPage': $pageIndex + 1
}`,
      {
        brands: brands ? brands : "",
        categories: categories ? categories : "",
        itemsPerPage: ITEMS_PER_PAGE,
        pageIndex: pageIndex - 1,
      },
    );
    return res as PaginatedProducts;
  } catch (error) {
    console.log({ error });
    return error as Error;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | Error> {
  try {
    const res = await client.fetch<Product>(
      groq`*[_type=="product" && slug.current == $slug][0]
            {
              ...,
              'tags':tags[]->{title, slug},
              'brand':brand->{title, slug},
              'images':images[]{...,asset->}
            }`,
      { slug },
    );

    return res as Product;
  } catch (error) {
    console.log({ error });
    return error as Error;
  }
}

export async function getSameBrandProducts(
  slug: string,
): Promise<Product[] | Error> {
  try {
    const res = await client.fetch<Product[]>(
      groq`*[_type=="product" && references(*[_type=='product' && slug.current == $slug].brand._ref) && !(slug.current == $slug)]
            [0...5] 
            {
              ...,
              'tags':tags[]->{title, slug},
              'brand':brand->{title, slug},
              'images':images[]{...,asset->}
            }`,
      { slug },
    );
    return res;
  } catch (error) {
    console.log({ error });
    return error as Error;
  }
}

export async function getCategories(): Promise<Category[] | Error> {
  try {
    const res = await client.fetch<Category[]>(
      groq`*[_type=="category"]{title, slug}`,
    );
    return res as Category[];
  } catch (error) {
    return error as Error;
  }
}

export async function getBrands(): Promise<Brand[] | Error> {
  try {
    const res = await client.fetch<Brand[]>(
      groq`*[_type=="brand"]{title, slug}`,
    );
    return res as Brand[];
  } catch (error) {
    return error as Error;
  }
}

export async function getCollections(): Promise<Collection[] | Error> {
  try {
    const res = await client.fetch<Collection[]>(
      groq`*[_type=="collection"]
              {
                ...,
                'recommendations':recommendations[]
                  {
                    ...,
                    product->
                      {
                      ...,
                      'tags':tags[]->{title, slug},
                      'brand':brand->{title, slug},
                      'images':images[]{...,asset->}
                      }
                  },
              }`,
    );

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
): Promise<Order | Error> {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        items,
        total,
        customer,
      }),
    });

    const body = await res.json();
    console.log({ body });
    return body as Order;
  } catch (error) {
    console.log({ error });
    return error as Error;
  }
}
