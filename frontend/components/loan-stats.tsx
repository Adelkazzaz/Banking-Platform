import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CreditCard } from "lucide-react"
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
        <p className="text-xs text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-4 w-28 mt-1" />
          ) : (
            `${pendingLoans} pending, ${formatCurrency(totalLoanAmount)} total`
          )}
        </p>
      </CardContent>
    </Card>
  )
}
