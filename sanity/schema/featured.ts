import { defineField, defineType } from "sanity";

export default defineType({
  name: "featured",
  title: "Featured",
  type: "object",
  fields: [
    defineField({
      name: "product",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "product" }],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "product.title",
      tags: "product.tags",
      featured: "featured",
    },
    prepare: ({ title, featured }) => ({
      title: [featured ? "⭐️ " : "", `${title ?? `No product selected`}`].join(
        ` `,
      ),
    }),
  },
});
