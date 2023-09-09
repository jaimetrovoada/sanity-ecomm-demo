"use client";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import { Image as TImage } from "@/@types";

type Props = {
  image: TImage;
  alt: string;
  priority?: boolean;
};
const ProductImage = ({ image, alt, priority = false }: Props) => {
  const imageProps = useNextSanityImage(client, image);

  return (
    <AspectRatio className="bg-muted">
      <Image
        src={imageProps.src}
        alt={alt}
        loader={imageProps.loader}
        fill
        sizes="(max-width: 800px) 100vw, 800px"
        placeholder="blur"
        className="rounded-md object-cover object-center"
        blurDataURL={image.asset.metadata.lqip}
        priority={priority}
      />
    </AspectRatio>
  );
};

export default ProductImage;
