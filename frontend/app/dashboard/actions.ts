"use server"

import { getSession } from "@/lib/auth"
import { api } from "@/lib/api-client";

export async function getUserProfile() {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        message: "Not authenticated",
      }
    }

    const userProfileResult = await api.getUserProfile();

    if (!userProfileResult.success || !userProfileResult.data) {
      return {
        success: false,
        message: "User not found",
      }
    }

    const user = userProfileResult.data;

    return {
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountNumber: user.accountNumber,
        balance: user.balance,
      },
    }
  } catch (error) {
    console.error("Get user profile error:", error)
    return {
      success: false,
      message: "An error occurred while fetching user profile",
    }
  }
}
