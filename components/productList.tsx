import { Product } from "@/@types";
import ProductCard from "./productCard";

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

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {finalProducts?.map((product) => (
        <ProductCard key={product.slug.current} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
