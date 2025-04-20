import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeftRight, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface TransactionStatsProps {
  totalTransactions: number
  transactionVolume: number
  isLoading: boolean
}

export function TransactionStats({ totalTransactions, transactionVolume, isLoading }: TransactionStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
        <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <div className="text-2xl font-bold">{totalTransactions.toLocaleString()}</div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Total Volume</div>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <>
                <span className="font-medium text-sm">{formatCurrency(transactionVolume)}</span>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12%</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
