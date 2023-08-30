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
  images: Array<Image>;
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
