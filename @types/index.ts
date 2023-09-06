import type { SanityDocument } from "@sanity/client";
import { Slug } from "sanity";

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

export type PaginatedProducts = {
  products: Product[];
  totalPageCount: number;
  currentPage: number;
};

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
    address: string;
    city: string;
    zipcode: string;
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

export type WishlistItem = {
  name: string;
  slug: string;
};

export type Featured = {
  _key?: string;
  product?: Product;
  featured?: boolean;
};

export type Collection = SanityDocument & {
  title: string;
  slug: Slug;
  description: string;
  recommendations: Array<Featured>;
};

export interface Image {
  _type: string;
  _key: string;
  asset: Asset;
}

interface Asset {
  extension: string;
  _type: string;
  uploadId: string;
  sha1hash: string;
  _updatedAt: string;
  metadata: Metadata;
  path: string;
  size: number;
  _createdAt: string;
  _rev: string;
  mimeType: string;
  url: string;
  assetId: string;
  _id: string;
  originalFilename: string;
}

interface Metadata {
  isOpaque: boolean;
  blurHash: string;
  _type: string;
  palette: Palette;
  hasAlpha: boolean;
  lqip: string;
  dimensions: Dimensions;
}

interface Palette {
  lightMuted: PaletteSwatch;
  vibrant: PaletteSwatch;
  dominant: PaletteSwatch;
  _type: string;
  darkMuted: PaletteSwatch;
  muted: PaletteSwatch;
  lightVibrant: PaletteSwatch;
  darkVibrant: PaletteSwatch;
}

interface PaletteSwatch {
  _type: string;
  foreground: string;
  title: string;
  population: number;
  background: string;
}

interface Dimensions {
  _type: string;
  width: number;
  aspectRatio: number;
  height: number;
}
