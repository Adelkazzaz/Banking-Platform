import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getUserById, getUserTransactions } from "@/lib/db"
import { DashboardHeader } from "@/components/dashboard-header"
import { TransactionList } from "@/components/transaction-list"

export default async function TransactionsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const user = await getUserById(session.id)

  if (!user) {
    redirect("/login")
  }

  const transactions = await getUserTransactions(user.accountNumber)

  return (
    <div className="space-y-6">
      <DashboardHeader title="Transaction History" description="View all your past transactions." />

      <TransactionList transactions={transactions} />
    </div>
  )
}
