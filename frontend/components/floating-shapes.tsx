"use client"

import { motion } from "framer-motion"

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

      {/* Animated shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-40 w-40 rounded-full border border-primary/20 backdrop-blur-sm"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 0.3,
          transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-60 w-60 rounded-full border border-purple-400/20 backdrop-blur-sm"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 0.3,
          transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 },
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 backdrop-blur-sm"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 0.3,
          transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 },
        }}
      />

      {/* Small floating dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-primary/40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.7,
            scale: 1,
            y: [0, -10, 0],
            transition: {
              opacity: { duration: 0.5, delay: i * 0.1 },
              scale: { duration: 0.5, delay: i * 0.1 },
              y: {
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.1,
              },
            },
          }}
        />
      ))}
    </div>
  )
}
