import * as z from "zod";

const itemSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  price: z.number(),
  quantity: z.number(),
  image: z.string().url(),
});
export const paymentSchema = z.object({
  items: z.array(itemSchema),
});
