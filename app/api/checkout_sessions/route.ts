import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { paymentSchema } from "@/lib/schemas";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = paymentSchema.parse(body);

    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      payment_method_types: ["card", "paypal"],
      line_items: data.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [item.image],
              metadata: {
                size: item.size,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      billing_address_collection: "auto",
      success_url: `${req.nextUrl.origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/store/checkout`,
    });

    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
