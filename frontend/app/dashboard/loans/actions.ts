"use server"

import { getSession } from "@/lib/auth"
import { getUserById, createLoan } from "@/lib/db"

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

    const user = await getUserById(session.id)

    if (!user) {
      return {
        success: false,
        message: "User not found",
      }
    }

    // Calculate interest rate based on term
    // This is a simple example - in a real app, this would be more complex
    const interestRate = 5 + formData.term / 12 // Base rate + term adjustment

    // Create loan application
    await createLoan({
      userId: user.id,
      amount: formData.amount,
      term: formData.term,
      interestRate,
    })

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
