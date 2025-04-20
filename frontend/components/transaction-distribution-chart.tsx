"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - in a real app, this would come from the API
const data = [
  { name: "Transfers", value: 540 },
  { name: "Deposits", value: 320 },
  { name: "Withdrawals", value: 210 },
  { name: "Loan Payments", value: 130 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export function TransactionDistributionChart() {
  return (
    <ChartContainer
      config={{
        transfers: {
          label: "Transfers",
          color: COLORS[0],
        },
        deposits: {
          label: "Deposits",
          color: COLORS[1],
        },
        withdrawals: {
          label: "Withdrawals",
          color: COLORS[2],
        },
        loanPayments: {
          label: "Loan Payments",
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
