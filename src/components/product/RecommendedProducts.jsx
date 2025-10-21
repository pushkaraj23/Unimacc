import products from "../../data.json"; // ← your product data file
import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created

const RecommendedProducts = () => {
  return (
    <section className="py-8">
      <ProductCarousel
        title="Recommended Products"
        items={products}
        viewAllRoute="/recommended"
      />
    </section>
  );
};

export default RecommendedProducts;
