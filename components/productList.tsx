import { Product } from "@/@types";

interface Props {
  products: Product[] | null;
  category?: string;
  brand?: string;
}

const ProductList = ({ products, category, brand }: Props) => {
  const filteredProducts = products?.filter(
    (product) =>
      product.brand.slug.current === brand ||
      product.tags.some((tag) => tag.slug.current === category),
  );

  const finalProducts =
    filteredProducts && filteredProducts.length > 0
      ? filteredProducts
      : products;

  console.log({ filteredProducts });
  return (
    <div>
      {finalProducts?.map((product) => (
        <div key={product.slug.current}>{product.title}</div>
      ))}
    </div>
  );
};

export default ProductList;
