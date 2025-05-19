import Link from "next/link"
import Image from "next/image"
import { getSupabaseServer } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function getTopTemplates() {
  try {
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
        complexity,
        popularity,
        categories(name, slug),
        template_tags(tags(name))
      `)
      .order("popularity", { ascending: false })
      .limit(6)

    if (error) {
      console.error("Error fetching templates:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getTopTemplates:", error)
    return []
  }
}

export async function TemplatesShowcase() {
  const templates = await getTopTemplates()

  return (
    <section className="py-24 bg-vault-darker">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Popular Templates</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular automation templates and start streamlining your workflow today.
          </p>
        </div>

        {templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="bg-vault-dark border-vault-purple/20 overflow-hidden card-hover">
                <div className="relative h-48 w-full">
                  <Image
                    src={template.thumbnail_url || "/placeholder.svg?height=300&width=400"}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{template.title}</CardTitle>
                    <Badge variant="outline" className="bg-vault-purple/10 text-vault-purple border-vault-purple/30">
                      ${template.price}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {template.template_tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-vault-dark">
                        {tag.tags.name}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{template.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={`/templates/${template.slug}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-vault-purple text-vault-purple hover:bg-vault-purple/10"
                    >
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-vault-dark rounded-lg border border-vault-purple/20">
            <p>No templates found. Check back soon for new additions!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/templates">
            <Button size="lg" className="glow-button bg-vault-purple hover:bg-vault-purple/90">
              View All Templates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
