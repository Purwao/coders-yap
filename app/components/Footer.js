import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 py-10 text-sm text-[#6b7280]">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between gap-6">
        {/* Left side: site title & tagline */}
        <div>
          <h2 className="text-white text-lg font-semibold">CodersYap</h2>
          <p className="mt-1 text-gray-500">Nerd rants from a not-so-quiet mind.</p>
          <p className="mt-2 text-gray-600">© {new Date().getFullYear()} CodersYap. All rights reserved.</p>
        </div>

        {/* Right side: navigation and social */}
        <div className="flex flex-col sm:flex-row gap-8">
          <div>
            <h3 className="text-white font-medium mb-2">Site</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/posts" className="hover:text-white">Posts</Link></li>
              <li><Link href="/tags" className="hover:text-white">Tags</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">Social</h3>
            <ul className="space-y-1">
              <li><Link href="https://github.com/Purwao" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</Link></li>
              <li><Link href="mailto:your@email.com" className="hover:text-white">Email</Link></li>
              <li><Link href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-white">X (Twitter)</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-600">
        Built with ❤️ & ☕ by Purwao
      </div>
    </footer>
  );
}
