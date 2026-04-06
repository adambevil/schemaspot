# Reddit Post — r/WordPress

**Title:** Stop overcomplicating schema markup in WordPress — here's a 60-second approach

**Body:**

Hey r/WordPress,

I see a lot of people here asking about how to implement schema / structured data on their WP sites. The usual answers are "install Yoast" or "install RankMath" or "buy this premium plugin" — but most people don't realize those plugins often generate generic, one-size-fits-all schema that might not even match your business type.

**Here's the fastest approach I've found:**

**Step 1:** Generate tailored JSON-LD markup for your specific business type. Not a generic template — markup that matches what's actually on your page.

**Step 2:** Add it to your site. Two easy ways:
- Use a free plugin like "WPCode" and paste the JSON-LD in the header
- Add it to your child theme's functions.php with a simple `wp_head` hook

**Step 3:** Validate with Google's Rich Results Test. Always validate.

**A tool that speeds this up:** I built a free tool called SchemaSpot that generates valid JSON-LD for 20+ schema types (LocalBusiness, FAQ, Article, Product, Event, Recipe, etc.) with a visual preview of the rich result. No sign-up, no paywall.

https://schemaspot.netlify.app/

It gives you step-by-step WP install instructions with the generated markup.

**Pro tip for WP users:** If you're using Elementor, the easiest method is:
1. Go to Site Settings > Custom Code
2. Paste the generated JSON-LD in the body end
3. Set display conditions to the specific page
4. Publish

This gives you cleaner, more specific schema than most plugins — and it's completely free.

What schema setups are you all running on your WP sites? Curious what's working.

---

*Disclosure: I created SchemaSpot. Built it because the existing WP solutions were either bloated, expensive, or both.*
