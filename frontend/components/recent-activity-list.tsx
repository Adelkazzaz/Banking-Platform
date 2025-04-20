"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

// Sample data - in a real app, this would come from the API
const activities = [
  {
    id: "1",
    type: "transaction",
    user: { name: "John Doe", initials: "JD" },
    description: "Transferred $500 to Sarah Johnson",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    status: "completed",
  },
  {
    id: "2",
    type: "loan",
    user: { name: "Michael Smith", initials: "MS" },
    description: "Applied for a loan of $10,000",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    status: "pending",
  },
  {
    id: "3",
    type: "user",
    user: { name: "Emily Wilson", initials: "EW" },
    description: "Created a new account",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    status: "completed",
  },
  {
    id: "4",
    type: "transaction",
    user: { name: "Robert Brown", initials: "RB" },
    description: "Withdrew $200 from savings account",
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
    status: "completed",
  },
  {
    id: "5",
    type: "loan",
    user: { name: "Jessica Lee", initials: "JL" },
    description: "Loan application of $5,000 was approved",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    status: "approved",
  },
]

export function RecentActivityList() {
  const [displayCount, setDisplayCount] = useState(5)

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {activities.slice(0, displayCount).map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.user.name}</p>
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
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
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
