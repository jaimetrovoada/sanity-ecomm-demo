import { getProductBySlug } from "@/lib/queries";
import { ImageResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    let title = hasTitle ? searchParams.get("title")?.slice(0, 100) : null;

    const productSlug = searchParams.get("product");
    const res = productSlug ? await getProductBySlug(productSlug) : null;

    if (res) {
      if (!(res instanceof Error)) {
        title = res.title;
      }
    }

    const image = await fetch(
      new URL("../../../assets/images/og_bg.png", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            background: `url(data:image/png;base64,${Buffer.from(
              image,
            ).toString("base64")})`,
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
            display: "flex",
            padding: 64,
            fontSize: 64,
            fontStyle: "normal",
            color: "white",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {title ? (
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {title}
              </span>
            ) : null}
            <span
              style={{
                fontSize: title ? 32 : 64,
                fontWeight: title ? "bold" : "normal",
              }}
            >
              Oxygen Store
            </span>
          </div>
          {res ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 256,
                height: 256,
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <img
                style={{ objectFit: "cover" }}
                src={res.images[0].url}
                width="256"
                height="256"
                alt="product image"
              />
            </div>
          ) : null}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "noto",
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
