import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/userApi";
import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created

const TrendingSection = () => {
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return (
    <section className="py-8">
      <ProductCarousel
        title="Trending Products"
        items={products}
        viewAllRoute="/trending"
      />
    </section>
  );
};

export default TrendingSection;
