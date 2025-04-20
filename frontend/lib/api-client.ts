import type { User, Transaction, Loan } from "@/lib/db"
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  token?: string
  user?: User
  transaction?: Transaction
  loan?: Loan
}

export const api = {
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> => {
    "use server"
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Login failed:", error)
      return { success: false, message: "Login failed" }
    }
  },
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<ApiResponse<User>> => {
    "use server"
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Registration failed:", error)
      return { success: false, message: "Registration failed" }
    }
  },
  getUserProfile: async (): Promise<ApiResponse<User>> => {
    "use server"
    try {
      const token = (await cookies()).get("token")?.value;

      const response = await fetch(`${BASE_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Get user profile failed:", error)
      return { success: false, message: "Get user profile failed" }
    }
  },
  createTransaction: async (transactionData: {
    toAccount: string
    amount: number
    description: string
    type: "transfer" | "deposit" | "withdrawal"
  }): Promise<ApiResponse<Transaction>> => {
    "use server"
    try {
      const token = (await cookies()).get("token")?.value;

      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Create transaction failed:", error)
      return { success: false, message: "Create transaction failed" }
    }
  },
  getTransactions: async (): Promise<ApiResponse<Transaction[]>> => {
    "use server"
    try {
      const token = (await cookies()).get("token")?.value;

      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Get transactions failed:", error)
      return { success: false, message: "Get transactions failed" }
    }
  },
  createLoan: async (loanData: { amount: number; term: number }): Promise<ApiResponse<Loan>> => {
    "use server"
    try {
      const token = (await cookies()).get("token")?.value;

      const response = await fetch(`${BASE_URL}/loans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(loanData),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Create loan failed:", error)
      return { success: false, message: "Create loan failed" }
    }
  },
  getLoans: async (): Promise<ApiResponse<Loan[]>> => {
    "use server"
    try {
      const token = (await cookies()).get("token")?.value;

      const response = await fetch(`${BASE_URL}/loans`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Get loans failed:", error)
      return { success: false, message: "Get loans failed" }
    }
  },
  getAdminStats: async (): Promise<ApiResponse<any>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get admin stats failed:", error);
      return { success: false, message: "Get admin stats failed" };
    }
  },
}
