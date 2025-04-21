"use server"

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { api } from "@/lib/api-client";
import { formatDate } from "@/lib/utils";

interface ChartDataPoint {
  date: string;
  transactions: number;
  volume: number;
}

interface TransactionType {
  name: string;
  value: number;
}

interface UserGrowthData {
  date: string;
  users: number;
}

interface LoanStatusData {
  status: string;
  count: number;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  amount?: number;
  status?: string;
  timestamp: string;
  userId?: string;
  username?: string;
}

interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  transactionVolume: number;
  pendingLoans: number;
  approvedLoans: number;
  totalLoanAmount: number;
  chartData: ChartDataPoint[];
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  try {
    // Get general admin stats
    const statsResponse = await api.getAdminStats();
    
    // Get transaction chart data
    const chartResponse = await api.getTransactionChartData(14); // Last 14 days

    if (!statsResponse.success || !statsResponse.data) {
      console.error("Failed to fetch admin stats:", statsResponse.message);
      return {
        totalUsers: 0,
        activeUsers: 0,
        totalTransactions: 0,
        transactionVolume: 0,
        pendingLoans: 0,
        approvedLoans: 0,
        totalLoanAmount: 0,
        chartData: [],
      };
    }

    // Extract stats data from the backend response
    const { 
      total_users = 0, 
      active_users = 0,
      total_transactions = 0, 
      transaction_volume = 0,
      pending_loans = 0, 
      approved_loans = 0,
      total_loan_amount = 0 
    } = statsResponse.data;
    
    // Process chart data
    let chartData: ChartDataPoint[] = [];
    
    if (chartResponse.success && chartResponse.data) {
      chartData = chartResponse.data.map((item: any) => ({
        date: formatDate(new Date(item.date)),
        transactions: item.count || 0,
        volume: item.volume || 0
      }));
    }

    return {
      totalUsers: total_users,
      activeUsers: active_users,
      totalTransactions: total_transactions,
      transactionVolume: transaction_volume,
      pendingLoans: pending_loans,
      approvedLoans: approved_loans,
      totalLoanAmount: total_loan_amount,
      chartData,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      totalTransactions: 0,
      transactionVolume: 0,
      pendingLoans: 0,
      approvedLoans: 0,
      totalLoanAmount: 0,
      chartData: [],
    };
  }
}

export async function getTransactionDistribution(): Promise<TransactionType[]> {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  try {
    const response = await api.getTransactionTypeDistribution();
    
    if (response.success && response.data) {
      return response.data.map((item: any) => ({
        name: item.type,
        value: item.count
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching transaction distribution:", error);
    return [];
  }
}

export async function getUserGrowthData(months: number = 6): Promise<UserGrowthData[]> {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  try {
    const response = await api.getUserGrowthData(months);
    
    if (response.success && response.data) {
      return response.data.map((item: any) => ({
        date: formatDate(new Date(item.date)),
        users: item.count
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching user growth data:", error);
    return [];
  }
}

export async function getLoanStatusDistribution(): Promise<LoanStatusData[]> {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  try {
    const response = await api.getLoanStatusDistribution();
    
    if (response.success && response.data) {
      return response.data.map((item: any) => ({
        status: item.status,
        count: item.count
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching loan status distribution:", error);
    return [];
  }
}

export async function getRecentActivity(limit: number = 10): Promise<Activity[]> {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  try {
    const response = await api.getRecentSystemActivity(limit);
    
    if (response.success && response.data) {
      return response.data.map((item: any) => ({
        id: item.id,
        type: item.type,
        description: item.description,
        amount: item.amount,
        status: item.status,
        timestamp: formatDate(new Date(item.timestamp)),
        userId: item.user_id,
        username: item.username
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return [];
  }
}
