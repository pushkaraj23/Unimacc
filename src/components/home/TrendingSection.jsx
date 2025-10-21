import products from "../../data.json"; // ← your product data file
import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created

const TrendingSection = () => {
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
