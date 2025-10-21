import products from "../../data.json"; // ← your product data file
import ProductCarousel from "../shared/ProductCarousel"; // ← reusable component we created

const CategoryTwo = () => {
  return (
    <section className="py-8">
      <ProductCarousel
        title="Showerheads"
        items={products}
        viewAllRoute="/shower"
      />
    </section>
  );
};

export default CategoryTwo;
