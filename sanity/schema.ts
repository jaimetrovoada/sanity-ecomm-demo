import { type SchemaTypeDefinition } from "sanity";
import product from "./schema/product";
import category from "./schema/category";
import brand from "./schema/brand";
import order, { cartItem } from "./schema/order";
import featured from "./schema/featured";
import collection from "./schema/collection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, brand, order, cartItem, featured, collection],
};
