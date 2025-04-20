"use server"

import { getSession } from "@/lib/auth"
import { api } from "@/lib/api-client"

export async function getUserTransactions() {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        message: "Not authenticated",
      }
    }

    // Get transactions using our API client
    const transactionResponse = await api.getTransactions()
    
    if (!transactionResponse.success || !transactionResponse.data) {
      return {
        success: false,
        message: transactionResponse.message || "Failed to fetch transactions",
        transactions: [],
      }
    }

    return {
      success: true,
      transactions: transactionResponse.data,
    }
  } catch (error) {
    console.error("Get transactions error:", error)
    return {
      success: false,
      message: "An error occurred while fetching transactions",
      transactions: [],
    }
  }
}
