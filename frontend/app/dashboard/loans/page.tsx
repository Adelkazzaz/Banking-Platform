import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getUserById, getUserLoans } from "@/lib/db"
import { DashboardHeader } from "@/components/dashboard-header"
import { LoanList } from "@/components/loan-list"
import { NewLoanApplication } from "@/components/new-loan-application"

export default async function LoansPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const user = await getUserById(session.id)

  if (!user) {
    redirect("/login")
  }

  const loans = await getUserLoans(user.id)

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
