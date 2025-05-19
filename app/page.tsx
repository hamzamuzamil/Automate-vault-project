import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TemplatesShowcase } from "@/components/landing/templates-showcase"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FooterSection } from "@/components/landing/footer-section"
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth"

export default function HomePage() {
  return (
    <SupabaseAuthProvider>
      <div className="relative min-h-screen">
        <SiteHeader />
        <main>
          <HeroSection />
          <FeaturesSection />
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading templates...</div>}>
            <TemplatesShowcase />
          </Suspense>
          <TestimonialsSection />
          <PricingSection />
          <FooterSection />
        </main>
      </div>
    </SupabaseAuthProvider>
  )
}
