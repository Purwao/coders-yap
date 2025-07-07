import Link from "next/link";
import Image from "next/image";
import { getAllPostsMetadata, getAllTags, getPostsByTag } from "@/app/providers/mdxProvider";
import BlogPost from "@/app/components/BlogPost";


export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default function TagPage({ params }) {
  const { tag } = params;
  let posts;

  if (tag == "all") {
    posts=getAllPostsMetadata();
  }else{
    posts=getPostsByTag(tag);
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-white text-center">
        <h1 className="text-3xl font-bold mb-4">No posts found for #{tag}</h1>
        <Link href="/" className="text-sky-400 hover:underline">
          ← Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-white">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-2 capitalize">#{tag}</h1>
        <p className="text-gray-400">
          Showing all posts tagged with{" "}
          <span className="text-sky-400 font-medium">{tag}</span>
        </p>
        <Link href="/" className="mt-4 inline-block text-sm text-sky-400 hover:underline">
          ← Back to all posts
        </Link>
      </section>

      {/* Posts Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {posts.map((post, index) => (
                <BlogPost key={post.slug} post={post} index={index} />
              ))}
      </section>
    </main>
  );
}
