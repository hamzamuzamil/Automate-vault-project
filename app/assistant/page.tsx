import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/landing/footer-section"
import { ChatInterface } from "@/components/assistant/chat-interface"
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth"

export default function AssistantPage() {
  return (
    <SupabaseAuthProvider>
      <div className="min-h-screen bg-vault-darker">
        <SiteHeader />
        <main className="pt-24">
          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gradient">AI Workflow Assistant</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Describe what you want to automate, and our AI will recommend the perfect templates for your needs.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <ChatInterface />
              </div>
            </div>
          </section>
        </main>
        <FooterSection />
      </div>
    </SupabaseAuthProvider>
  )
}
