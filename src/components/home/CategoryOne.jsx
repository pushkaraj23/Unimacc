import products from "../../data.json"; // ← your product data file
import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created

const CategoryOne = () => {
  return (
    <section className="py-8">
      <ProductCarousel
        title="Faucets"
        items={products}
        viewAllRoute="/faucets"
      />
    </section>
  );
};

export default CategoryOne;
