import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { api } from "@/lib/api-client";
import { DashboardHeader } from "@/components/dashboard-header";
import { AdminLoanList } from "@/components/admin-loan-list";

export default async function AdminLoansPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "admin") {
    redirect("/dashboard");
  }

  const loansResult = await api.getLoans();

  if (!loansResult.success || !loansResult.data) {
    console.error("Failed to fetch loans:", loansResult.message);
    return <div>Error: Failed to load loans</div>;
  }

  const loans = loansResult.data;

  return (
    <div className="space-y-6">
      <DashboardHeader title="Loan Management" description="Review and manage loan applications." />

      <AdminLoanList loans={loans} />
    </div>
  );
}
