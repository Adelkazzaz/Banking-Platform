import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeftRight } from "lucide-react"
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
        {isLoading ? <Skeleton className="h-7 w-20" /> : <div className="text-2xl font-bold">{totalTransactions}</div>}
        <p className="text-xs text-muted-foreground">
          {isLoading ? <Skeleton className="h-4 w-28 mt-1" /> : `${formatCurrency(transactionVolume)} total volume`}
        </p>
      </CardContent>
    </Card>
  )
}
