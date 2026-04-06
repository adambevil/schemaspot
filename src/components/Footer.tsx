export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} SchemaSpot &mdash; Free JSON-LD Schema Markup Generator</p>
        <p className="mt-1 text-xs text-gray-500">Generate valid structured data for better search engine visibility.</p>
      </div>
    </footer>
  );
}
