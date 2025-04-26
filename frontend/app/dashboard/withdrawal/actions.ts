"use server"

import { cookies } from "next/headers"
import { api } from "@/lib/api-client"

interface WithdrawalFormData {
  amount: number
  description?: string
}

export async function withdrawalAction(formData: WithdrawalFormData) {
  try {
    const token = cookies().get("token")?.value

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to make a withdrawal",
      }
    }

    // We don't need to set the token in localStorage for server actions

    const result = await api.createTransaction({
      toAccount: "", // Not needed for withdrawal, backend uses user session
      amount: formData.amount,
      description: formData.description || "Withdrawal",
      type: "withdrawal",
    })

    return {
      success: result.success,
      message: result.message || (result.success ? "Withdrawal successful" : "Withdrawal failed"),
    }
  } catch (error) {
    console.error("Withdrawal action error:", error)
    return {
      success: false,
      message: "An error occurred during the withdrawal",
    }
  }
}
