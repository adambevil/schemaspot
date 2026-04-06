import { useState } from "react";

const platformInstructions = [
  {
    id: "wordpress",
    label: "WordPress",
    instructions: [
      "Open your WordPress admin dashboard.",
      "Go to Appearance → Theme Editor (or use a child theme).",
      "Open the header.php file or install a plugin like 'Insert Headers and Footers'.",
      "Paste the generated schema code before the closing </head> tag.",
      'Alternatively, use a plugin like "WPCode" to add the script to your header.',
      "Click Save and verify using Google's Rich Results Test."
    ]
  },
  {
    id: "wix",
    label: "Wix",
    instructions: [
      "Go to your Wix dashboard and open the Editor.",
      "Click on Settings in the left sidebar.",
      "Scroll down to Advanced and click on Custom Code.",
      'Click Add Custom Code and select "Head".',
      "Paste your generated schema code in the code box.",
      'Set it to "Load code once per page" and click Apply.',
      "Publish your site to make changes live."
    ]
  },
  {
    id: "squarespace",
    label: "Squarespace",
    instructions: [
      "Log in to your Squarespace site.",
      "Go to Settings → Advanced → Code Injection.",
      "Paste your schema code in the Header field.",
      "Click Save at the top of the page.",
      "For specific pages only, go to that page's settings and use Page Header Code Injection.",
      "Verify with Google's Rich Results Test tool."
    ]
  },
  {
    id: "shopify",
    label: "Shopify",
    instructions: [
      "From your Shopify admin, go to Online Store → Themes.",
      "Click Actions → Edit code on your current theme.",
      "In the Layout folder, open theme.liquid.",
      "Paste your schema code before the closing </head> tag.",
      "Click Save.",
      'Alternatively, use the Shopify Schema Markup app from the Shopify App Store.',
      "Test your page with the Google Rich Results Test tool."
    ]
  }
];

const platformIcons: Record<string, string> = {
  wordpress: "🔵",
  wix: "🟣",
  squarespace: "⬛",
  shopify: "🟢"
};

export function PlatformInstructions() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {platformInstructions.map((platform, idx) => {
        const isOpen = openId === platform.id;
        const isLast = idx === platformInstructions.length - 1;
        return (
          <div
            key={platform.id}
            className={!isLast ? "border-b border-border" : ""}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : platform.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-card"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{platformIcons[platform.id]}</span>
                <span className="text-sm font-medium">{platform.label}</span>
              </div>
              <svg
                className={`h-4 w-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1">
                <ol className="space-y-2">
                  {platform.instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
