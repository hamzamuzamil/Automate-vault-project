import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/landing/footer-section"
import { RegisterForm } from "@/components/auth/register-form"
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth"

export default function RegisterPage() {
  return (
    <SupabaseAuthProvider>
      <div className="min-h-screen bg-vault-darker">
        <SiteHeader />
        <main className="pt-24">
          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gradient">Create an Account</h1>
                <RegisterForm />
                <p className="text-center mt-6 text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-vault-purple hover:underline">
                    Login
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
