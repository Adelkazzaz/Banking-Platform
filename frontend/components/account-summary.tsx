import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "@/lib/db"

interface AccountSummaryProps {
  user: User
}

export function AccountSummary({ user }: AccountSummaryProps) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${user.balance?.toFixed(2) || "0.00"}</div>
          <p className="text-xs text-muted-foreground">Available funds</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Number</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.accountNumber}</div>
          <p className="text-xs text-muted-foreground">Your unique identifier</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Holder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </div>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Active</div>
          <p className="text-xs text-muted-foreground">Your account is in good standing</p>
        </CardContent>
      </Card>
    </>
  )
}
