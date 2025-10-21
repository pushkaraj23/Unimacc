import products from "../../data.json"; // ← your product data file
import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created

const PopularSection = () => {
  // Optionally, filter or sort popular products
  const popularProducts = products.filter(
    (p) => p.isPopular || p.isDiscountActive // sample logic
  );

  return (
    <section className="py-8">
      <ProductCarousel
        title="Popular Products"
        items={popularProducts}
        viewAllRoute="/products"
      />
    </section>
  );
};

export default PopularSection;
