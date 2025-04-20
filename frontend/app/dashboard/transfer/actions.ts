"use server"

import { cookies } from "next/headers"
import { api } from "@/lib/api-client"

interface TransferFormData {
  toAccount: string
  amount: number
  description?: string
}

export async function transferAction(formData: TransferFormData) {
  try {
    // Get the token from the cookie
    const token = cookies().get("token")?.value

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to make a transfer",
      }
    }

    // Set the token for the API client
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }

    const result = await api.createTransaction({
      toAccount: formData.toAccount,
      amount: formData.amount,
      description: formData.description || "Transfer",
      type: "transfer",
    })

    return {
      success: true,
      message: result.message,
    }
  } catch (error) {
    console.error("Transfer action error:", error)
    return {
      success: false,
      message: "An error occurred during the transfer",
    }
  }
}
