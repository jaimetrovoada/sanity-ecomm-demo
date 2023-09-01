import { Image } from "sanity";

export interface Product {
  price: number;
  _rev: string;
  _id: string;
  _updatedAt: string;
  _type: "product";
  title: string;
  brand: {
    title: string;
    slug: {
      current: string;
      _type: "slug";
    };
    _type: "brand";
  };
  slug: {
    current: string;
    _type: "slug";
  };
  description: string;
  images: Array<{
    url: string;
  }>;
  tags: Array<{
    title: string;
    slug: {
      current: string;
      _type: "slug";
    };
    _type: "category";
  }>;
  _createdAt: string;
}

export interface Category {
  _rev: string;
  _type: "category";
  _id: string;
  title: string;
  _updatedAt: string;
  slug: {
    current: string;
    _type: "slug";
  };
  _createdAt: string;
}

export interface Brand {
  title: string;
  _updatedAt: string;
  slug: {
    current: string;
    _type: "slug";
  };
  _createdAt: string;
  _rev: string;
  _type: "brand";
  _id: string;
}

export interface Order {
  _id?: string;
  _type: "order";
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug?: {
    current: string;
    _type: "slug";
  };
  customer: {
    name: string;
    email: string;
  };
  total: number;
  items: Array<{
    _key: string;
    title: string;
    quantity: number;
    product: {
      _ref: string;
      _type: "reference";
    };
  }>;
  date: string;
  status: "pending" | "completed" | "cancelled";
}
