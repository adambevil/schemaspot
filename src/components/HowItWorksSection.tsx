const steps = [
  { num: "1", title: "Select a schema type", desc: "Choose the schema type that matches your business or content." },
  { num: "2", title: "Enter your details", desc: "Fill in the fields — we only ask for what's needed." },
  { num: "3", title: "Preview & install", desc: "Preview your rich result and get install instructions." }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
          <p className="mt-3 text-muted">Three simple steps to better search visibility.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white">
                {s.num}
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              {i < 2 && (
                <div className="mt-6 hidden sm:block absolute top-7 -right-4 text-primary/30">
                  <svg className="h-4 w-8" viewBox="0 0 32 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 8h26m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
