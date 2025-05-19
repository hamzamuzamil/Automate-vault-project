"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-video-container">
        {/* Replaced video with a gradient background for reliability */}
        <div className="absolute inset-0 bg-gradient-to-br from-vault-darker via-vault-dark to-vault-purple/30"></div>
      </div>

      <motion.div className="container relative z-20 text-center px-4" style={{ opacity, scale, y }}>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gradient"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          Automate Anything. <br />
          Unlock Everything.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          Premium $5 templates across 12+ industries. Find your perfect workflow — powered by AI.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
          <Link href="/templates">
            <Button size="lg" className="glow-button bg-vault-purple hover:bg-vault-purple/90">
              Browse Workflows
            </Button>
          </Link>
          <Link href="/assistant">
            <Button
              size="lg"
              variant="outline"
              className="border-vault-purple text-vault-purple hover:bg-vault-purple/10"
            >
              Try AI Assistant
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
