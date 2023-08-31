import { Product } from "@/@types";
import ProductCard from "./productCard";

interface Props {
  products: Product[] | null;
  category?: string;
  brand?: string;
}

const ProductList = ({ products, category, brand }: Props) => {
  const productsFromSelectedBrand = products?.filter((product) => {
    if (!brand) return true;
    return product.brand.slug.current === brand;
  });
  const filteredProducts = productsFromSelectedBrand?.filter((product) => {
    if (!category) return true;
    return product.tags.some((tag) => tag.slug.current === category);
  });

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts?.map((product) => (
        <ProductCard key={product.slug.current} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
