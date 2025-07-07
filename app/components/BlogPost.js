"use client";

import React from "react";
import Image from "next/image";
import AnimatedCard from "./AnimatedCard";
import Link from "next/link";

const BlogPost = React.memo(({ index, post }) => {
  const {
    slug,
    title,
    date,
    tags = [],
    description,
    author,
    cover,
  } = post;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatedCard key={`blog-post-${index}`}>
      <div
   
        className="group relative bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-md transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] transform-gpu hover:-translate-y-2 hover:scale-[1.1] hover:shadow-blue-500/30 hover:border-blue-500"
      >
        <Link    href={`/blog/${slug}`}>
        {/* Background Gradient */}
        <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 via-transparent to-[#0f172a]/80 opacity-80 group-hover:opacity-90 transition-opacity duration-700" />

        {/* Thumbnail */}
        <div className="overflow-hidden relative z-10">
          {cover && (
            <Image
              height={180}
              width={400}
              src={cover}
              loading="lazy"
              alt="Blog thumbnail"
              className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>

        {/* NEW Badge */}
        <div className="absolute top-0 right-5 z-20">
          <div
            className="relative h-16 group-hover:h-20 group-hover:pt-3 transition-all duration-700 ease-in-out w-7 text-white text-[10px] font-bold uppercase tracking-widest shadow-2xl flex flex-col items-center pt-1"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 50% 90%, 0 100%, 0 0)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500 to-blue-600" />
            <span className="relative z-10">N</span>
            <span className="relative z-10">E</span>
            <span className="relative z-10">W</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col gap-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#9ca3af] mb-1">
            <span>{formattedDate}</span>
            {tags.length > 0 && <span className="text-[#4b5563]">|</span>}
            {tags.map((tag) => (
              <Link 
                href={`/tags/${tag}`.toLocaleLowerCase()}
                key={tag}
                className="bg-[#374151] text-white px-2 py-0.5 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-300 hover:shadow-[0_0_8px_rgba(96,165,250,0.4)]"
              >
                {tag}
              </Link>
            ))}
          </div>

          <h3 className="text-base font-semibold text-white leading-snug transition-colors duration-300 group-hover:text-blue-400">
            {title}
          </h3>

          <p className="text-sm text-[#9ca3af]">{description}</p>

          {author && (
            <p className="text-sm text-[#9ca3af]">
              Author: <span className="text-white">{author}</span>
            </p>
          )}
        </div>
        </Link>
        
      </div>
    </AnimatedCard>
  );
});

BlogPost.displayName = "BlogPost";

export default BlogPost;
