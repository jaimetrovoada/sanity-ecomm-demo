import { type SchemaTypeDefinition } from "sanity";
import product from "./schema/product";
import category from "./schema/category";
import brand from "./schema/brand";
import order from "./schema/order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, brand, order],
};
