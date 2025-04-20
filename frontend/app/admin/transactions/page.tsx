"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { AdminHeader } from "@/components/admin-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Download, Filter, MoreHorizontal, Eye, Ban, CheckCircle } from "lucide-react"
import { getAllTransactions } from "./actions"
import { formatDate, formatCurrency } from "@/lib/utils"
import { TransactionVolumeChart } from "@/components/transaction-volume-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getAllTransactions()
        if (data.success) {
          setTransactions(data.transactions)
          setTotalPages(Math.ceil(data.transactions.length / 10))
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

  // Paginate transactions
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * 10, currentPage * 10)

  const handleExport = () => {
    // In a real app, this would generate and download a CSV file
    alert("Exporting transactions to CSV...")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AdminHeader title="Transaction Management" description="View and manage all transactions in the system." />

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
                <SheetDescription>Apply filters to transaction data</SheetDescription>
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

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
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

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
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
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedTransactions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No transactions found
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-mono text-xs">{transaction.id.substring(0, 8)}...</TableCell>
                              <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                              <TableCell>{transaction.fromAccount || "-"}</TableCell>
                              <TableCell>{transaction.toAccount || "-"}</TableCell>
                              <TableCell
                                className={
                                  transaction.type === "deposit" || transaction.toAccount
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {transaction.type === "deposit" || transaction.toAccount ? "+" : "-"}
                                {formatCurrency(transaction.amount)}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{transaction.type}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    transaction.status === "completed"
                                      ? "default"
                                      : transaction.status === "pending"
                                        ? "outline"
                                        : "destructive"
                                  }
                                >
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    {transaction.status === "pending" && (
                                      <>
                                        <DropdownMenuItem className="cursor-pointer">
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Approve
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer text-destructive">
                                          <Ban className="mr-2 h-4 w-4" />
                                          Reject
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {totalPages > 5 && (
                          <>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => setCurrentPage(totalPages)}
                                isActive={currentPage === totalPages}
                              >
                                {totalPages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Transaction volume over time by type</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[350px] flex items-center justify-center">
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : (
                <TransactionVolumeChart transactions={transactions} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
