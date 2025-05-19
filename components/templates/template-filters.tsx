"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, SlidersHorizontal } from "lucide-react"

export function TemplateFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true)
      const supabase = getSupabaseClient()

      // Fetch categories
      const { data: categoriesData } = await supabase.from("categories").select("id, name, slug").order("name")

      // Fetch tags
      const { data: tagsData } = await supabase.from("tags").select("id, name").order("name")

      setCategories(categoriesData || [])
      setTags(tagsData || [])

      // Get query params
      const categoryParam = searchParams.get("category")
      const tagParam = searchParams.get("tag")
      const searchParam = searchParams.get("search")

      if (categoryParam) {
        setSelectedCategories(categoryParam.split(","))
      }

      if (tagParam) {
        setSelectedTags(tagParam.split(","))
      }

      if (searchParam) {
        setSearchQuery(searchParam)
      }

      setIsLoading(false)
    }

    fetchFilters()
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    applyFilters()
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    }

    if (selectedTags.length > 0) {
      params.set("tag", selectedTags.join(","))
    }

    if (searchQuery) {
      params.set("search", searchQuery)
    }

    router.push(`/templates?${params.toString()}`)
  }

  const handleCategoryChange = (slug) => {
    setSelectedCategories((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug)
      } else {
        return [...prev, slug]
      }
    })
  }

  const handleTagChange = (name) => {
    setSelectedTags((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name)
      } else {
        return [...prev, name]
      }
    })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSearchQuery("")
    router.push("/templates")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-vault-dark border-vault-purple/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-vault-darker border-vault-purple/30"
              />
            </div>
            <Button type="submit" size="icon" className="bg-vault-purple hover:bg-vault-purple/90">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full border-vault-purple/30 text-vault-purple"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
        <Card className="bg-vault-dark border-vault-purple/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.slug}`}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={() => handleCategoryChange(category.slug)}
                    className="border-vault-purple/50 data-[state=checked]:bg-vault-purple data-[state=checked]:border-vault-purple"
                  />
                  <Label htmlFor={`category-${category.slug}`} className="text-sm font-normal cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-vault-dark border-vault-purple/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag.name}`}
                    checked={selectedTags.includes(tag.name)}
                    onCheckedChange={() => handleTagChange(tag.name)}
                    className="border-vault-purple/50 data-[state=checked]:bg-vault-purple data-[state=checked]:border-vault-purple"
                  />
                  <Label htmlFor={`tag-${tag.name}`} className="text-sm font-normal cursor-pointer">
                    {tag.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-2">
          <Button onClick={applyFilters} className="flex-1 bg-vault-purple hover:bg-vault-purple/90">
            Apply Filters
          </Button>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="flex-1 border-vault-purple/30 text-vault-purple hover:bg-vault-purple/10"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
