"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { formatDate } from "@/lib/utils"

interface ChartDataPoint {
  date: string
  transactions: number
  volume: number
}

interface AdminDashboardChartProps {
  chartData?: ChartDataPoint[]
  isLoading?: boolean
}

export function AdminDashboardChart({ chartData, isLoading = false }: AdminDashboardChartProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Use provided data or fallback to empty array if loading or no data
  const data = chartData || []
  
  // For mobile, show less data points
  const displayData = isMobile ? data.filter((_, i) => i % 2 === 0) : data

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
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">Loading chart data...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No transaction data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickFormatter={isMobile ? (value) => value.split(" ")[1] : undefined}
            />
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
              strokeWidth={2}
              dot={!isMobile}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="var(--color-volume)"
              name="Volume ($)"
              strokeWidth={2}
              dot={!isMobile}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  )
}
