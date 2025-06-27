import { NAV_ITEMS } from "../constant";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#030712] px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 backdrop-blur-sm bg-opacity-90">
      {/* Logo */}
      <Link href="/" className="group flex items-center gap-2">
        <h1 className="text-xl font-bold text-[#66b2ff] group-hover:text-[#3a8cff] transition-colors">
          CodersYap
        </h1>
      </Link>

      {/* Search Bar - matches blog input styling */}
      <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 max-w-md">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full bg-[#111827] border border-gray-700 text-white text-sm rounded-md px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   placeholder:text-gray-500 transition-all"
        />
      </div>

      {/* Navigation - matches blog text colors */}
      <nav className="flex flex-wrap gap-6 text-sm">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-[#9ca3af] hover:text-white transition-colors
                      hover:underline underline-offset-4 decoration-[#66b2ff]"
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}