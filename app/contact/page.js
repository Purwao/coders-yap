import { getAllPostsMetadata } from "../providers/mdxProvider";
import ContactClient from "../components/ContactClient";

export default function ContactWrapper() {
  const posts = getAllPostsMetadata();
  return <ContactClient posts={posts} />;
}