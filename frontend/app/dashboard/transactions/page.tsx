"use client"

import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { TransactionList } from "@/components/transaction-list"
import { TransactionSummaryChart } from "@/components/transaction-summary-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserTransactions } from "./actions"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getUserTransactions()
        if (data.success) {
          setTransactions(data.transactions)
        } else {
          // Handle error - redirect to login if not authenticated
          redirect("/login")
        }
      } catch (error) {
        console.error("Failed to load transactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [])

  // Filter transactions based on search, type, and date range
  const filteredTransactions = transactions.filter((transaction) => {
    // Apply type filter
    if (filter !== "all" && transaction.type !== filter) {
      return false
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      return (
        transaction.description?.toLowerCase().includes(searchLower) ||
        transaction.fromAccount?.includes(search) ||
        transaction.toAccount?.includes(search) ||
        transaction.amount.toString().includes(search)
      )
    }

    // Apply date range filter
    if (dateRange.from && dateRange.to) {
      const transactionDate = new Date(transaction.timestamp)
      return transactionDate >= dateRange.from && transactionDate <= dateRange.to
    }

    return true
  })

  const handleExport = () => {
    // In a real app, this would generate and download a CSV file
    alert("Exporting transactions to CSV...")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardHeader title="Transaction History" description="View and analyze your past transactions." />

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1 sm:hidden">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filter Transactions</SheetTitle>
                <SheetDescription>Apply filters to your transaction history</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Transaction Type</h3>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="transfer">Transfers</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Search</h3>
                  <Input
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date Range</h3>
                  <DatePickerWithRange setDateRange={setDateRange} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="transfer">Transfers</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <DatePickerWithRange setDateRange={setDateRange} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {isLoading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-3 w-[200px]" />
                      </div>
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <TransactionList transactions={filteredTransactions} />
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
              <CardDescription>Visualize your transaction patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[350px] flex items-center justify-center">
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : (
                <TransactionSummaryChart transactions={filteredTransactions} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
