"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { Loan } from "@/lib/db"
import { formatDate, formatCurrency } from "@/lib/utils"
import { approveLoanAction, rejectLoanAction } from "@/app/admin/loans/actions"

interface AdminLoanListProps {
  loans: Loan[]
}

export function AdminLoanList({ loans }: AdminLoanListProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})

  async function handleApprove(loanId: string) {
    setIsLoading((prev) => ({ ...prev, [loanId]: true }))

    try {
      await approveLoanAction(loanId)
      router.refresh()
    } catch (error) {
      console.error("Error approving loan:", error)
    } finally {
      setIsLoading((prev) => ({ ...prev, [loanId]: false }))
    }
  }

  async function handleReject(loanId: string) {
    setIsLoading((prev) => ({ ...prev, [loanId]: true }))

    try {
      await rejectLoanAction(loanId)
      router.refresh()
    } catch (error) {
      console.error("Error rejecting loan:", error)
    } finally {
      setIsLoading((prev) => ({ ...prev, [loanId]: false }))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Applications</CardTitle>
        <CardDescription>Review and manage loan applications</CardDescription>
      </CardHeader>
      <CardContent>
        {loans.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No loan applications found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-mono text-xs">{loan.userId}</TableCell>
                  <TableCell>{formatCurrency(loan.amount)}</TableCell>
                  <TableCell>{loan.term} months</TableCell>
                  <TableCell>{loan.interestRate.toFixed(2)}%</TableCell>
                  <TableCell>{formatDate(loan.requestDate)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        loan.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : loan.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : loan.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {loan.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(loan.id)}
                          disabled={isLoading[loan.id]}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(loan.id)}
                          disabled={isLoading[loan.id]}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
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
