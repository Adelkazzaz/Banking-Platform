import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, TrendingUp } from "lucide-react"

interface UserStatsProps {
  totalUsers: number
  activeUsers: number
  isLoading: boolean
}

export function UserStats({ totalUsers, activeUsers, isLoading }: UserStatsProps) {
  // Calculate active user percentage
  const activePercentage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
        )}

        <div className="mt-4 flex items-center space-x-2">
          <div className="flex-1 text-xs">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-muted-foreground">Active Users</span>
              <span className="font-medium">{activePercentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${activePercentage}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <TrendingUp className="h-3 w-3" />
            <span>+5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
