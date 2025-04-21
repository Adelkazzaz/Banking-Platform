"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { getTransactionDistribution } from "@/app/admin/actions"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export function TransactionDistributionChart() {
  const [isMobile, setIsMobile] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
    async function loadData() {
      try {
        const transactionData = await getTransactionDistribution()
        setData(transactionData)
      } catch (error) {
        console.error("Failed to load transaction distribution data:", error)
        // Fallback to empty state
        setData([])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center h-[300px]">Loading transaction data...</div>
  }

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-[300px]">No transaction data available</div>
  }

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
        <PieChart margin={isMobile ? { top: 0, right: 0, bottom: 0, left: 0 } : { top: 10, right: 10, left: 10, bottom: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={isMobile ? 60 : 80}
            fill="#8884d8"
            dataKey="value"
            label={isMobile ? undefined : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
          <Legend layout={isMobile ? "horizontal" : "vertical"} verticalAlign={isMobile ? "bottom" : "middle"} align={isMobile ? "center" : "right"} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
