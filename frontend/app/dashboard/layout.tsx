import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { Menu } from "lucide-react"
import { getSession } from "@/lib/auth"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { BankLogo } from "@/components/bank-logo"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        {/* Container for mobile menu button and desktop logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button & Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-4">
              {/* Logo inside mobile sheet */}
              <div className="mb-4">
                <BankLogo />
              </div>
              <DashboardNav />
            </SheetContent>
          </Sheet>
          {/* Desktop Logo - hidden on mobile */}
          <div className="hidden md:block">
            <BankLogo />
          </div>
        </div>
        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <DashboardNav />
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
