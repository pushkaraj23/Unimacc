import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created
import { fetchProductsByCategory } from "../../api/userApi";
import { useQuery } from "@tanstack/react-query";

const CategoryOne = () => {
  const {
    data: bathroomProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "Bathroom"],
    queryFn: () => fetchProductsByCategory("Bathroom"),
  });

  if (isLoading)
    return <p className="text-center py-10">Loading Bathroom products...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load products.</p>;
  return (
    <section className="">
      <ProductCarousel
        title="Bathroom"
        items={bathroomProducts}
        viewAllRoute="products?category=Bathroom"
      />
    </section>
  );
};

export default CategoryOne;
