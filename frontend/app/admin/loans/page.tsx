import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { api } from "@/lib/api-client";
import { DashboardHeader } from "@/components/dashboard-header";
import { AdminLoanList } from "@/components/admin-loan-list";

export default async function AdminLoansPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  if (session.role !== "admin") {
    redirect("/dashboard")
  }

  // Get all loans
  const loanIds = await kv.smembers("loans")
  const loans = await Promise.all(loanIds.map((id) => kv.get(`loan:${id}`)))

  // Filter out any null values
  const validLoans = loans.filter(Boolean)

  return (
    <div className="space-y-6">
      <DashboardHeader title="Loan Management" description="Review and manage loan applications." />

      <AdminLoanList loans={validLoans} />
    </div>
  )
}
