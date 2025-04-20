"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - in a real app, this would come from the API
const data = [
  { name: "Approved", value: 45 },
  { name: "Pending", value: 30 },
  { name: "Rejected", value: 15 },
  { name: "Paid", value: 10 },
]

const COLORS = ["hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--chart-2))"]

export function LoanStatusChart() {
  return (
    <ChartContainer
      config={{
        approved: {
          label: "Approved",
          color: COLORS[0],
        },
        pending: {
          label: "Pending",
          color: COLORS[1],
        },
        rejected: {
          label: "Rejected",
          color: COLORS[2],
        },
        paid: {
          label: "Paid",
          color: COLORS[3],
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
