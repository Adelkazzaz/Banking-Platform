"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin-header"
import { UserStats } from "@/components/user-stats"
import { TransactionStats } from "@/components/transaction-stats"
import { LoanStats } from "@/components/loan-stats"
import { AdminDashboardChart } from "@/components/admin-dashboard-chart"
import { TransactionDistributionChart } from "@/components/transaction-distribution-chart"
import { UserGrowthChart } from "@/components/user-growth-chart"
import { LoanStatusChart } from "@/components/loan-status-chart"
import { RecentActivityList } from "@/components/recent-activity-list"
import { getAdminDashboardStats } from "./actions"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { AdminNav } from "@/components/admin-nav"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTransactions: 0,
    transactionVolume: 0,
    pendingLoans: 0,
    approvedLoans: 0,
    totalLoanAmount: 0,
    chartData: [],
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getAdminDashboardStats()
        console.log("Admin Stats Data:", data); // <-- Add console log here
        setStats(data)
      } catch (error) {
        console.error("Failed to load admin stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <AdminHeader title="Admin Dashboard" description="Overview of all banking activities." />

        {/* Mobile sidebar trigger */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px] lg:hidden">
            <div className="py-4">
              <AdminNav />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="py-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="py-2">
            Users
          </TabsTrigger>
          <TabsTrigger value="transactions" className="py-2">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="loans" className="py-2">
            Loans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UserStats totalUsers={stats.totalUsers} activeUsers={stats.activeUsers} isLoading={isLoading} />
            <TransactionStats
              totalTransactions={stats.totalTransactions}
              transactionVolume={stats.transactionVolume}
              isLoading={isLoading}
            />
            <LoanStats
              pendingLoans={stats.pendingLoans}
              approvedLoans={stats.approvedLoans}
              totalLoanAmount={stats.totalLoanAmount}
              isLoading={isLoading}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Activity</CardTitle>
                <CardDescription>Transaction volume over the past 14 days</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminDashboardChart chartData={stats.chartData} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Distribution</CardTitle>
                <CardDescription>Breakdown by transaction type</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionDistributionChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Status Distribution</CardTitle>
                <CardDescription>Current status of all loans</CardDescription>
              </CardHeader>
              <CardContent>
                <LoanStatusChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest transactions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivityList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <p>User management content will go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Management</CardTitle>
              <CardDescription>View and manage all transactions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Transaction management content will go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Loan Management</CardTitle>
              <CardDescription>View and manage all loan applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Loan management content will go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
