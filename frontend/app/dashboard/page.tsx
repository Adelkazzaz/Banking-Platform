import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { api } from "@/lib/api-client";
import { DashboardHeader } from "@/components/dashboard-header";
import { AccountSummary } from "@/components/account-summary";
import { RecentTransactions } from "@/components/recent-transactions";
import { LoanStatus } from "@/components/loan-status";
import { QuickActions } from "@/components/quick-actions";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Get user profile using our API client
  const userResponse = await api.getUserProfile();
  const user = userResponse.success && userResponse.data ? userResponse.data : null;

  if (!user) {
    redirect("/login");
  }

  // Get user transactions from our backend API
  const transactionsResponse = await api.getTransactions();
  const transactions = transactionsResponse.success && transactionsResponse.data ? transactionsResponse.data : [];
  
  // Get user loans from our backend API
  const loansResponse = await api.getLoans();
  const loans = loansResponse.success && loansResponse.data ? loansResponse.data : [];

  return (
    <div className="space-y-6">
      <DashboardHeader title="Dashboard" description="Welcome back, manage your finances with ease." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AccountSummary user={user} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentTransactions transactions={transactions.slice(0, 5)} />
        <div className="space-y-6">
          <LoanStatus loans={loans} />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
