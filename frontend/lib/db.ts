export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  accountNumber: string
  role: string,
  balance: number,
  createdAt: Date
  updatedAt: Date
}

export type Transaction = {
  id: string
  accountNumber: string
  toAccount: string
  amount: number
  description: string
  type: "transfer" | "deposit" | "withdrawal"
  createdAt: Date
}

export type Loan = {
  id: string
  accountNumber: string
  amount: number
  term: number
  interestRate: number
  requestDate: Date
  status: "pending" | "approved" | "rejected"
  createdAt: Date
}
