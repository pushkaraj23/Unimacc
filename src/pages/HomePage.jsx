import AdBanners from "../components/home/AdBanners";
import AwardsSection from "../components/home/AwardsSection";
import Banner from "../components/home/Banner";
import Bestsellers from "../components/home/Bestsellers";
import CategoryListing from "../components/home/CategoryListing";
import CategoryOne from "../components/home/CategoryOne";
import CategoryTwo from "../components/home/CategoryTwo";
import HeroSection from "../components/home/HeroSection";
import PopularSection from "../components/home/PopularSection";
import SalesSection from "../components/home/SalesSection";
import TrendingSection from "../components/home/TrendingSection";
import ServiceBanner from "../components/shared/ServiceBanner";
import VideoSection from "../components/home/VideoSection";
import BlogsSection from "../components/home/BlogsSection";

const HomePage = () => {
  return (
    <div className="min-h-screen pt-28 max-sm:pt-24 w-full overflow-x-hidden">
      <HeroSection />
      <SalesSection />
      <Banner />
      <TrendingSection />
      <AwardsSection />
      <ServiceBanner />
      <div className="h-10" />
      <PopularSection />
      <AdBanners />
      <CategoryOne />
      {/* <Bestsellers /> */}
      <VideoSection />
      <CategoryTwo />
      <CategoryListing />
      <BlogsSection />
    </div>
  );
};

export default HomePage;
