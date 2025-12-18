import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHeroSectionContent } from "../../api/userApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: slides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["heroSectionContent"],
    queryFn: fetchHeroSectionContent,
    staleTime: 5 * 60 * 1000,
  });

  /* ---------- Autoplay (desktop only) ---------- */
  useEffect(() => {
    if (slides.length <= 1 || isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isMobile]);

  /* ---------- Swipe handlers ---------- */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
        Loading...
      </div>
    );

  if (isError || slides.length === 0)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-400">
        Failed to load hero
      </div>
    );

  return (
    <div
      className="relative w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const imageSrc = isMobile
          ? slide.mobileImage || slide.contentimage
          : slide.contentimage;

        const isActive = index === currentIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out
              ${
                isActive
                  ? "opacity-100 translate-x-0 relative"
                  : "opacity-0 translate-x-4"
              }
            `}
          >
            <img
              src={imageSrc}
              alt={slide.title}
              className="w-full h-auto object-cover select-none"
              draggable={false}
            />
          </div>
        );
      })}

      {/* Desktop arrows */}
      {slides.length > 1 && !isMobile && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 
              bg-black/30 hover:bg-black/50 text-white 
              rounded-full p-2 transition backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 
              bg-black/30 hover:bg-black/50 text-white 
              rounded-full p-2 transition backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Pagination dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition
                ${index === currentIndex ? "bg-white" : "bg-white/40"}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
