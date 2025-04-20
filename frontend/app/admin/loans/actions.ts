"use server"

import { getSession } from "@/lib/auth"
import { api } from "@/lib/api-client"

export async function approveLoanAction(loanId: string) {
  try {
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // Use our API client to approve the loan
    const result = await api.approveLoan(loanId)

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to approve loan",
      }
    }

    return {
      success: true,
      message: "Loan approved successfully",
    }
  } catch (error) {
    console.error("Loan approval error:", error)
    return {
      success: false,
      message: "An error occurred during loan approval",
    }
  }
}

export async function rejectLoanAction(loanId: string) {
  try {
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // Use our API client to reject the loan
    const result = await api.rejectLoan(loanId)

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to reject loan",
      }
    }

    return {
      success: true,
      message: "Loan rejected successfully",
    }
  } catch (error) {
    console.error("Loan rejection error:", error)
    return {
      success: false,
      message: "An error occurred during loan rejection",
    }
  }
}
