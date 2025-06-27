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

export async function getPostBySlug(slug) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

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