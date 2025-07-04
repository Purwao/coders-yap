  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import AboutSection from "./components/About";
  import BlogPost from "./components/BlogPost";
  import { TAGS } from "./constant";
  import LenisProvider from "./providers/LenisProvider";
  import { getAllPostsMetadata } from "./providers/mdxProvider";
import HeaderClient from "./components/HeaderClient";
import Link from "next/link";
import SlideInCard from "./components/AnimatedCard2";

  export default function Home({searchTerm=""}) {
    const posts = getAllPostsMetadata();

    const filtered = searchTerm
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : posts;


    return (
      <LenisProvider>
      <div className="bg-[#030712] text-white min-h-screen flex flex-col">
          <HeaderClient posts={posts} />
        
        <main className="py-3 px-4 sm:px-8 flex-grow">
          <div className="max-w-5xl mx-auto flex flex-col gap-5">
            {/* HERO SECTION */}
            <SlideInCard>

            <section className="flex flex-col gap-0 text-start">
              <p className="text-[#9ca3af] text-xs uppercase">Blog</p>
              <div className="flex flex-col">
                <h2 className="text-3xl sm:text-5xl font-extrabold leading-snug">
                  Nerd rants from a not-so-quiet mind.
                </h2>
                <p className="text-base sm:text-lg text-[#9ca3af] max-w-2xl">
                  Welcome to{" "}
                  <span className="text-[#66b2ff] font-semibold">CodersYap</span>{" "}
                  — where thoughts on code, creativity, and chaos meet.
                </p>
              </div>
            </section>
            </SlideInCard>

            <hr className="border-t border-gray-800 border-2" />

            {/* TAGS FILTER */}
            <section className="flex flex-wrap gap-3 sm:gap-4">
              {TAGS.map((label, i) => (
                <Link
                href={`tags/${label.toLocaleLowerCase()}`}
                  key={label}
                  className={`px-6 py-2 rounded-3xl text-sm font-semibold transition ${
                    i === 0
                      ? "bg-[#66b2ff] text-[#030712] hover:bg-blue-400"
                      : "border border-[#9ca3af] text-[#9ca3af] hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </section>

            {/* BLOG GRID */}
          <section className="relative isolate overflow-hidden bg-[#030712] border border-gray-800 rounded-2xl px-3 py-6 sm:px-6 lg:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, index) => (
                <BlogPost key={post.slug} post={post} index={index} />
              ))}
            </div>
            {/* Optional: Add the gradient bottom effect from AboutSection if desired */}
            <div 
              className="absolute bottom-0 left-0 w-full h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(31,41,55,0.5),transparent)] pointer-events-none"
              aria-hidden
            />
          </section>

            <AboutSection />
          </div>
        </main>

        <Footer />
      </div>
      </LenisProvider>
    );
  }