import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../api/userApi";
import BlogCard from "../components/shared/BlogCard";
import useSEO from "../utils/SEO";

const BlogsPage = () => {
  useSEO({
    title: "Blogs & Insights",
    description: "Explore expert insights, design inspiration, and product updates for home essentials, kitchen & bathroom products. Tips on home organization and storage solutions.",
    keywords: "home essentials blog, kitchen tips, bathroom organization, storage solutions, home decor",
    url: "/blogs",
  });
  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-24 text-center text-primary">
        <p className="text-lg animate-pulse">Loading blogs...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-24 text-center text-red-600">
        <p>Failed to load blogs. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="w-full px-6 sm:px-10 md:px-12 py-24 text-primary">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary">
          Blogs & Insights
        </h1>
        <div className="w-24 h-1 bg-theme mx-auto mt-4 rounded-full" />
        <p className="text-primary/70 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Explore expert insights, design inspiration, and product updates from
          the Unimacc team.
        </p>
      </div>

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogsPage;
