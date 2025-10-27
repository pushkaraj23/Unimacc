import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created
import { fetchRecommendedProducts } from "../../api/userApi";
import { useQuery } from "@tanstack/react-query";

const RecommendedProducts = ({ id }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recommendedProducts", id],
    queryFn: () => fetchRecommendedProducts(id),
    enabled: !!id,
  });
  if (isLoading) return <p>Loading related products...</p>;
  if (isError) return <p>Failed to load related products.</p>;
  return (
    <section className="py-8">
      <ProductCarousel
        title="Recommended Products"
        items={data}
        viewAllRoute="/recommended"
      />
    </section>
  );
};

export default RecommendedProducts;
