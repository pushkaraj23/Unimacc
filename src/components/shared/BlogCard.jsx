import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const images =
    blog.imageurl && blog.imageurl.startsWith("[")
      ? JSON.parse(blog.imageurl)
      : [];

  const image = images.length ? images[0] : "/placeholder.jpg";

  const shortDesc =
    blog.description?.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

  return (
    <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:shadow-theme/20 transition-all duration-500 hover:-translate-y-1">
      {/* Image */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden">
        <img
          src={image}
          alt={blog.image_alt_text || blog.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60"></div>

        <div className="absolute bottom-3 left-4 text-white text-xs sm:text-sm font-medium">
          {new Date(blog.createdate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <h3 className="text-lg sm:text-xl font-semibold text-primary group-hover:text-theme transition-colors mb-2 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-sm sm:text-base text-primary/70 line-clamp-3 mb-5">
          {shortDesc}
        </p>

        <button
          onClick={() => navigate(`/blogs/${blog.id}`)}
          className="text-theme font-semibold text-sm sm:text-base hover:underline"
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
