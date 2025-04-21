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
  getTransactionChartData: async (days: number = 14): Promise<ApiResponse<any>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/transactions/chart?days=${days}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get transaction chart data failed:", error);
      return { success: false, message: "Get transaction chart data failed" };
    }
  },
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get users failed:", error);
      return { success: false, message: "Get users failed" };
    }
  },
  getAdminTransactions: async (): Promise<ApiResponse<Transaction[]>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get admin transactions failed:", error);
      return { success: false, message: "Get admin transactions failed" };
    }
  },
  getAdminLoans: async (): Promise<ApiResponse<Loan[]>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/loans`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get admin loans failed:", error);
      return { success: false, message: "Get admin loans failed" };
    }
  },
  approveLoan: async (loanId: string): Promise<ApiResponse<any>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/loans/${loanId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Approve loan failed:", error);
      return { success: false, message: "Approve loan failed" };
    }
  },
  rejectLoan: async (loanId: string): Promise<ApiResponse<any>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/loans/${loanId}/reject`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Reject loan failed:", error);
      return { success: false, message: "Reject loan failed" };
    }
  },
  getTransactionTypeDistribution: async (): Promise<ApiResponse<any>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/transactions/distribution`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get transaction distribution failed:", error);
      return { success: false, message: "Get transaction distribution failed" };
    }
  },
  getUserGrowthData: async (months: number = 6): Promise<ApiResponse<any>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/users/growth?months=${months}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get user growth data failed:", error);
      return { success: false, message: "Get user growth data failed" };
    }
  },
  getLoanStatusDistribution: async (): Promise<ApiResponse<any>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/loans/distribution`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get loan status distribution failed:", error);
      return { success: false, message: "Get loan status distribution failed" };
    }
  },
  getRecentSystemActivity: async (limit: number = 10): Promise<ApiResponse<any>> => {
    "use server";
    try {
      const token = (await cookies()).get("token")?.value;
      const response = await fetch(`${BASE_URL}/admin/activity?limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get recent activity failed:", error);
      return { success: false, message: "Get recent activity failed" };
    }
  },
}
