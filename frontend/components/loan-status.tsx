import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Loan } from "@/lib/db"
import { formatDate, formatCurrency } from "@/lib/utils"

interface LoanStatusProps {
  loans: Loan[]
}

export function LoanStatus({ loans }: LoanStatusProps) {
  const pendingLoans = loans.filter((loan) => loan.status === "pending")
  const activeLoans = loans.filter((loan) => loan.status === "approved")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Status</CardTitle>
      </CardHeader>
      <CardContent>
        {loans.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No loans yet</p>
        ) : (
          <div className="space-y-4">
            {pendingLoans.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Pending Applications</h3>
                {pendingLoans.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {formatCurrency(loan.amount)} ({loan.term} months)
                      </span>
                      <span className="text-xs text-muted-foreground">Requested: {formatDate(loan.requestDate)}</span>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Pending</div>
                  </div>
                ))}
              </div>
            )}

            {activeLoans.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Active Loans</h3>
                {activeLoans.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {formatCurrency(loan.amount)} ({loan.term} months)
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Due: {loan.dueDate ? formatDate(loan.dueDate) : "N/A"}
                      </span>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
