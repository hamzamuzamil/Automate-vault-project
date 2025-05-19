import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/landing/footer-section"
import { LoginForm } from "@/components/auth/login-form"
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth"

export default function LoginPage() {
  return (
    <SupabaseAuthProvider>
      <div className="min-h-screen bg-vault-darker">
        <SiteHeader />
        <main className="pt-24">
          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gradient">Login to AutomateVault</h1>
                <LoginForm />
                <p className="text-center mt-6 text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-vault-purple hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </main>
        <FooterSection />
      </div>
    </SupabaseAuthProvider>
  )
}
