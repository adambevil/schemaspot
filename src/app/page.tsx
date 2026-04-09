import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return (
  <div className="flex flex-col min-h-screen">

<section className="py-16">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-center mb-8">Free JSON-LD Schema Generator for Local Businesses</h1>
    <p className="text-center text-gray-600 mb-12">
      Generate perfect schema markup in seconds. No coding required. Boost your search visibility with structured data.
    </p>
    
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">🔍 What is Schema Markup?</h2>
        <p className="text-gray-600">
          Schema markup (also known as structured data) is a special format of HTML that search engines like Google use to understand your content better and display rich results in search.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">🚀 Why Use SchemaSpot?</h2>
        <p className="text-gray-600">
          Our free JSON-LD generator creates valid schema markup for any local business type in seconds - no technical skills needed.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">📈 Benefits of Structured Data</h2>
        <p className="text-gray-600">
          Websites with schema markup get enhanced search appearances, higher click-through rates, and better local search visibility.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">💡 Who Is This For?</h2>
        <p className="text-gray-600">
          Local businesses, restaurants, medical practices, home services, retailers, and anyone wanting to improve their SEO without hiring developers.
        </p>
      </div>
    </div>
  </div>
</section>

    
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
