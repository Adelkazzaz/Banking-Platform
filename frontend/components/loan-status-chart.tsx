"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { getLoanStatusDistribution } from "@/app/admin/actions"

const COLORS = ["hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--chart-2))"]

export function LoanStatusChart() {
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
        const loanData = await getLoanStatusDistribution()
        // Map backend data to the format expected by the chart
        const formattedData = loanData.map(item => ({
          name: item.status.charAt(0).toUpperCase() + item.status.slice(1), // Capitalize status
          value: item.count
        }))
        setData(formattedData)
      } catch (error) {
        console.error("Failed to load loan status data:", error)
        // Fallback to empty state
        setData([])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center h-[300px]">Loading loan status data...</div>
  }

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-[300px]">No loan status data available</div>
  }

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
