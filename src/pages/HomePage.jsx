import AdBanners from "../components/home/AdBanners";
import AwardsSection from "../components/home/AwardsSection";
import Banner from "../components/home/Banner";
import Bestsellers from "../components/home/Bestsellers";
import CategoryBanners from "../components/home/CategoryBanners";
import CategoryOne from "../components/home/CategoryOne";
import CategoryTwo from "../components/home/CategoryTwo";
import HeroSection from "../components/home/HeroSection";
import PopularSection from "../components/home/PopularSection";
import SalesSection from "../components/home/SalesSection";
import TrendingSection from "../components/home/TrendingSection";
import ServiceBanner from "../components/shared/ServiceBanner";
import VideoSection from "../components/home/VideoSection";
import BlogsSection from "../components/home/BlogsSection";
import CategoryListing from "../components/home/CategoryListing";
import FindUsOn from "../components/shared/FindUsOn";
import WatchVideos from "../components/home/InfluencerVideoSection";

const HomePage = () => {
  return (
    <div className="min-h-screen pt-16 max-sm:pt-18 w-full overflow-x-hidden">
      <HeroSection />
      <ServiceBanner />
      <WatchVideos />
      <SalesSection />
      <Banner />
      <CategoryListing />
      <TrendingSection />
      <AdBanners />
      <div className="h-10" />
      <PopularSection />
      {/* <CategoryOne /> */}
      {/* <Bestsellers /> */}
      {/* <CategoryTwo /> */}
      <CategoryBanners />
      <VideoSection />
      <AwardsSection />
      <BlogsSection />
      <FindUsOn />
    </div>
  );
};

export default HomePage;
