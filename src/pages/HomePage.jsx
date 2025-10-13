import AdBanners from "../components/home/AdBanners";
import Banner from "../components/home/Banner";
import CategoryListing from "../components/home/CategoryListing";
import CategoryOne from "../components/home/CategoryOne";
import CategoryTwo from "../components/home/CategoryTwo";
import HeroSection from "../components/home/HeroSection";
import PopularSection from "../components/home/PopularSection";
import SalesSection from "../components/home/SalesSection";
import TrendingSection from "../components/home/TrendingSection";

const HomePage = () => {
  return (
    <div className="min-h-screen pt-28">
      <HeroSection />
      <SalesSection />
      <Banner />
      <TrendingSection />
      <PopularSection />
      <AdBanners />
      <CategoryOne />
      <CategoryTwo />
      <CategoryListing />
    </div>
  );
};

export default HomePage;
