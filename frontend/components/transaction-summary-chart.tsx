"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
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

interface TransactionSummaryChartProps {
  transactions: Transaction[]
}

export function TransactionSummaryChart({ transactions }: TransactionSummaryChartProps) {
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
    // Group transactions by month
    const groupedByMonth: Record<string, { deposits: number; withdrawals: number; transfers: number }> = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.timestamp)
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`

      if (!groupedByMonth[monthYear]) {
        groupedByMonth[monthYear] = { deposits: 0, withdrawals: 0, transfers: 0 }
      }

      if (transaction.type === "deposit") {
        groupedByMonth[monthYear].deposits += transaction.amount
      } else if (transaction.type === "withdrawal") {
        groupedByMonth[monthYear].withdrawals += transaction.amount
      } else if (transaction.type === "transfer") {
        groupedByMonth[monthYear].transfers += transaction.amount
      }
    })

    // Convert to array for chart
    const data = Object.entries(groupedByMonth).map(([month, values]) => ({
      month,
      ...values,
    }))

    // Sort by date
    data.sort((a, b) => {
      const [aMonth, aYear] = a.month.split(" ")
      const [bMonth, bYear] = b.month.split(" ")

      if (aYear !== bYear) {
        return Number.parseInt(aYear) - Number.parseInt(bYear)
      }

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return months.indexOf(aMonth) - months.indexOf(bMonth)
    })

    // Limit to last 6 months for better visualization
    setChartData(data.slice(-6))
  }, [transactions])

  return (
    <ChartContainer
      config={{
        deposits: {
          label: "Deposits",
          color: "hsl(var(--chart-3))",
        },
        withdrawals: {
          label: "Withdrawals",
          color: "hsl(var(--chart-5))",
        },
        transfers: {
          label: "Transfers",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={isMobile ? (value) => value.split(" ")[0] : undefined}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            width={isMobile ? 40 : 60}
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <Tooltip content={<ChartTooltipContent />} formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Bar dataKey="deposits" fill="var(--color-deposits)" name="Deposits" />
          <Bar dataKey="withdrawals" fill="var(--color-withdrawals)" name="Withdrawals" />
          <Bar dataKey="transfers" fill="var(--color-transfers)" name="Transfers" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
