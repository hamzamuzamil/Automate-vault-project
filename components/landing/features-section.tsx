"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Bot, ShoppingCart, Lock, BarChart, Gift } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-10 w-10 text-vault-purple" />,
    title: "Instant Automation",
    description: "Ready-to-use n8n workflows that save you hours of setup time.",
  },
  {
    icon: <Bot className="h-10 w-10 text-vault-blue" />,
    title: "AI Assistant",
    description: "Get personalized workflow recommendations from our AI assistant.",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-vault-cyan" />,
    title: "Simple Pricing",
    description: "All templates just $5 each. No subscriptions or hidden fees.",
  },
  {
    icon: <Lock className="h-10 w-10 text-vault-purple" />,
    title: "Secure Checkout",
    description: "Safe and secure payment processing with instant delivery.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-vault-blue" />,
    title: "Industry Categories",
    description: "Browse templates by industry to find exactly what you need.",
  },
  {
    icon: <Gift className="h-10 w-10 text-vault-cyan" />,
    title: "Bonus AI Prompts",
    description: "Get 20 industry-specific AI prompts with every purchase.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-24 bg-vault-dark relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Everything You Need to Automate</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our premium templates are designed to help you automate your workflows quickly and efficiently.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-vault-darker p-8 rounded-xl border border-vault-purple/20 shadow-lg hover:shadow-vault-purple/10 transition-all duration-300 card-hover"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
