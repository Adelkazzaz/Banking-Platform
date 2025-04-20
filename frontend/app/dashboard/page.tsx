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

  // Fetch user profile from the backend API
  const userProfileResult = await api.getUserProfile();

  if (!userProfileResult.success || !userProfileResult.data) {
    console.error("Failed to fetch user profile:", userProfileResult.message);
    // Handle error appropriately, e.g., display an error message to the user
    return <div>Error: Failed to load user profile</div>;
  }

  const user = userProfileResult.data;

  // Fetch transactions from the backend API
  const transactionsResult = await api.getTransactions();

  if (!transactionsResult.success || !transactionsResult.data) {
    console.error("Failed to fetch transactions:", transactionsResult.message);
    // Handle error appropriately, e.g., display an error message to the user
    return <div>Error: Failed to load transactions</div>;
  }

  const transactions = transactionsResult.data;

  // Fetch loans from the backend API
  const loansResult = await api.getLoans();

  if (!loansResult.success || !loansResult.data) {
    console.error("Failed to fetch loans:", loansResult.message);
    // Handle error appropriately, e.g., display an error message to the user
    return <div>Error: Failed to load loans</div>;
  }

  const loans = loansResult.data;

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
  );
}
