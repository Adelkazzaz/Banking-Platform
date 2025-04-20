"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, CreditCard, DollarSign, PiggyBank } from "lucide-react"

export function HeroCards() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const floatAnimation = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative h-[500px] w-full">
      {/* Background gradient */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-primary/20 blur-3xl" />

      {/* Credit card */}
      <motion.div
        className="absolute left-0 top-0 w-64"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.05, rotate: -1, transition: { duration: 0.2 } }}
      >
        <Card className="p-4 backdrop-blur-sm bg-background/80 border-2 border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-primary"
                >
                  <path
                    d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6L7.5 8.5V15.5L12 18L16.5 15.5V8.5L12 6Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm font-medium">Floosy</p>
              </div>
              <p className="text-xs text-muted-foreground">Premium Card</p>
            </div>
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="font-mono text-xl">**** **** **** 4289</p>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Card Holder</p>
                <p className="text-sm">John Doe</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expires</p>
                <p className="text-sm">12/25</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Transaction card */}
      <motion.div
        className="absolute right-0 top-1/3 w-72"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.2 } }}
      >
        <Card className="p-4 backdrop-blur-sm bg-background/80 border-2 border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Recent Transaction</p>
              <p className="text-xs text-muted-foreground">Today, 2:34 PM</p>
            </div>
            <ArrowUpRight className="h-6 w-6 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Salary Deposit</p>
                  <p className="text-xs text-muted-foreground">Employer Inc.</p>
                </div>
              </div>
              <p className="text-sm font-medium text-green-600">+$2,500.00</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Savings card */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-64"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.05, rotate: -1, transition: { duration: 0.2 } }}
      >
        <Card className="p-4 backdrop-blur-sm bg-background/80 border-2 border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Savings Goal</p>
              <p className="text-xs text-muted-foreground">Vacation Fund</p>
            </div>
            <PiggyBank className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm">$1,200 / $3,000</p>
              <p className="text-xs text-muted-foreground">40%</p>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-12 w-12 rounded-full bg-primary/30 backdrop-blur-md"
        initial="hidden"
        animate="visible"
        variants={floatAnimation}
      />
      <motion.div
        className="absolute left-1/3 top-1/4 h-8 w-8 rounded-full bg-purple-400/30 backdrop-blur-md"
        initial="hidden"
        animate="visible"
        variants={{
          ...floatAnimation,
          visible: {
            ...floatAnimation.visible,
            transition: {
              ...floatAnimation.visible.transition,
              delay: 0.5,
            },
          },
        }}
      />
      <motion.div
        className="absolute right-1/3 top-2/3 h-6 w-6 rounded-full bg-green-400/30 backdrop-blur-md"
        initial="hidden"
        animate="visible"
        variants={{
          ...floatAnimation,
          visible: {
            ...floatAnimation.visible,
            transition: {
              ...floatAnimation.visible.transition,
              delay: 1,
            },
          },
        }}
      />
    </div>
  )
}
