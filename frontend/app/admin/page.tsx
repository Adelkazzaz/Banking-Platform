"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin-header"
import { UserStats } from "@/components/user-stats"
import { TransactionStats } from "@/components/transaction-stats"
import { LoanStats } from "@/components/loan-stats"
import { AdminDashboardChart } from "@/components/admin-dashboard-chart"
import { getAdminDashboardStats } from "./actions"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTransactions: 0,
    transactionVolume: 0,
    pendingLoans: 0,
    approvedLoans: 0,
    totalLoanAmount: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getAdminDashboardStats()
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
      <AdminHeader title="Admin Dashboard" description="Overview of all banking activities." />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <Card>
            <CardHeader>
              <CardTitle>Transaction Activity</CardTitle>
              <CardDescription>Transaction volume over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDashboardChart />
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
