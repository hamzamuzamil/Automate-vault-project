import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth"

async function isAdmin() {
  const supabase = getSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return false
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single()

  return profile?.is_admin || false
}

export default async function AdminPage() {
  const admin = await isAdmin()

  if (!admin) {
    redirect("/")
  }

  return (
    <SupabaseAuthProvider>
      <div className="min-h-screen bg-vault-darker">
        <SiteHeader />
        <main className="pt-24">
          <AdminDashboard />
        </main>
      </div>
    </SupabaseAuthProvider>
  )
}
