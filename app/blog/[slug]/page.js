import Footer from "@/app/components/Footer";
import {
  getAllPostsMetadata,
  getPostBySlug,
} from "../../providers/mdxProvider";
import { notFound } from "next/navigation";
import CalendarIcon from "@/app/components/CalendarIcon";
import ClockIcon from "@/app/components/ClockIcon";
import TagIcon from "@/app/components/TagIcon";
import Bars3Icon from "@/app/components/Bars3Icon";
import ChevronDownIcon from "@/app/components/ChevronDownIcon";
import DocumentTextIcon from "@/app/components/DocumentTetIcon";
import InformationCircleIcon from "@/app/components/InformationCircleIcon";
import LenisProvider from "../../providers/LenisProvider";
import HeaderClient from "@/app/components/HeaderClient";
import CommentSection from "@/app/components/CommentSection";
import NewsletterModal from "@/app/components/NewletterModal";



export async function generateStaticParams() {
  const { getAllPostSlugs } = await import("../../providers/mdxProvider");
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) return {};

  return {
    title: post.frontMatter.title,
    description: post.frontMatter.description ?? "Read this article on CodersYap.",


    authors: [{ name: post.frontMatter.author }],
    openGraph: {
      title: post.frontMatter.title,
      type: "article",
      publishedTime: post.frontMatter.date,
      url: `https://codersyap.vercel.app/blog/${params.slug}`,
      images: [
        {
          url: post.frontMatter.cover ?? "https://codersyap.vercel.app/codersyap.webp",
          width: 1200,
          height: 630,
          alt: post.frontMatter.cover ?? "https://codersyap.vercel.app/codersyap.webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontMatter.title,
      description: post.frontMatter.description ?? "Read this article on CodersYap.",

      images: [post.frontMatter.cover ?? "https://codersyap.vercel.app/codersyap.webp"],
    },
  };
}


export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const posts = getAllPostsMetadata();

  return (
    <LenisProvider>
      <div className="bg-[#030712] text-white min-h-screen flex flex-col">
        <HeaderClient posts={posts} />
        <NewsletterModal></NewsletterModal>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-grow w-full">
          {/* Enhanced animated header section */}

          <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-2xl p-8 sm:p-10 mb-12 backdrop-blur-sm">
            <h1 className="text-4xl sm:text-5xl leading-tight mb-4 text-white font-extrabold ">
              {post.frontMatter?.title || "Untitled Post"}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-base text-gray-400">
              {post.frontMatter?.date && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-400" />
                  <time dateTime={post.frontMatter.date}>
                    {new Date(
                      post.frontMatter.date.toString()
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              )}
              <span className="text-gray-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                {post.frontMatter?.date && (
                  <div className="flex items-center gap-3">

                    <ClockIcon className="h-5 w-5 flex-shrink-0 text-blue-400" />

                    <span>{post.frontMatter.readtime}</span>
                  </div>

                )}
              </div>
              {post.frontMatter?.tags && (
                <>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <div className="flex items-center gap-2">
                    <TagIcon className="h-5 w-5 text-blue-400" />
                    <div className="flex flex-wrap gap-2">
                      {post.frontMatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-800/50 px-2.5 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Main content with sidebar layout */}
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Article content */}
            <div className="flex-1 min-w-0">
              {/* Mobile TOC - enhanced */}
              {post.headings?.length > 0 && (
                <details className="md:hidden mb-8 group">
                  <summary className="flex items-center justify-between px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-900/70 transition-colors">
                    <div className="flex items-center gap-3">
                      <Bars3Icon className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">Table of Contents</span>
                    </div>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400 transform transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="mt-2 px-4 py-3 bg-gray-900/30 border border-gray-800 rounded-lg">
                    <ul className="space-y-2.5">
                      {post.headings
                        .filter((heading) => heading.depth <= 3)
                        .map((heading) => (
                          <li key={`mobile-${heading.slug}`}>
                            <a
                              href={`#${heading.slug}`}
                              className={`flex items-center py-1.5 hover:text-blue-400 transition-colors ${heading.depth === 3
                                  ? "pl-6"
                                  : heading.depth === 2
                                    ? "pl-3"
                                    : ""
                                }`}
                            >
                              <span
                                className={`inline-block w-1.5 h-1.5 rounded-full mr-3 ${heading.depth === 1
                                    ? "bg-blue-500"
                                    : heading.depth === 2
                                      ? "bg-blue-400"
                                      : "bg-blue-300"
                                  }`}
                              ></span>
                              {heading.value}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </details>
              )}

              {/* Article body with enhanced prose styling */}
              <div className="bg-gradient-to-br from-gray-900/40 to-gray-900/10 border border-gray-800 rounded-xl px-8 sm:px-10 backdrop-blur-sm">
                <div className="prose prose-invert prose-headings:no-underline max-w-none">
                  {post.mdxSource ? (
                    post.mdxSource
                  ) : (
                    <div className="text-center py-12">
                      <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-500" />
                      <p className="mt-4 text-lg text-gray-400">
                        No content available
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* <CommentSection></CommentSection> */}

            </div>

            {/* Desktop TOC - enhanced */}
            {post.headings?.length > 0 && (
              <aside className="hidden md:block w-64  flex-shrink-0">
                <div className="sticky top-24 space-y-4">
                  <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm">
                    <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                      <Bars3Icon className="h-5 w-5 text-blue-400" />
                      <span>Contents</span>
                    </h2>
                    <ul className="space-y-2 border-l border-gray-700 pl-3">
                      {post.headings
                        .filter((heading) => heading.depth <= 3)
                        .map((heading) => (
                          <li key={heading.slug}>
                            <a
                              href={`#${heading.slug}`}
                              className={`flex items-center py-1.5 hover:text-blue-400 transition-colors ${heading.depth === 3
                                  ? "pl-6"
                                  : heading.depth === 2
                                    ? "pl-3"
                                    : ""
                                }`}
                            >
                              <span
                                className={`inline-block w-1.5 h-1.5 rounded-full mr-3 ${heading.depth === 1
                                    ? "bg-blue-500"
                                    : heading.depth === 2
                                      ? "bg-blue-400"
                                      : "bg-blue-300"
                                  }`}
                              ></span>
                              {heading.value}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Additional metadata box */}
                  <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm">
                    <h3 className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-300">
                      <InformationCircleIcon className="h-5 w-5 text-blue-400" />
                      <span>Article Info</span>
                    </h3>
                    <div className="space-y-3 text-sm text-gray-400">
                      {post.frontMatter?.date && (
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                          <time dateTime={post.frontMatter.date}>
                            {new Date(
                              post.frontMatter.date.toString()
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        {post.frontMatter?.date && (
                          <div className="flex items-center gap-3">

                            <ClockIcon className="h-4 w-4 flex-shrink-0" />

                            <span>{post.frontMatter.readtime}</span>
                          </div>

                        )}
                      </div>
                      {post.frontMatter?.tags && (
                        <div className="flex items-start gap-3">
                          <TagIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <div className="flex flex-wrap gap-2">
                            {post.frontMatter.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-gray-800/50 px-2 py-1 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </article>
        {/* Comment section (full width) */}
        <section className="w-full px-4 sm:px-6 py-12 bg-[#0f172a] border-t border-gray-800">
          <div className="max-w-5xl mx-auto">

            <CommentSection />
          </div>
        </section>
        <Footer />
      </div>
    </LenisProvider>
  );
}
