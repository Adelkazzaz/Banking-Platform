import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/db"
import { formatDate, formatCurrency } from "@/lib/utils"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No transactions yet</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {transaction.type === "transfer"
                      ? transaction.fromAccount === transaction.toAccount
                        ? "Self Transfer"
                        : transaction.description || "Transfer"
                      : transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDate(transaction.timestamp)}</span>
                </div>
                <div
                  className={`font-medium ${
                    transaction.type === "withdrawal" || 
                    (transaction.type === "transfer" && transaction.accountNumber === transaction.fromAccount) 
                      ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {transaction.type === "withdrawal" || 
                   (transaction.type === "transfer" && transaction.accountNumber === transaction.fromAccount)
                    ? "-" : "+"}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
