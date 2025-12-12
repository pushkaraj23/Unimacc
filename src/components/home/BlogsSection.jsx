import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchBlogs } from "../../api/userApi";

const BlogsSection = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ Detect screen size for responsive limit
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch blogs dynamically using React Query
  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // ✅ Loading state
  if (isLoading) {
    return (
      <section className="py-24 text-center text-primary">
        <p className="text-lg animate-pulse">Loading blogs...</p>
      </section>
    );
  }

  // ✅ Error state
  if (isError) {
    return (
      <section className="py-24 text-center text-red-600">
        <p>Failed to load blogs. Please try again later.</p>
      </section>
    );
  }

  // ✅ Determine how many blogs to show
  const limit = isMobile ? 3 : 6;
  const visibleBlogs = showAll ? blogs : blogs.slice(0, limit);
  const shouldShowButton = blogs.length > limit;

  return (
    <section className="relative w-full text-primary py-20 px-6 sm:px-10 md:px-10">
      {/* --- Header --- */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-primary">
          Blogs & Insights
        </h2>
        <div className="w-24 h-1 bg-theme mx-auto mt-4 rounded-full"></div>
        <p className="text-primary/70 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Expert tips, design inspiration, and product insights from Unimacc’s
          innovation team.
        </p>
      </div>

      {/* --- Blog Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 relative z-10 transition-all duration-500">
        {visibleBlogs.map((blog) => {
          const images =
            blog.imageurl && blog.imageurl.startsWith("[")
              ? JSON.parse(blog.imageurl)
              : [];
          const image = images.length ? images[0] : "/placeholder.jpg";
          const shortDesc =
            blog.description?.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

          return (
            <div
              key={blog.id}
              className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:shadow-theme/20 transition-all duration-500 hover:-translate-y-1"
            >
              {/* --- Image --- */}
              <div className="relative w-full h-56 sm:h-64 overflow-hidden">
                <img
                  src={image}
                  alt={blog.image_alt_text || blog.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-70 transition-all"></div>
                <div className="absolute bottom-3 left-4 text-white text-xs sm:text-sm font-medium">
                  {new Date(blog.createdate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* --- Content --- */}
              <div className="p-6 sm:p-7">
                <h3 className="text-lg sm:text-xl font-semibold text-primary group-hover:text-theme transition-colors mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm sm:text-base text-primary/70 line-clamp-3 mb-5">
                  {shortDesc}
                </p>
                <button
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  className="text-theme font-semibold text-sm sm:text-base flex items-center gap-2 hover:underline"
                >
                  Read More →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- View More / View Less Button --- */}
      {shouldShowButton && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-theme text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-theme/90 transition-all"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}

      {/* --- Animated Shine Overlay --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-150%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform rotate-12 animate-[shine_6s_infinite]"></div>
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -150%; }
          50% { left: 150%; }
          100% { left: 150%; }
        }
      `}</style>
    </section>
  );
};

export default BlogsSection;
