"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { getSupabaseClient } from "@/lib/supabase/client"
import { ShoppingCart, Loader2 } from "lucide-react"

export function CheckoutButton({ templateId }) {
  const { user } = useSupabaseAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to purchase this template.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, this would integrate with Stripe
      // For now, we'll simulate a successful purchase

      const supabase = getSupabaseClient()

      // Get template details
      const { data: template } = await supabase
        .from("templates")
        .select("price, category_id")
        .eq("id", templateId)
        .single()

      if (!template) {
        throw new Error("Template not found")
      }

      // Create a purchase record
      const { data: purchase, error: purchaseError } = await supabase
        .from("purchases")
        .insert({
          user_id: user.id,
          template_id: templateId,
          amount: template.price,
          payment_status: "completed",
          payment_intent_id: `sim_${Date.now()}`,
        })
        .select()
        .single()

      if (purchaseError) {
        throw purchaseError
      }

      // Get random prompts for the category
      const { data: prompts, error: promptsError } = await supabase
        .from("prompts")
        .select("id")
        .eq("category_id", template.category_id)
        .limit(20)

      if (promptsError) {
        throw promptsError
      }

      // Assign prompts to user
      if (prompts.length > 0) {
        const userPrompts = prompts.map((prompt) => ({
          user_id: user.id,
          prompt_id: prompt.id,
          purchase_id: purchase.id,
        }))

        const { error: userPromptsError } = await supabase.from("user_prompts").insert(userPrompts)

        if (userPromptsError) {
          console.error("Error assigning prompts:", userPromptsError)
        }
      }

      toast({
        title: "Purchase Successful!",
        description: "Your template and bonus prompts are now available.",
      })

      router.push("/dashboard/purchases")
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full bg-vault-purple hover:bg-vault-purple/90 animate-pulse-glow"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
        </>
      )}
    </Button>
  )
}
