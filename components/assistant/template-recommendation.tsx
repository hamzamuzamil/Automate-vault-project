"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function TemplateRecommendation({ template }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="bg-vault-darker border-vault-purple/20">
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{template.title}</h3>
            <Badge variant="outline" className="bg-vault-purple/10 text-vault-purple border-vault-purple/30">
              ${template.price}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <Link href={`/templates/${template.slug}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-vault-purple/30 text-vault-purple hover:bg-vault-purple/10"
            >
              View Template
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
