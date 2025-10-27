import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created
import { fetchProductsByCategory } from "../../api/userApi";
import { useQuery } from "@tanstack/react-query";

const CategoryTwo = () => {
  const {
    data: bathroomProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "Kitchen"],
    queryFn: () => fetchProductsByCategory("Kitchen"),
  });

  if (isLoading)
    return <p className="text-center py-10">Loading Bathroom products...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load products.</p>;
  return (
    <section className="py-8">
      <ProductCarousel
        title="Kitchen"
        items={bathroomProducts}
        viewAllRoute="products?category=Kitchen"
      />
    </section>
  );
};

export default CategoryTwo;
