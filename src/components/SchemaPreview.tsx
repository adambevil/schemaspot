export function SchemaPreview({
  title,
  description,
  siteName,
  url,
  schemaType,
}: {
  title?: string;
  description?: string;
  siteName?: string;
  url?: string;
  schemaType: string;
}) {
  const displayTitle = title || "Your Business Name — Page Title Here";
  const displayUrl = url || "https://yourwebsite.com/page";
  const displaySiteName = siteName || "Your Site";
  const displayDesc =
    description ||
    "This is how your page will appear in Google search results with schema markup applied. Rich snippets attract more clicks.";

  // FAQ rich result preview
  if (schemaType === "FAQPage" || schemaType === "FAQ") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="mb-0.5 truncate text-xs text-gray-500">{displayUrl}</p>
        <h3 className="cursor-default text-xl font-normal leading-snug text-[#1a0dab] hover:underline">
          {displayTitle}
        </h3>
        <div className="mt-3 space-y-3">
          <details open className="text-sm">
            <summary className="cursor-pointer font-medium text-[#4b11a8]">
              What services does your business offer?
            </summary>
            <p className="mt-1.5 ml-4 leading-relaxed text-gray-600">
              {displayDesc}
            </p>
          </details>
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-[#4b11a8]">
              What are your business hours?
            </summary>
            <p className="mt-1.5 ml-4 leading-relaxed text-gray-600">
              We are open Monday through Friday from 9am to 6pm, and Saturday from 10am to 4pm.
            </p>
          </details>
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-[#4b11a8]">
              How can I contact you?
            </summary>
            <p className="mt-1.5 ml-4 leading-relaxed text-gray-600">
              Call us at (555) 123-4567 or send an email to hello@yourbusiness.com.
            </p>
          </details>
        </div>
      </div>
    );
  }

  // Product rich result preview
  if (schemaType === "Product") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="mb-0.5 truncate text-xs text-gray-500">{displayUrl}</p>
        <h3 className="cursor-default text-xl font-normal leading-snug text-[#1a0dab] hover:underline">
          {displayTitle}
        </h3>
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="h-4 w-4 text-[#ea4335]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">4.9 · 247 reviews</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[#202124]">
          <span className="font-semibold text-green-700">$29.99</span>{" "}
          <span className="line-through text-gray-400">$49.99</span>{" "}
          <span className="text-sm text-gray-500">· In Stock</span>
        </p>
      </div>
    );
  }

  // Local Business
  if (schemaType === "LocalBusiness" || schemaType === "localbusiness") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="mb-0.5 truncate text-xs text-gray-500">{displayUrl}</p>
        <h3 className="cursor-default text-xl font-normal leading-snug text-[#1a0dab] hover:underline">
          {displayTitle}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span>{displaySiteName || "Local Business"}</span>
          <span>·</span>
          <span className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="ml-1 text-gray-500">5.0</span>
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{displayDesc}</p>
      </div>
    );
  }

  // Article
  if (schemaType === "Article" || schemaType === "article") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="mb-0.5 truncate text-xs text-gray-500">{displayUrl}</p>
        <h3 className="cursor-default text-xl font-normal leading-snug text-[#1a0dab] hover:underline">
          {displayTitle}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span>{displaySiteName || "Author Name"}</span>
          <span>·</span>
          <span>
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{displayDesc}</p>
      </div>
    );
  }

  // Event
  if (schemaType === "Event" || schemaType === "event") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="mb-0.5 truncate text-xs text-gray-500">{displayUrl}</p>
        <h3 className="cursor-default text-xl font-normal leading-snug text-[#1a0dab] hover:underline">
          {displayTitle}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Jun 15, 2025 · 7:00 PM
          </span>
          <span>·</span>
          <span>{displaySiteName || "Venue Name"}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{displayDesc}</p>
      </div>
    );
  }

  // Default / fallback
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="mb-0.5 truncate text-xs text-gray-500">{displayUrl}</p>
      <h3 className="cursor-default text-xl font-normal leading-snug text-[#1a0dab] hover:underline">
        {displayTitle}
      </h3>
      <p className="mt-1.5 text-sm text-gray-500">{displaySiteName}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{displayDesc}</p>
    </div>
  );
}
