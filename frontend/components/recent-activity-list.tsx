"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { getRecentActivity } from "@/app/admin/actions"

export function RecentActivityList() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(5)

  useEffect(() => {
    async function loadData() {
      try {
        // Get the 10 most recent activities
        const recentActivities = await getRecentActivity(10)
        setActivities(recentActivities)
      } catch (error) {
        console.error("Failed to load recent activity data:", error)
        // Fallback to empty state
        setActivities([])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center py-8">Loading recent activities...</div>
  }

  if (activities.length === 0) {
    return <div className="flex items-center justify-center py-8">No recent activities available</div>
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {activities.slice(0, displayCount).map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {activity.username ? activity.username.substring(0, 2).toUpperCase() : 'NA'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.username || 'System'}</p>
                {activity.status && (
                  <Badge
                    variant={
                      activity.status === "completed" || activity.status === "approved"
                        ? "default"
                        : activity.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      {displayCount < activities.length && (
        <button
          onClick={() => setDisplayCount(activities.length)}
          className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground"
        >
          View All Activities
        </button>
      )}
    </div>
  )
}
