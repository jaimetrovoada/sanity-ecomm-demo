import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { placeOrder } from "@/lib/queries";
import Link from "next/link";
import Stripe from "stripe";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16",
});
export default async function Page({ searchParams }: Props) {
  const { session_id } = searchParams;
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    String(session_id),
  );
  const customerDetails = checkoutSession.customer_details;
  const total = checkoutSession?.amount_total
    ? checkoutSession.amount_total / 100
    : 0;
  const lineItems = await stripe.checkout.sessions.listLineItems(
    checkoutSession.id,
  );
  const purchasedItems = lineItems.data.map((item) => ({
    name: item.description,
    price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
    quantity: item.quantity,
  }));
  console.log({ items: lineItems.data, price: lineItems.data[0].price });
  // await placeOrder(purchasedItems, total, {
  //   name: customerDetails?.name,
  //   email: customerDetails?.email,
  // });
  return (
    <Main className="flex h-full max-h-full flex-1 flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center gap-8 rounded-md bg-white p-10 text-center">
        <h1 className="text-6xl font-black text-gray-300 md:text-9xl">
          Success
        </h1>
        <p className="text-lg font-bold tracking-tight text-gray-700 md:text-4xl">
          Your order has been placed.
        </p>

        <Button className="inline-block" asChild>
          <Link href="/products">Go back</Link>
        </Button>
      </section>
    </Main>
  );
}
