import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created
import { fetchProductsByCategory } from "../../api/userApi";
import { useQuery } from "@tanstack/react-query";

const CategoryTwo = () => {
  const {
    data: kitchenproducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "Kitchen"],
    queryFn: () => fetchProductsByCategory("Kitchen"),
  });

  if (isLoading)
    return <p className="text-center py-10">Loading Kitchen products...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load products.</p>;
  return (
    <section className="">
      <ProductCarousel
        title="Kitchen"
        items={kitchenproducts}
        viewAllRoute="products?category=Kitchen"
      />
    </section>
  );
};

export default CategoryTwo;
