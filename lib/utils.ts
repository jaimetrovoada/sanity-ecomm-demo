import { client } from "@/sanity/lib/client";
import { type ClassValue, clsx } from "clsx";
import { groq } from "next-sanity";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function createOrderId(): Promise<string> {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );

  // Count the number of orders made today
  const count = await client.fetch(
    groq`count(*[_type == "order" && (date >= '${startDate.toISOString()}') && (date <= '${endDate.toISOString()}')])`,
  );
  // Generate the order ID based on the date and order count
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const orderCount = (count + 1).toString().padStart(4, "0");

  const orderId = `${year}${month}${day}-${orderCount}`;

  return orderId;
}
