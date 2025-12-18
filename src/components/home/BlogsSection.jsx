import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchBlogs } from "../../api/userApi";
import BlogCard from "../shared/BlogCard";

const BlogsSection = () => {
  const navigate = useNavigate();
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
  const visibleBlogs = blogs.slice(0, limit);
  const shouldShowButton = blogs.length > limit;

  return (
    <section className="relative w-full text-primary pb-14 px-6 sm:px-10 md:px-10">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
        {visibleBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* --- View More Button (Navigate to /blogs) --- */}
      {shouldShowButton && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/blogs")}
            className="bg-theme text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-theme/90 transition-all"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogsSection;
