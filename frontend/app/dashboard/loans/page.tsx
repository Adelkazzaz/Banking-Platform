import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { api } from "@/lib/api-client"
import { DashboardHeader } from "@/components/dashboard-header"
import { LoanList } from "@/components/loan-list"
import { NewLoanApplication } from "@/components/new-loan-application"

export default async function LoansPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  // Get user profile and loans from our backend API
  const userResponse = await api.getUserProfile()
  const user = userResponse.success && userResponse.data ? userResponse.data : null

  if (!user) {
    redirect("/login")
  }

  // Get user loans from our backend API
  const loansResponse = await api.getLoans()
  const loans = loansResponse.success && loansResponse.data ? loansResponse.data : []

  return (
    <div className="space-y-6">
      <DashboardHeader title="Loans" description="Apply for a loan or check your existing loans." />

      <div className="grid gap-6 md:grid-cols-2">
        <LoanList loans={loans} />
        <NewLoanApplication userId={user.id} />
      </div>
    </div>
  )
}
