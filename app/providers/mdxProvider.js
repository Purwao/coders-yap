import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from 'next/image'
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";

const postsDirectory = path.join(process.cwd(), "app", "posts");

export function getAllPostSlugs() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPostsMetadata() {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);

      console.log(data);

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title || "Untitled Post",
        date: data.date || null,
        tags: data.tags || [],
        description: data.description || "",
        author: data.author || "Anonymous",
        cover: data.cover || null,
      };
    });
}

export async function getPostBySlug(slug) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`); // cek apakah blog available
  if (!fs.existsSync(filePath)) return null; // 404 if not found

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);

  // Extract headings
  let headings = [];
  const extractHeadings = () => (tree) => {
    visit(tree, "heading", (node) => {
      const text = node.children.find((child) => child.type === "text")?.value;
      if (text) {
        headings.push({
          depth: node.depth,
          value: text,
          slug: text.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
        });
      }
    });
  };

  // Compile MDX with proper plugins
const { content: mdxContent } = await compileMDX({
  source: content,
  components: {
    Image 
  },
  options: {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [extractHeadings],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"],
            ariaHidden: true
          }
        }]
      ]
    }
  }
});

  return {
    frontMatter: data,
    mdxSource: mdxContent,
    slug,
    headings
  };
}

export function getAllTags() {
  const posts = getAllPostsMetadata();
  const tagSet = new Set();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet);
}

export function getPostsByTag(tag) {
  const posts = getAllPostsMetadata();
  return posts.filter((post) =>
    post.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

