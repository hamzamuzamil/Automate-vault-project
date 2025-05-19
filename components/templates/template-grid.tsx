import Link from "next/link"
import Image from "next/image"
import { getSupabaseServer } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function getTemplates() {
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

  if (error) {
    console.error("Error fetching templates:", error)
    return []
  }

  return data
}

export async function TemplateGrid() {
  const templates = await getTemplates()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  )
}
