"use server"

import { getSession } from "@/lib/auth"
import { api } from "@/lib/api-client"

interface LoanFormData {
  amount: number
  term: number
}

export async function applyForLoanAction(formData: LoanFormData) {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        message: "You must be logged in to apply for a loan",
      }
    }

    // Get user profile using our API client
    const userResponse = await api.getUserProfile()
    const user = userResponse.success && userResponse.data ? userResponse.data : null

    if (!user) {
      return {
        success: false,
        message: "User not found",
      }
    }

    // Create loan using our API client
    const loanResponse = await api.createLoan({
      amount: formData.amount,
      term: formData.term,
    })

    if (!loanResponse.success) {
      return {
        success: false,
        message: loanResponse.message || "Failed to create loan",
      }
    }

    return {
      success: true,
      message: "Loan application submitted successfully",
    }
  } catch (error) {
    console.error("Loan application error:", error)
    return {
      success: false,
      message: "An error occurred during the loan application",
    }
  }
}
