"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ArrowLeftRight, Clock, CreditCard, Settings, LogOut, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { logoutAction } from "@/app/login/actions"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transfer Money",
      href: "/dashboard/transfer",
      icon: ArrowLeftRight,
    },
    {
      title: "Deposit Funds",
      href: "/dashboard/deposit",
      icon: ArrowDownToLine, // Added Deposit Icon
    },
    {
      title: "Withdraw Funds",
      href: "/dashboard/withdrawal",
      icon: ArrowUpFromLine, // Added Withdrawal Icon
    },
    {
      title: "Transaction History",
      href: "/dashboard/transactions",
      icon: Clock,
    },
    {
      title: "Loans",
      href: "/dashboard/loans",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="mt-auto">
        <form action={logoutAction}>
          <Button variant="ghost" className="w-full justify-start gap-3" type="submit">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}
