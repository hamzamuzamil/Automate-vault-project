"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Pencil, Trash, Save, X } from "lucide-react"

export function TemplatesManager() {
  const { toast } = useToast()
  const [templates, setTemplates] = useState([])
  const [categories, setCategories] = useState([])
  const [isAddingTemplate, setIsAddingTemplate] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    price: 5,
    category_id: "",
    thumbnail_url: "",
    preview_url: "",
    file_url: "",
    complexity: 2,
  })

  useEffect(() => {
    fetchTemplates()
    fetchCategories()
  }, [])

  const fetchTemplates = async () => {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("templates")
      .select(`
        id,
        title,
        slug,
        description,
        price,
        category_id,
        thumbnail_url,
        preview_url,
        file_url,
        complexity,
        popularity,
        categories(name)
      `)
      .order("id")

    if (error) {
      console.error("Error fetching templates:", error)
      return
    }

    setTemplates(data || [])
  }

  const fetchCategories = async () => {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase.from("categories").select("id, name").order("name")

    if (error) {
      console.error("Error fetching categories:", error)
      return
    }

    setCategories(data || [])
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTemplate = () => {
    setIsAddingTemplate(true)
    setEditingTemplateId(null)
    setFormData({
      title: "",
      slug: "",
      description: "",
      price: 5,
      category_id: "",
      thumbnail_url: "",
      preview_url: "",
      file_url: "",
      complexity: 2,
    })
  }

  const handleEditTemplate = (template) => {
    setIsAddingTemplate(false)
    setEditingTemplateId(template.id)
    setFormData({
      title: template.title,
      slug: template.slug,
      description: template.description,
      price: template.price,
      category_id: template.category_id,
      thumbnail_url: template.thumbnail_url || "",
      preview_url: template.preview_url || "",
      file_url: template.file_url || "",
      complexity: template.complexity || 2,
    })
  }

  const handleCancelEdit = () => {
    setIsAddingTemplate(false)
    setEditingTemplateId(null)
  }

  const handleSaveTemplate = async () => {
    const supabase = getSupabaseClient()

    if (editingTemplateId) {
      // Update existing template
      const { data, error } = await supabase.from("templates").update(formData).eq("id", editingTemplateId).select()

      if (error) {
        console.error("Error updating template:", error)
        toast({
          variant: "destructive",
          title: "Error updating template.",
          description: "Please try again.",
        })
        return
      }

      toast({
        title: "Template updated successfully!",
      })
    } else {
      // Create new template
      const { data, error } = await supabase.from("templates").insert([formData]).select()

      if (error) {
        console.error("Error creating template:", error)
        toast({
          variant: "destructive",
          title: "Error creating template.",
          description: "Please try again.",
        })
        return
      }

      toast({
        title: "Template created successfully!",
      })
    }

    fetchTemplates()
    setIsAddingTemplate(false)
    setEditingTemplateId(null)
  }

  const handleDeleteTemplate = async (id) => {
    const supabase = getSupabaseClient()

    const { error } = await supabase.from("templates").delete().eq("id", id)

    if (error) {
      console.error("Error deleting template:", error)
      toast({
        variant: "destructive",
        title: "Error deleting template.",
        description: "Please try again.",
      })
      return
    }

    fetchTemplates()
    toast({
      title: "Template deleted successfully!",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Templates Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAddTemplate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Template
          </Button>

          {isAddingTemplate || editingTemplateId ? (
            <div className="mt-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="category_id">Category</Label>
                  <Select onValueChange={(value) => handleSelectChange("category_id", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" value={formData.category_id} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                  <Input
                    id="thumbnail_url"
                    name="thumbnail_url"
                    value={formData.thumbnail_url}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="preview_url">Preview URL</Label>
                  <Input
                    id="preview_url"
                    name="preview_url"
                    value={formData.preview_url}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="file_url">File URL</Label>
                  <Input id="file_url" name="file_url" value={formData.file_url} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="complexity">Complexity</Label>
                  <Select onValueChange={(value) => handleSelectChange("complexity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complexity" value={formData.complexity.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Easy</SelectItem>
                      <SelectItem value="2">Medium</SelectItem>
                      <SelectItem value="3">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onClick={handleCancelEdit}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSaveTemplate}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>{template.title}</TableCell>
                    <TableCell>{template.slug}</TableCell>
                    <TableCell>{template.categories?.name}</TableCell>
                    <TableCell>${template.price}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(template)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
