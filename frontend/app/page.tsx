"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BankLogo } from "@/components/bank-logo"
import { ArrowRight, CreditCard, Lock, Smartphone, Wallet, ChevronDown, Menu } from "lucide-react"
import { HeroCards } from "@/components/hero-cards"
import { FloatingShapes } from "@/components/floating-shapes"
import { FeatureCard } from "@/components/feature-card"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function Home() {
  // References to sections for smooth scrolling
  const featuresRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <header className="fixed top-0 z-50 w-full transition-all duration-300 bg-background/70 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <BankLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="bg-transparent border-none hover:bg-background/30">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-6">
                  <SheetClose asChild>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                    >
                      Home
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => scrollToSection(featuresRef)}
                      className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                    >
                      Features
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => scrollToSection(aboutRef)}
                      className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                    >
                      About
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => scrollToSection(contactRef)}
                      className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                    >
                      Contact
                    </button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden sm:flex gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full min-h-screen pt-24 pb-12 md:py-16 md:pt-28 lg:py-20 lg:pt-28 xl:py-24 xl:pt-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <FloatingShapes />
          </div>
          <div className="container px-4 md:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2"
                  >
                    Next Generation Banking
                  </motion.div>
                  <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    Banking Made Simple
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    Experience the future of banking with our secure, fast, and user-friendly digital platform. Manage
                    your finances with ease, anytime, anywhere.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <Link href="/register">
                    <Button size="lg" className="gap-1 group">
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline">
                      Login
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-sm text-muted-foreground mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                >
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs text-primary-foreground">
                      JD
                    </div>
                    <div className="h-7 w-7 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs text-primary-foreground">
                      AS
                    </div>
                    <div className="h-7 w-7 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs text-primary-foreground">
                      TK
                    </div>
                  </div>
                  <div>Join 10,000+ users already managing their finances</div>
                </motion.div>
              </motion.div>
              <div className="hidden lg:block relative">
                <HeroCards />
              </div>
            </div>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="flex items-center gap-1 text-sm text-muted-foreground pb-8"
            >
              Scroll to explore
              <ChevronDown className="h-4 w-4" />
            </button>
          </motion.div>
        </section>

        <section ref={featuresRef} id="features" className="w-full pt-24 py-12 md:py-24 md:pt-28 lg:py-32 lg:pt-32 bg-muted/40">
          <div className="container px-4 md:px-6 lg:px-8">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need in One Place</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a comprehensive suite of banking services designed to make your financial life
                  easier.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={<Wallet className="h-6 w-6" />}
                title="Easy Transfers"
                description="Send money to anyone, anywhere, instantly and securely."
              />
              <FeatureCard
                icon={<CreditCard className="h-6 w-6" />}
                title="Virtual Cards"
                description="Create and manage virtual cards for secure online shopping."
              />
              <FeatureCard
                icon={<Smartphone className="h-6 w-6" />}
                title="Mobile Banking"
                description="Access your accounts anytime, anywhere with our mobile app."
              />
              <FeatureCard
                icon={<Lock className="h-6 w-6" />}
                title="Secure Loans"
                description="Apply for loans with competitive rates and quick approval."
              />
            </motion.div>
          </div>
        </section>

        <section ref={aboutRef} id="about" className="w-full pt-24 py-12 md:py-24 md:pt-28 lg:py-32 lg:pt-32">
          <div className="container px-4 md:px-6 lg:px-8">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 lg:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                    About Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Bank with Confidence</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Your security is our top priority. We use state-of-the-art encryption and security measures to
                    protect your data and finances.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className=" h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>End-to-end encryption for all transactions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className=" h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>Two-factor authentication for account access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className=" h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>24/7 fraud monitoring and alerts</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  className="relative h-[400px] w-[400px]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-400/20 blur-3xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="h-24 w-24 text-primary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={contactRef} id="contact" className="w-full pt-24 py-12 md:py-24 md:pt-28 lg:py-32 lg:pt-32 bg-muted/40">
          <div className="container px-4 md:px-6 lg:px-8">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Contact Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get in Touch</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or need assistance? Our team is here to help you.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto max-w-lg space-y-6 py-8">
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="16" rx="2" width="20" x="2" y="4" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">support@floosy.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-sm text-muted-foreground">123 Financial Street, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex gap-2 items-center">
            <BankLogo size="sm" />
            <p className="text-sm text-muted-foreground">© 2023 Floosy. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
