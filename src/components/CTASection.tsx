import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full border-4 border-white" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full border-4 border-white" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to boost your search rankings?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-indigo-100">
              Join thousands of businesses using SchemaSpot to implement perfect schema markup. It's free and takes less than 60 seconds.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/generate"
                className="flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-sm font-semibold text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
              >
                Get Started Free
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <p className="mt-4 text-xs text-indigo-200">No sign-up required · Free forever · No credit card</p>
          </div>
        </div>
      </div>
    </section>
  );
}
