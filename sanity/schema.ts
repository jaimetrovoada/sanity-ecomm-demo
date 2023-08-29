import { type SchemaTypeDefinition } from "sanity";
import product from "./schema/product";
import category from "./schema/category";
import brand from "./schema/brand";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, brand],
};
