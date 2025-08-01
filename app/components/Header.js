import Link from "next/link";
import { NAV_ITEMS, NAV_LINKS } from "../constant";
import Image from "next/image";

export default function Header({
  input,
  setInput,
  filters,
  filteredPosts,
  showResults,
  setShowResults,
  removeFilter,
  handleResultClick
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#030712] px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 backdrop-blur-sm bg-opacity-90">
      {/* Logo */}
      <Link href="/" className="group flex items-center gap-2">
        <Image
            src="/codersyap.webp"
            width={50}
            height={50}
            alt="codersyap"
        />
        <h1 className="text-xl font-bold text-[#66b2ff] group-hover:text-[#3a8cff] transition-colors">
          CodersYap
        </h1>
      </Link>

      {/* Search Bar with Results */}
      <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 max-w-md relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder="Search posts... (e.g. tag:frontend react)"
          className="min-w-80 bg-[#111827] border border-gray-700 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 transition-all"
        />

        {/* Active Filter Badges */}
        <div className="mt-2 flex flex-wrap gap-2">
          {filters.map((tag) => (
            <span
              key={tag}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              tag:{tag}
              <button
                onClick={() => removeFilter(tag)}
                className="ml-1 hover:text-red-300"
              >
                ✖
              </button>
            </span>
          ))}
        </div>

        {/* Search Results Dropdown */}
        {showResults && (input || filters.length > 0) && (
          <div className="absolute z-50 mt-1 w-full bg-[#111827] border border-gray-700 rounded-md shadow-lg max-h-96 overflow-y-auto">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  onClick={handleResultClick}
                >
                  <div className="font-medium">{post.title}</div>
                  {post.description && (
                    <div className="text-xs text-gray-500 truncate">
                      {post.description}
                    </div>
                  )}
                  {post.tags && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-700 text-blue-300 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No posts found matching your criteria
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap gap-6 text-sm">
        {NAV_ITEMS.map((item,index) => (
          <Link
            key={item}
            href={`/${NAV_LINKS[index]}`}
            className="text-[#9ca3af] hover:text-white transition-colors hover:underline underline-offset-4 decoration-[#66b2ff]"
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}