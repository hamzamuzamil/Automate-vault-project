"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { CheckoutButton } from "@/components/checkout/checkout-button"
import { Clock, BarChart, FileText, Download, Gift } from "lucide-react"

export function TemplateDetail({ template }) {
  const { user } = useSupabaseAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const complexityLabels = {
    1: "Beginner",
    2: "Easy",
    3: "Intermediate",
    4: "Advanced",
    5: "Expert",
  }

  const handlePurchase = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to purchase this template.",
        variant: "destructive",
      })
      return
    }

    // Checkout logic will be implemented here
  }

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden mb-6">
                <Image
                  src={template.preview_url || template.thumbnail_url || "/placeholder.svg?height=600&width=800"}
                  alt={template.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{template.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-vault-purple/20 text-vault-purple border-vault-purple/30">
                  {template.categories?.name}
                </Badge>
                {template.template_tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-vault-dark">
                    {tag.tags.name}
                  </Badge>
                ))}
              </div>

              <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
                <TabsList className="bg-vault-dark border border-vault-purple/20">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-vault-purple data-[state=active]:text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-vault-purple data-[state=active]:text-white"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="bonus"
                    className="data-[state=active]:bg-vault-purple data-[state=active]:text-white"
                  >
                    Bonus Prompts
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <Card className="bg-vault-dark border-vault-purple/20">
                    <CardContent className="pt-6">
                      <p className="text-lg mb-6">{template.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-vault-purple mr-2" />
                          <span>Complexity: {complexityLabels[template.complexity] || "Intermediate"}</span>
                        </div>
                        <div className="flex items-center">
                          <BarChart className="h-5 w-5 text-vault-purple mr-2" />
                          <span>Popularity: {template.popularity} users</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">What You'll Get</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Download className="h-5 w-5 text-vault-purple mr-2 mt-0.5" />
                          <span>Instant access to the complete workflow template</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="h-5 w-5 text-vault-purple mr-2 mt-0.5" />
                          <span>Detailed documentation and setup instructions</span>
                        </li>
                        <li className="flex items-start">
                          <Gift className="h-5 w-5 text-vault-purple mr-2 mt-0.5" />
                          <span>20 industry-specific AI prompts as a bonus</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="mt-6">
                  <Card className="bg-vault-dark border-vault-purple/20">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
                      <p className="mb-4">
                        This template is designed for n8n workflow automation platform. It includes all the necessary
                        nodes and configurations to get you started quickly.
                      </p>

                      <h4 className="text-lg font-semibold mb-2">Requirements</h4>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>n8n version 0.214.0 or higher</li>
                        <li>API access to the services used in the workflow</li>
                        <li>Basic understanding of workflow automation</li>
                      </ul>

                      <h4 className="text-lg font-semibold mb-2">Included Files</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Main workflow JSON file</li>
                        <li>Setup documentation (PDF)</li>
                        <li>Sample data for testing</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bonus" className="mt-6">
                  <Card className="bg-vault-dark border-vault-purple/20">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Bonus AI Prompts</h3>
                      <p className="mb-6">
                        With your purchase, you'll receive 20 industry-specific AI prompts designed to enhance your
                        workflow. Here's a preview of what you'll get:
                      </p>

                      <div className="space-y-4">
                        <div className="p-4 bg-vault-darker rounded-lg border border-vault-purple/20">
                          <p className="italic">
                            "Generate a weekly content calendar for [industry] that includes blog topics, social media
                            posts, and email newsletter ideas."
                          </p>
                        </div>
                        <div className="p-4 bg-vault-darker rounded-lg border border-vault-purple/20">
                          <p className="italic">
                            "Create a customer follow-up email sequence for [product/service] that addresses common
                            questions and objections."
                          </p>
                        </div>
                        <div className="p-4 bg-vault-darker rounded-lg border border-vault-purple/20">
                          <p className="italic">
                            "Design a data analysis report template that highlights key metrics and insights for
                            [business type]."
                          </p>
                        </div>

                        <p className="text-muted-foreground">
                          ...plus 17 more prompts specific to {template.categories?.name} automation.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-vault-dark border-vault-purple/20 sticky top-24">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2">${template.price}</div>
                    <p className="text-muted-foreground">One-time purchase</p>
                  </div>

                  <CheckoutButton templateId={template.id} />

                  <div className="mt-6 pt-6 border-t border-vault-purple/20">
                    <h4 className="font-semibold mb-3">This purchase includes:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Download className="h-4 w-4 text-vault-purple mr-2" />
                        <span className="text-sm">Full workflow template</span>
                      </li>
                      <li className="flex items-center">
                        <Gift className="h-4 w-4 text-vault-purple mr-2" />
                        <span className="text-sm">20 bonus AI prompts</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 text-vault-purple mr-2" />
                        <span className="text-sm">Documentation & support</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
