import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs, fetchBlogById } from "../api/userApi";
import { FaCalendarAlt, FaUserAlt, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogsDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // ✅ Fetch selected blog
  const {
    data: blog,
    isLoading: blogLoading,
    isError: blogError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  });

  // ✅ Fetch related blogs
  const { data: allBlogs = [], isLoading: relatedLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // ✅ Share functionality
  const handleShare = () => {
    const shareData = {
      title: blog?.title || "Unimacc Blog",
      text: "Check out this insightful article from Unimacc!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("🔗 Link copied to clipboard!");
    }
  };

  // ✅ Handle loading and error states
  if (blogLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-mute text-primary text-lg animate-pulse">
        Loading blog details...
      </div>
    );
  }

  if (blogError || !blog) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-mute text-red-600 text-lg">
        Failed to load blog details. Please try again later.
      </div>
    );
  }

  // ✅ Prepare image and date
  const images =
    blog.imageurl && blog.imageurl.startsWith("[")
      ? JSON.parse(blog.imageurl)
      : [];
  const image = images.length ? images[0] : "/placeholder.jpg";
  const formattedDate = new Date(blog.createdate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ✅ Filter related blogs (excluding current one)
  const relatedBlogs =
    allBlogs?.filter((b) => b.id !== blog.id)?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-mute text-primary pt-28 sm:pt-32 pb-20 px-6 sm:px-10 md:px-10">
      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
        {/* --- MAIN BLOG CONTENT --- */}
        <div className="flex-1">
          {/* Header Section */}
          <div className="text-center lg:text-left mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary leading-snug">
                {blog.title}
              </h1>

              {/* Inline Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 self-center lg:self-auto text-theme font-medium bg-white/80 border border-theme/30 px-4 py-2 rounded-full hover:bg-theme hover:text-white transition-all duration-300"
              >
                <FaShareAlt />
                <span className="text-sm sm:text-base">Share</span>
              </button>
            </div>

            <div className="flex justify-center lg:justify-start items-center gap-4 text-primary/70 text-sm sm:text-base mt-3">
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-theme" /> {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <FaUserAlt className="text-theme" /> By Team Unimacc
              </span>
            </div>
          </div>

          {/* Blog Hero Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-12 relative">
            <img
              src={image}
              alt={blog.image_alt_text || blog.title}
              className="w-full h-[50vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Blog Description (preserve all editor styling) */}
          <article
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* Share Section (Mobile) */}
          <div className="lg:hidden mt-12 flex justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-theme font-medium bg-white/70 border border-theme/30 px-5 py-2 rounded-full hover:bg-theme hover:text-white transition-all duration-300"
            >
              <FaShareAlt /> <span>Share this article</span>
            </button>
          </div>
        </div>

        {/* --- SIDEBAR: Related Blogs --- */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-5 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-6 border-b border-primary pb-2">
              Related Articles
            </h3>

            {relatedLoading ? (
              <p className="text-primary/70 text-sm animate-pulse">
                Loading related blogs...
              </p>
            ) : (
              <div className="space-y-6">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((b, index) => {
                    const imgs =
                      b.imageurl && b.imageurl.startsWith("[")
                        ? JSON.parse(b.imageurl)
                        : [];
                    const img = imgs.length ? imgs[0] : "/placeholder.jpg";
                    return (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start gap-3 cursor-pointer hover:scale-[1.02] transition-all duration-300"
                        onClick={() => navigate(`/blogs/${b.id}`)}
                      >
                        <img
                          src={img}
                          alt={b.image_alt_text || b.title}
                          className="w-full sm:w-24 lg:w-full h-32 sm:h-20 lg:h-32 object-cover rounded-lg shadow-sm"
                        />
                        <h4 className="font-medium text-primary text-center sm:text-left hover:text-theme transition-colors text-sm sm:text-base">
                          {b.title}
                        </h4>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-primary/60 text-sm">
                    No related blogs found.
                  </p>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Unimacc. All Rights Reserved.
      </div>
    </div>
  );
};

export default BlogsDetailed;
