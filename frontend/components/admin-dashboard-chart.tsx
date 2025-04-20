"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - in a real app, this would come from the API
const data = [
  { date: "Jan 1", transactions: 120, volume: 12500 },
  { date: "Jan 2", transactions: 145, volume: 15000 },
  { date: "Jan 3", transactions: 132, volume: 13200 },
  { date: "Jan 4", transactions: 165, volume: 16800 },
  { date: "Jan 5", transactions: 178, volume: 18100 },
  { date: "Jan 6", transactions: 154, volume: 15900 },
  { date: "Jan 7", transactions: 189, volume: 19500 },
  { date: "Jan 8", transactions: 176, volume: 18200 },
  { date: "Jan 9", transactions: 198, volume: 20100 },
  { date: "Jan 10", transactions: 187, volume: 19200 },
  { date: "Jan 11", transactions: 210, volume: 21500 },
  { date: "Jan 12", transactions: 230, volume: 23600 },
  { date: "Jan 13", transactions: 215, volume: 22000 },
  { date: "Jan 14", transactions: 245, volume: 25100 },
]

export function AdminDashboardChart() {
  return (
    <ChartContainer
      config={{
        transactions: {
          label: "Transactions",
          color: "hsl(var(--chart-1))",
        },
        volume: {
          label: "Volume ($)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="transactions"
            stroke="var(--color-transactions)"
            name="Transactions"
          />
          <Line yAxisId="right" type="monotone" dataKey="volume" stroke="var(--color-volume)" name="Volume ($)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
