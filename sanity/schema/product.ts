import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [{ type: "image" }],
    }),
    defineField({
      title: "Tags",
      name: "tags",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    }),
    defineField({
      title: "Sizes",
      name: "sizes",
      type: "array",
      validation: (Rule) => Rule.required(),
      initialValue: ["one-size"],
      of: [
        {
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      brand: "brand.title",
    },
    prepare({ title, brand }) {
      return {
        title: title,
        subtitle: brand,
      };
    },
  },
});
