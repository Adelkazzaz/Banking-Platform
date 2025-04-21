"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, User, Clock } from "lucide-react"
import type { Loan } from "@/lib/db"
import { formatDate, formatCurrency } from "@/lib/utils"
import { approveLoanAction, rejectLoanAction } from "@/app/admin/loans/actions"
import { toast } from "@/hooks/use-toast"

interface AdminLoanListProps {
  loans: Loan[]
}

export function AdminLoanList({ loans }: AdminLoanListProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [dialogAction, setDialogAction] = useState<"approve" | "reject" | null>(null)
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null)

  // Group loans by status for better organization
  const pendingLoans = loans.filter(loan => loan.status === "pending")
  const approvedLoans = loans.filter(loan => loan.status === "approved")
  const rejectedLoans = loans.filter(loan => loan.status === "rejected")
  
  // Sort loans with pending first
  const sortedLoans = [
    ...pendingLoans,
    ...approvedLoans,
    ...rejectedLoans
  ]

  function openApproveDialog(loan: Loan) {
    setSelectedLoan(loan)
    setDialogAction("approve")
  }

  function openRejectDialog(loan: Loan) {
    setSelectedLoan(loan)
    setDialogAction("reject")
  }

  function closeDialog() {
    setSelectedLoan(null)
    setDialogAction(null)
  }

  async function handleApprove(loanId: string) {
    setIsLoading((prev) => ({ ...prev, [loanId]: true }))
    closeDialog()

    try {
      const result = await approveLoanAction(loanId)
      
      if (result.success) {
        setNotification({
          type: "success",
          message: "Loan approved successfully. User has been notified."
        })
        toast({
          title: "Loan approved",
          description: "The loan has been approved and funds added to user's account."
        })
      } else {
        setNotification({
          type: "error",
          message: result.message || "Failed to approve loan"
        })
        toast({
          title: "Error",
          description: result.message || "Failed to approve loan",
          variant: "destructive"
        })
      }
      
      router.refresh()
    } catch (error) {
      console.error("Error approving loan:", error)
      setNotification({
        type: "error",
        message: "An unexpected error occurred"
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, [loanId]: false }))
    }
  }

  async function handleReject(loanId: string) {
    setIsLoading((prev) => ({ ...prev, [loanId]: true }))
    closeDialog()

    try {
      const result = await rejectLoanAction(loanId)
      
      if (result.success) {
        setNotification({
          type: "success",
          message: "Loan rejected. User has been notified."
        })
        toast({
          title: "Loan rejected",
          description: "The loan application has been rejected."
        })
      } else {
        setNotification({
          type: "error",
          message: result.message || "Failed to reject loan"
        })
        toast({
          title: "Error",
          description: result.message || "Failed to reject loan",
          variant: "destructive"
        })
      }
      
      router.refresh()
    } catch (error) {
      console.error("Error rejecting loan:", error)
      setNotification({
        type: "error",
        message: "An unexpected error occurred"
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, [loanId]: false }))
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Loan Applications</span>
            <div className="flex items-center text-sm font-normal">
              <span className="mr-2 px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                {pendingLoans.length} Pending
              </span>
              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                {approvedLoans.length} Approved
              </span>
            </div>
          </CardTitle>
          <CardDescription>Review loan applications and manage approval status</CardDescription>
        </CardHeader>
        <CardContent>
          {notification && (
            <Alert 
              variant={notification.type === "success" ? "default" : "destructive"}
              className="mb-6"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{notification.type === "success" ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          )}

          {loans.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No loan applications found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLoans.map((loan) => (
                  <TableRow 
                    key={loan.id} 
                    className={loan.status === "pending" 
                      ? "bg-yellow-50 dark:bg-yellow-950/30" 
                      : ""}
                  >
                    <TableCell className="font-mono text-xs">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-muted-foreground" />
                        {loan.accountNumber}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(loan.amount)}</TableCell>
                    <TableCell>{loan.term} months</TableCell>
                    <TableCell>{loan.interestRate.toFixed(2)}%</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {formatDate(loan.requestDate)}
                      </div>
                    </TableCell>
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
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => openApproveDialog(loan)}
                            disabled={isLoading[loan.id]}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openRejectDialog(loan)}
                            disabled={isLoading[loan.id]}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                      {loan.status !== "pending" && (
                        <span className="text-sm text-muted-foreground">
                          {loan.status === "approved" ? "Approved on " : "Rejected on "}
                          {loan.approvalDate ? formatDate(loan.approvalDate) : 
                           loan.status === "rejected" && loan.rejectionDate ? formatDate(loan.rejectionDate) : "N/A"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={!!selectedLoan && !!dialogAction} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "approve" 
                ? "Approve Loan Application" 
                : "Reject Loan Application"}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === "approve"
                ? "Are you sure you want to approve this loan? This will add funds to the user's account."
                : "Are you sure you want to reject this loan application? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>

          {selectedLoan && (
            <div className="py-4">
              <h3 className="text-sm font-medium mb-2">Loan Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Amount:</span> {formatCurrency(selectedLoan.amount)}</p>
                <p><span className="font-medium">Term:</span> {selectedLoan.term} months</p>
                <p><span className="font-medium">Interest Rate:</span> {selectedLoan.interestRate.toFixed(2)}%</p>
                <p><span className="font-medium">Request Date:</span> {formatDate(selectedLoan.requestDate)}</p>
                <p><span className="font-medium">Account Number:</span> {selectedLoan.accountNumber}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            {dialogAction === "approve" && selectedLoan && (
              <Button 
                className="bg-green-600 hover:bg-green-700" 
                onClick={() => selectedLoan && handleApprove(selectedLoan.id)}
                disabled={isLoading[selectedLoan.id]}
              >
                <CheckCircle className="h-4 w-4 mr-1" /> Approve Loan
              </Button>
            )}
            {dialogAction === "reject" && selectedLoan && (
              <Button 
                variant="destructive" 
                onClick={() => selectedLoan && handleReject(selectedLoan.id)}
                disabled={isLoading[selectedLoan.id]}
              >
                <XCircle className="h-4 w-4 mr-1" /> Reject Loan
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
