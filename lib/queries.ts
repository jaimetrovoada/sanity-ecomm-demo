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
  brand?: string;
  category?: string;
  pageIndex?: string;
}): Promise<PaginatedProducts | Error> {
  const ITEMS_PER_PAGE = 5;
  const pageIndex = parseInt(filters.pageIndex || "1");

  const brandFilter = filters.brand
    ? "&& references(*[_type=='brand' && slug.current == $brand]._id)"
    : "";

  const categoryFilter = filters.category
    ? `&& references(*[_type=='category' && slug.current == $category]._id)`
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
        brand: filters.brand || "",
        category: filters.category || "",
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
  brand: string,
  currentId: string,
): Promise<Product[] | Error> {
  try {
    const res = await client.fetch<Product[]>(
      groq`*[_type=="product" && references(*[_type=='brand' && slug.current == $brand]._id) && !(_id == '$currentId')]
            [0...5] 
            {
              ...,
              'tags':tags[]->{title, slug},
              'brand':brand->{title, slug},
              'images':images[]{...,asset->}
            }`,
      { brand, currentId },
    );
    return res as Product[];
  } catch (error) {
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
    const res = await client.create<Order>(order);
    return res;
  } catch (error) {
    console.log({ error });
    return error as Error;
  }
}
