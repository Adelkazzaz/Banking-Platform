"use server"

import { cookies } from "next/headers"
import { api } from "@/lib/api-client"

interface DepositFormData {
  amount: number
  description?: string
}

export async function depositAction(formData: DepositFormData) {
  try {
    const token = cookies().get("token")?.value

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to make a deposit",
      }
    }

    // We don't need to set the token in localStorage for server actions

    const result = await api.createTransaction({
      toAccount: "", // Backend determines the account from the user session
      amount: formData.amount,
      description: formData.description || "Deposit",
      type: "deposit",
    })

    return {
      success: result.success,
      message: result.message || (result.success ? "Deposit successful" : "Deposit failed"),
    }
  } catch (error) {
    console.error("Deposit action error:", error)
    return {
      success: false,
      message: "An error occurred during the deposit",
    }
  }
}
