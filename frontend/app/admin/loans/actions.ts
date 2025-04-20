"use server"

import { getSession } from "@/lib/auth"
import { updateLoanStatus } from "@/lib/db"

export async function approveLoanAction(loanId: string) {
  try {
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const result = await updateLoanStatus(loanId, "approved")

    if (!result) {
      return {
        success: false,
        message: "Failed to approve loan",
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

    const result = await updateLoanStatus(loanId, "rejected")

    if (!result) {
      return {
        success: false,
        message: "Failed to reject loan",
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
