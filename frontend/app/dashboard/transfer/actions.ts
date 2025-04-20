"use server"

import { cookies } from "next/headers"
import { api } from "@/lib/api-client"

interface TransferFormData {
  toAccount: string
  amount: number
  description?: string
}

export async function transferAction(formData: TransferFormData) {
  try {
    // Get the token from the cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to make a transfer",
      };
    }

    const result = await api.createTransaction({
      toAccount: formData.toAccount,
      amount: formData.amount,
      description: formData.description || "Transfer",
      type: "transfer",
    });

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Transfer action error:", error);
    return {
      success: false,
      message: "An error occurred during the transfer",
    };
  }
}
