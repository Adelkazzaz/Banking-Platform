"use server"


import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { api } from "@/lib/api-client";

interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  transactionVolume: number;
  pendingLoans: number;
  approvedLoans: number;
  totalLoanAmount: number;
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  try {
    const response = await api.getAdminStats();

    if (!response.success || !response.data) {
      console.error("Failed to fetch admin stats:", response.message);
      return {
        totalUsers: 0,
        activeUsers: 0,
        totalTransactions: 0,
        transactionVolume: 0,
        pendingLoans: 0,
        approvedLoans: 0,
        totalLoanAmount: 0,
      };
    }

    const { total_users, total_transactions, total_loans } = response.data;

    return {
      totalUsers: total_users,
      activeUsers: 50, // Placeholder for active users
      totalTransactions: total_transactions,
      transactionVolume: 50000, // Placeholder for transaction volume
      pendingLoans: 10, // Placeholder for pending loans
      approvedLoans: 5, // Placeholder for approved loans
      totalLoanAmount: 100000, // Placeholder for total loan amount
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
    };
  }
}
