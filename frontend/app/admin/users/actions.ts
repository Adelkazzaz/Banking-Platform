"use server"

import { getSession } from "@/lib/auth"
import { api } from "@/lib/api-client"

export async function getAllUsers() {
  try {
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return {
        success: false,
        message: "Not authorized",
      }
    }

    // Get users using our API client
    const response = await api.getUsers();
    
    if (!response.success || !response.data) {
      return {
        success: false,
        message: response.message || "Failed to fetch users",
        users: [],
      }
    }

    return {
      success: true,
      users: response.data,
    };
  } catch (error) {
    console.error("Get all users error:", error)
    return {
      success: false,
      message: "An error occurred while fetching users",
      users: [],
    }
  }
}
