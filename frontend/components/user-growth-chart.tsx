"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - in a real app, this would come from the API
const data = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 145 },
  { month: "Mar", users: 162 },
  { month: "Apr", users: 190 },
  { month: "May", users: 210 },
  { month: "Jun", users: 252 },
  { month: "Jul", users: 265 },
  { month: "Aug", users: 290 },
  { month: "Sep", users: 310 },
  { month: "Oct", users: 325 },
  { month: "Nov", users: 340 },
  { month: "Dec", users: 375 },
]

export function UserGrowthChart() {
  return (
    <ChartContainer
      config={{
        users: {
          label: "Users",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="users"
            stroke="var(--color-users)"
            fill="var(--color-users)"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
