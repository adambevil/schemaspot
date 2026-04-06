import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">
            <span className="text-blue-600">Schema</span>Spot
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Free</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="/generate" className="text-gray-600 hover:text-gray-900 transition">Generator</Link>
          <a href="https://github.com/adambevil" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">About</a>
        </nav>
      </div>
    </header>
  );
}
