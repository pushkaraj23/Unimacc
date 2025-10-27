import { useQuery } from "@tanstack/react-query";
import ProductCarousel from "../shared/ProductCarousel";
import { fetchProducts } from "../../api/userApi";

const TrendingSection = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // ✅ Filter premium products
  const featuredProducts = products.filter((item) => item.isfeatured);

  // ✅ Loading State
  if (isLoading) {
    return (
      <section className="py-10 flex justify-center items-center">
        <div className="animate-pulse text-gray-500 text-sm">
          Loading trending products...
        </div>
      </section>
    );
  }

  // ✅ Error State
  if (isError) {
    return (
      <section className="py-10 flex justify-center items-center">
        <p className="text-red-500 text-sm font-medium">
          ⚠️ Failed to load products. Please try again later.
        </p>
      </section>
    );
  }

  // ✅ Empty or Filtered-Out Case
  if (featuredProducts.length === 0) {
    return (
      <section className="py-10 flex justify-center items-center">
        <p className="text-gray-400 text-sm font-medium">
          No popular products available at the moment.
        </p>
      </section>
    );
  }

  // ✅ Main Section
  return (
    <section className="py-8">
      <ProductCarousel
        title="Trending Products"
        items={featuredProducts}
        viewAllRoute="/products"
      />
    </section>
  );
};

export default TrendingSection;

