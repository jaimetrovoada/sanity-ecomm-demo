import { defineField, defineType, isKeyedObject } from "sanity";
import { Featured } from "@/@types";

export default defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      title: "Featured Products",
      name: "recommendations",
      type: "array",
      of: [{ type: "featured" }],
      validation: (rule) =>
        rule.custom((items?: Featured[]) => {
          const featuredItems = items
            ? items.filter((item) => item.featured)
            : [];

          if (featuredItems.length > 2) {
            return {
              paths: featuredItems
                .filter(isKeyedObject)
                .map((item) => [{ _key: item._key }]),
              message: "Only two products can be featured",
            };
          }

          return true;
        }),
    }),
  ],
});
