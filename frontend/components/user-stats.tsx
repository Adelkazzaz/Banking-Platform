import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users } from "lucide-react"

interface UserStatsProps {
  totalUsers: number
  activeUsers: number
  isLoading: boolean
}

export function UserStats({ totalUsers, activeUsers, isLoading }: UserStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-7 w-20" /> : <div className="text-2xl font-bold">{totalUsers}</div>}
        <p className="text-xs text-muted-foreground">
          {isLoading ? <Skeleton className="h-4 w-28 mt-1" /> : `${activeUsers} active users`}
        </p>
      </CardContent>
    </Card>
  )
}
