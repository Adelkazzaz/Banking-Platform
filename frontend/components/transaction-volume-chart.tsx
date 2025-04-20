"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { formatCurrency } from "@/lib/utils"

interface Transaction {
  id: string
  fromAccount: string
  toAccount: string
  amount: number
  description: string
  timestamp: string
  type: "transfer" | "deposit" | "withdrawal"
  status: "completed" | "pending" | "failed"
}

interface TransactionVolumeChartProps {
  transactions: Transaction[]
}

export function TransactionVolumeChart({ transactions }: TransactionVolumeChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
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

  useEffect(() => {
    // Group transactions by day
    const groupedByDay: Record<string, { date: string; transfers: number; deposits: number; withdrawals: number }> = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.timestamp)
      const dateStr = date.toISOString().split("T")[0]

      if (!groupedByDay[dateStr]) {
        groupedByDay[dateStr] = {
          date: new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          transfers: 0,
          deposits: 0,
          withdrawals: 0,
        }
      }

      if (transaction.type === "transfer") {
        groupedByDay[dateStr].transfers += transaction.amount
      } else if (transaction.type === "deposit") {
        groupedByDay[dateStr].deposits += transaction.amount
      } else if (transaction.type === "withdrawal") {
        groupedByDay[dateStr].withdrawals += transaction.amount
      }
    })

    // Convert to array for chart
    const data = Object.values(groupedByDay)

    // Sort by date
    data.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    // Limit to last 14 days for better visualization
    setChartData(data.slice(-14))
  }, [transactions])

  return (
    <ChartContainer
      config={{
        transfers: {
          label: "Transfers",
          color: "hsl(var(--chart-1))",
        },
        deposits: {
          label: "Deposits",
          color: "hsl(var(--chart-3))",
        },
        withdrawals: {
          label: "Withdrawals",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: isMobile ? 10 : 12 }} />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            width={isMobile ? 40 : 60}
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <Tooltip content={<ChartTooltipContent />} formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Area
            type="monotone"
            dataKey="transfers"
            stackId="1"
            stroke="var(--color-transfers)"
            fill="var(--color-transfers)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="deposits"
            stackId="1"
            stroke="var(--color-deposits)"
            fill="var(--color-deposits)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="withdrawals"
            stackId="1"
            stroke="var(--color-withdrawals)"
            fill="var(--color-withdrawals)"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
