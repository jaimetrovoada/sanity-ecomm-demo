import { Product } from "@/@types";
import ProductCard from "./productCard";

interface Props {
  products: Product[] | null;
}

const ProductList = ({ products }: Props) => {
  if (!products) {
    return (
      <div>
        <p>Nothing here yet...</p>
        <p>Stay Tuned!!!</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.slug.current} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
