import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-light/60 via-white to-white" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light/60 px-3 py-1.5 text-xs font-medium text-primary sm:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Trusted by 5,000+ marketers
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Schema markup that{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                boosts your rankings
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                <path d="M1 5.5C47 2 93 2 139 3.5C185 5 253 6.5 299 3.5" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
              </svg>
            </span>
            <br />
            in seconds
          </h1>

          {/* Subheadline */}
          <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-muted sm:mt-6 sm:text-lg sm:leading-relaxed">
            Generate perfect JSON-LD schema markup for any business. No coding needed.&nbsp;
            <strong className="text-foreground">Boost CTR by up to 30%.</strong>&nbsp;
            Works with WordPress, Shopify, Wix, and more.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/generate"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
            >
              Generate Schema Free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-border bg-white px-6 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary-light/40 sm:w-auto"
            >
              See How It Works
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
            <div className="flex -space-x-2">
              {["bg-indigo-400", "bg-emerald-400", "bg-amber-400", "bg-rose-400"].map((color, i) => (
                <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white ${color}`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted">
              <span className="font-semibold text-foreground">4.9/5</span> from 500+ reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
