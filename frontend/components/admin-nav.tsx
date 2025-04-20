"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  CreditCard,
  Settings,
  LogOut,
  BarChart3,
  AlertCircle,
} from "lucide-react"
import { logoutAction } from "@/app/login/actions"

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Transactions",
      href: "/admin/transactions",
      icon: ArrowLeftRight,
    },
    {
      title: "Loans",
      href: "/admin/loans",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: AlertCircle,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex flex-col gap-2 p-4 h-full">
      <div className="py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">Admin Panel</h2>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="truncate">{item.title}</span>
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
