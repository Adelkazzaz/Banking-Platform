"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { Transaction } from "@/lib/db"
import { formatDate, formatCurrency } from "@/lib/utils"

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [filter, setFilter] = useState<string>("all")
  const [search, setSearch] = useState<string>("")

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
        transaction.fromAccount.includes(search) ||
        transaction.toAccount.includes(search) ||
        transaction.amount.toString().includes(search)
      )
    }

    return true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View all your past transactions</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="w-full sm:w-1/3">
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
          <div className="w-full sm:w-2/3">
            <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No transactions found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                  <TableCell>{transaction.description || transaction.type}</TableCell>
                  <TableCell>{transaction.fromAccount || "-"}</TableCell>
                  <TableCell>{transaction.toAccount || "-"}</TableCell>
                  <TableCell
                    className={
                      transaction.type === "deposit" || transaction.toAccount ? "text-green-500" : "text-red-500"
                    }
                  >
                    {transaction.type === "deposit" || transaction.toAccount ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
