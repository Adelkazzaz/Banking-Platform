"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { formatDate, formatCurrency } from "@/lib/utils"

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
  
  // Prepare data with formatted date for display
  const displayData = data.map(item => ({
    ...item,
    // Format date as 'Mon Day' (e.g., 'Apr 26')
    displayDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  // For mobile, show less data points to reduce clutter
  // const displayData = isMobile ? data.filter((_, i) => i % 3 === 0) : data // Keep original data density for now

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
          {/* Use the mapped displayData */}
          <LineChart data={displayData} margin={{ top: 5, right: isMobile ? 5 : 10, left: isMobile ? -15 : 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="displayDate" // Use the formatted displayDate
              tick={{ fontSize: isMobile ? 9 : 11 }} // Slightly smaller font for non-mobile too
              // tickFormatter removed as displayDate is pre-formatted
              interval="preserveStartEnd" // Helps prevent label collision
              // angle={isMobile ? 0 : -30} // Optional: Rotate labels if still overlapping
              // textAnchor={isMobile ? "middle" : "end"} // Optional: Adjust anchor if rotating
            />
            <YAxis 
              yAxisId="left" 
              width={isMobile ? 30 : 40}
              tick={{ fontSize: isMobile ? 9 : 12 }}
              tickFormatter={(value) => isMobile ? String(value) : value}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              width={isMobile ? 35 : 50}
              tick={{ fontSize: isMobile ? 9 : 12 }}
              tickFormatter={(value) => isMobile ? `$${value}` : `$${value}`}
            />
            {/* Ensure Tooltip uses the original date or formats displayDate correctly */}
            <ChartTooltip 
              content={<ChartTooltipContent 
                labelFormatter={(label, payload) => {
                  // Find the original data point to show the full date in tooltip
                  const originalPoint = data.find(p => new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === label);
                  return originalPoint ? new Date(originalPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : label;
                }}
              />}
            />
            <Legend wrapperStyle={isMobile ? { fontSize: "10px" } : undefined} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="transactions"
              stroke="var(--color-transactions)"
              name="Transactions"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={!isMobile}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="var(--color-volume)"
              name="Volume ($)"
              strokeWidth={isMobile ? 1.5 : 2}
              dot={!isMobile}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  )
}
