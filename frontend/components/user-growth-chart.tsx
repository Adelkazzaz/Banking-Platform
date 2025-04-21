"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { getUserGrowthData } from "@/app/admin/actions"

export function UserGrowthChart() {
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
        // Get user growth data for the past 12 months
        const growthData = await getUserGrowthData(12)
        setData(growthData)
      } catch (error) {
        console.error("Failed to load user growth data:", error)
        // Fallback to empty state
        setData([])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center h-[300px]">Loading user growth data...</div>
  }

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-[300px]">No user growth data available</div>
  }

  // For mobile, use a subset of data to reduce clutter
  const displayData = isMobile ? data.filter((_, i) => i % 2 === 0) : data

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
        <AreaChart data={displayData} margin={{ top: 10, right: isMobile ? 10 : 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <YAxis 
            width={isMobile ? 35 : 50}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={isMobile ? (value) => value : undefined}
          />
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
