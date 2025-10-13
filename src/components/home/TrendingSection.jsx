import { FaPlay } from "react-icons/fa";
import ItemCard from "../shared/ItemCard";

const products = [
  {
    id: 1,
    title: "Luxury Rain Shower",
    subtitle: "Bathroom Series",
    images: [
      "https://images.unsplash.com/photo-1693841114632-bc1c2760bbfd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
      "https://images.unsplash.com/photo-1693841114567-0565c3f64edf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    ],
    price: 199,
    originalPrice: 249,
    discountPercent: 20,
    offerTime: "last 2hrs",
    isDiscountActive: true,
  },
  {
    id: 2,
    title: "Modern Kitchen Faucet",
    subtitle: "Kitchen Essentials",
    images: [
      "https://images.unsplash.com/photo-1672925216556-c995d23aab2e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1708",
      "https://images.unsplash.com/photo-1611864583067-b002fdc4fa29?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1752",
    ],
    price: 179,
    originalPrice: 229,
    discountPercent: 22,
    offerTime: "last 1hr",
    isDiscountActive: true,
  },
  {
    id: 3,
    title: "Ceramic Wash Basin",
    subtitle: "Bathroom Fixtures",
    images: [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=872",
      "https://images.unsplash.com/photo-1623072043183-6926804004f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
    ],
    price: 249,
    originalPrice: 299,
    discountPercent: 17,
    offerTime: "ends soon",
    isDiscountActive: true,
  },
  {
    id: 4,
    title: "Wall Mounted Mirror",
    subtitle: "Home Decor",
    images: [
      "https://plus.unsplash.com/premium_photo-1681711647035-58a0cbb87296?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=828",
      "https://plus.unsplash.com/premium_photo-1681702334647-9159c675dde1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
    ],
    price: 139,
    originalPrice: 189,
    discountPercent: 26,
    offerTime: "last 4hrs",
    isDiscountActive: true,
  },
  {
    id: 5,
    title: "Elegant Soap Dispenser",
    subtitle: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1705155726507-8e1b9119349b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
      "https://images.unsplash.com/photo-1705155726502-4d7eb6c300cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    ],
    price: 89,
    originalPrice: 119,
    discountPercent: 25,
    offerTime: "today only",
    isDiscountActive: true,
  },
  {
    id: 6,
    title: "Stainless Steel Drain Cover",
    subtitle: "Plumbing Parts",
    images: [
      "https://plus.unsplash.com/premium_photo-1684349306485-c2a1fd67002c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
      "https://plus.unsplash.com/premium_photo-1676968002189-e5a51c3adcfe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    ],
    price: 59,
    originalPrice: 79,
    discountPercent: 25,
    offerTime: "last 3hrs",
    isDiscountActive: true,
  },
  {
    id: 7,
    title: "Wall Shower Mixer",
    subtitle: "Bathroom Fittings",
    images: [
      "https://images.unsplash.com/photo-1625940119840-585d3495dc94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
    ],
    price: 229,
    originalPrice: 279,
    discountPercent: 18,
    offerTime: "ends in 1hr",
    isDiscountActive: true,
  },
  {
    id: 8,
    title: "Glass Shelf Rack",
    subtitle: "Bathroom Accessories",
    images: [
      "https://lifetimebath.in/wp-content/uploads/2021/05/He46a49e8f20f4535b6d3e9d1941fae14c.jpg",
      "https://m.media-amazon.com/images/I/71LKf8fNBXL._UF1000,1000_QL80_.jpg",
    ],
    price: 149,
    originalPrice: 189,
    discountPercent: 21,
    offerTime: "last 6hrs",
    isDiscountActive: true,
  },
];

const TrendingSection = () => {
  return (
    <div className="px-10 mt-20 mb-20">
      {/* --- Header Section --- */}
      <section className="border-b-2 border-primary/60 py-2 mb-5 flex pr-2 justify-between items-center">
        <h1 className="text-3xl text-primary font-normal">Trending Products</h1>
        <div className="flex gap-5">
          {/* {["85% off", "65% off", "50% off"].map((deal, i) => (
            <button
              key={i}
              className="px-5 py-3 hover:bg-theme/90 bg-theme/10 text-primary font-medium transition-all duration-200 rounded-lg hover:font-semibold"
            >
              {deal}
            </button>
          ))} */}
          <button className="flex items-center gap-2 text-primary font-medium hover:text-theme transition-all duration-200">
            View All
            <FaPlay className="text-sm" />
          </button>
        </div>
      </section>
      <section className="grid grid-cols-5 gap-4 mt-8 gap-y-6">
        {products.map((item, index) => (
          <ItemCard key={index} {...item} />
        ))}
      </section>
    </div>
  );
};

export default TrendingSection;
