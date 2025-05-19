import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { TemplateGrid } from "@/components/templates/template-grid"
import { TemplateFilters } from "@/components/templates/template-filters"
import { FooterSection } from "@/components/landing/footer-section"
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth"

export default function TemplatesPage() {
  return (
    <SupabaseAuthProvider>
      <div className="min-h-screen bg-vault-darker">
        <SiteHeader />
        <main className="pt-24">
          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gradient">Automation Templates</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Browse our collection of premium automation templates to streamline your workflow.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/4">
                  <TemplateFilters />
                </div>
                <div className="w-full lg:w-3/4">
                  <Suspense
                    fallback={<div className="h-96 flex items-center justify-center">Loading templates...</div>}
                  >
                    <TemplateGrid />
                  </Suspense>
                </div>
              </div>
            </div>
          </section>
        </main>
        <FooterSection />
      </div>
    </SupabaseAuthProvider>
  )
}
