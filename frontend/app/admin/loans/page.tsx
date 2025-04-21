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

  // Get all loans from our backend API using the admin endpoint
  const response = await api.getAdminLoans();
  
  // Handle different possible response formats
  let loans = [];
  if (response.success) {
    // Check if data is directly an array or if it's in the 'loans' property
    if (Array.isArray(response.data)) {
      loans = response.data;
    } else if (response.data && Array.isArray(response.data.loans)) {
      loans = response.data.loans;
    } else if (Array.isArray(response.loans)) {
      loans = response.loans;
    }
  }

  return (
    <div className="space-y-6">
      <DashboardHeader title="Loan Management" description="Review and manage loan applications." />

      <AdminLoanList loans={loans} />
    </div>
  )
}
