import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "../style/hero.css";
import { fetchHeroSectionContent } from "../../api/userApi";

const HeroSection = () => {
  const navigate = useNavigate();

  // ✅ Detect screen size for responsive image handling
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch data using React Query
  const {
    data: heroSlides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["heroSectionContent"],
    queryFn: fetchHeroSectionContent,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // ✅ Ensure at least 4 slides for proper looping visual balance
  const adjustedSlides = useMemo(() => {
    if (!heroSlides || heroSlides.length === 0) return [];
    if (heroSlides.length >= 4) return heroSlides;

    const duplicateCount = 4 - heroSlides.length;
    return [...heroSlides, ...heroSlides.slice(0, duplicateCount)];
  }, [heroSlides]);

  // Make sure currentIndex resets if slides change length
  useEffect(() => {
    if (adjustedSlides.length > 0) {
      setCurrentIndex(0);
    }
  }, [adjustedSlides.length]);

  const slideCount = adjustedSlides.length;

  // ✅ Autoplay (disabled on mobile)
  useEffect(() => {
    if (slideCount <= 1 || isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [slideCount, isMobile]);

  const goToNext = () => {
    if (slideCount === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  };

  const goToPrev = () => {
    if (slideCount === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  // For circular distance (coverflow layout)
  const getOffset = (index) => {
    if (slideCount === 0) return 0;
    let diff = index - currentIndex;
    const half = slideCount / 2;

    if (diff > half) diff -= slideCount;
    if (diff < -half) diff += slideCount;

    return diff;
  };

  if (isLoading)
    return (
      <div className="w-full h-[70vh] flex items-center justify-center text-gray-400">
        Loading hero section...
      </div>
    );

  if (isError || slideCount === 0)
    return (
      <div className="w-full h-[70vh] flex items-center justify-center text-red-400">
        Failed to load hero section.
      </div>
    );

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);

    if (touchStartX === null) return;

    const diff = touchStartX - e.changedTouches[0].clientX;

    // Threshold: minimum distance before we count it as a swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext(); // Swipe left → Next slide
      } else {
        goToPrev(); // Swipe right → Previous slide
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      {/* Glow shadow like before */}
      <div className="absolute bottom-5 max-sm:bottom-52 rounded-full bg-black/20 blur-3xl w-[80vw] h-[30vh]" />

      <div
        className="hero-swiper-wrapper w-full h-[60vh] max-sm:h-[56vh]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        {adjustedSlides.map((slide, index) => {
          const offset = getOffset(index); // -N ... 0 ... +N
          const absOffset = Math.abs(offset);

          // Tweak these to get the exact feel you like
          const translateX = offset * 260; // px shift left-right
          const rotateY = offset * -30; // deg rotation
          const scale = offset === 0 ? 1 : 0.8;
          const opacity = absOffset > 3 ? 0 : 1; // fade far slides
          const zIndex = 100 - absOffset; // center on top
          const brightness = offset === 0 ? 1 : 0.4;

          const imageSrc = isMobile
            ? slide.mobileImage || slide.contentimage
            : slide.contentimage;

          return (
            <div
              key={`${slide.id}-${index}`}
              className="hero-slide h-full w-[80vw]"
              style={{
                transform: `
    translate(-50%, -50%)
    translateX(${translateX}px)
    translateZ(${-absOffset * 120}px)
    rotateY(${rotateY}deg)
    scale(${scale})
  `,
                opacity,
                zIndex,
                filter: `brightness(${brightness})`,
              }}
              // onClick={() => navigate(`/offers/${slide.offer_id}`)}
            >
              <img
                src={imageSrc}
                alt={slide.title}
                className="object-contain h-full w-full"
              />
            </div>
          );
        })}

        {/* Navigation arrows */}
        {slideCount > 1 && (
          <>
            <button
              type="button"
              className="hero-nav hero-nav-left"
              onClick={goToPrev}
            >
              ‹
            </button>
            <button
              type="button"
              className="hero-nav hero-nav-right"
              onClick={goToNext}
            >
              ›
            </button>
          </>
        )}

        {/* Pagination dots */}
        {slideCount > 1 && (
          <div className="hero-pagination">
            {adjustedSlides.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  type="button"
                  className={`hero-bullet ${
                    isActive ? "hero-bullet-active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
