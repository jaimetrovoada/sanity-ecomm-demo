import { Product } from "@/@types";
import ProductCard from "./productCard";

interface Props {
  products: Product[] | null;
}

const ProductList = ({ products }: Props) => {
  if (!products) {
    <div>
      <p>Nothing here yet...</p>
      <p>Stay Tuned!!!</p>
    </div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductCard key={product.slug.current} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
