import { NextResponse, NextRequest } from "next/server";
import { Order } from "@/@types";
import { nanoid } from "nanoid";
import { client } from "@/sanity/lib/client";
import { CartProduct } from "@/lib/cartReducer";

export async function POST(req: NextRequest, res: NextResponse) {
  const today = new Date();
  const date = today.toISOString();

  const id = nanoid(8);
  const key = nanoid(12);
  const body = await req.json();
  const {
    customer,
    total,
    items,
  }: {
    items: CartProduct[];
    total: number;
    customer: Order["customer"];
  } = body;

  const order: Order = {
    _type: "order",
    title: `${customer.name} - order_${id}`,
    slug: {
      _type: "slug",
      current: `order_${id}`,
    },
    total: total,
    items: items.map((item) => {
      return {
        title: item.name,
        quantity: item.quantity,
        _key: key,
        product: {
          _type: "reference",
          _ref: item.id,
        },
      };
    }),
    customer: customer,
    status: "pending",
    date: date,
  };
  try {
    const res = await client.create<Order>(order);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error }, { status: 500 });
  }
}
