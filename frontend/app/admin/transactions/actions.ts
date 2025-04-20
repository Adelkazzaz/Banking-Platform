"use server"

import { getSession } from "@/lib/auth"
import { api } from "@/lib/api-client";

export async function getAllTransactions() {
  try {
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return {
        success: false,
        message: "Not authorized",
      }
    }

    // Use the admin-specific transactions endpoint
    const transactionResult = await api.getAdminTransactions();

    if (!transactionResult.success || !transactionResult.data) {
      return {
        success: false,
        message: "Failed to fetch transactions",
        transactions: [],
      };
    }

    return {
      success: true,
      transactions: transactionResult.data,
    };
  } catch (error) {
    console.error("Get all transactions error:", error)
    return {
      success: false,
      message: "An error occurred while fetching transactions",
      transactions: [],
    }
  }
}
