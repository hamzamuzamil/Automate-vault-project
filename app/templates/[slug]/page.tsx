import { notFound } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/landing/footer-section"
import { TemplateDetail } from "@/components/templates/template-detail"
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth"

async function getTemplateBySlug(slug: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("templates")
    .select(`
      id,
      title,
      slug,
      description,
      price,
      thumbnail_url,
      preview_url,
      file_url,
      complexity,
      popularity,
      categories(name, slug),
      template_tags(tags(name))
    `)
    .eq("slug", slug)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function TemplateDetailPage({ params }: { params: { slug: string } }) {
  const template = await getTemplateBySlug(params.slug)

  if (!template) {
    notFound()
  }

  return (
    <SupabaseAuthProvider>
      <div className="min-h-screen bg-vault-darker">
        <SiteHeader />
        <main className="pt-24">
          <TemplateDetail template={template} />
        </main>
        <FooterSection />
      </div>
    </SupabaseAuthProvider>
  )
}
