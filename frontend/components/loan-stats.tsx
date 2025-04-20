import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CreditCard, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface LoanStatsProps {
  pendingLoans: number
  approvedLoans: number
  totalLoanAmount: number
  isLoading: boolean
}

export function LoanStats({ pendingLoans, approvedLoans, totalLoanAmount, isLoading }: LoanStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Loans</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <div className="text-2xl font-bold">{pendingLoans + approvedLoans}</div>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Pending Review</span>
            <div className="flex items-center gap-1">
              <span className="font-medium">{pendingLoans}</span>
              {pendingLoans > 5 && <AlertCircle className="h-3 w-3 text-amber-500" />}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-medium">{formatCurrency(totalLoanAmount)}</span>
          </div>

          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(approvedLoans / (pendingLoans + approvedLoans)) * 100 || 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span>Pending</span>
            <span>Approved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
