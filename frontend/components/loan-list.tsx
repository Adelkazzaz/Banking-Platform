import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Loan } from "@/lib/db"
import { formatDate, formatCurrency } from "@/lib/utils"

interface LoanListProps {
  loans: Loan[]
}

export function LoanList({ loans }: LoanListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Loans</CardTitle>
      </CardHeader>
      <CardContent>
        {loans.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">You don't have any loans yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
