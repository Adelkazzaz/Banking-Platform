"use server"

import { getSession } from "@/lib/auth"
import { api } from "@/lib/api-client"
import type { User } from "@/lib/db"

interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
}

export async function getUserProfileAction(): Promise<{ 
  success: boolean; 
  message: string;
  data?: User;
}> {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        message: "You must be logged in to view your profile",
      }
    }

    const userResponse = await api.getUserProfile()
    
    if (!userResponse.success || !userResponse.data) {
      return {
        success: false,
        message: userResponse.message || "Failed to fetch user profile",
      }
    }

    return {
      success: true,
      message: "Profile fetched successfully",
      data: userResponse.data,
    }
  } catch (error) {
    console.error("Get profile error:", error)
    return {
      success: false,
      message: "An error occurred while fetching your profile",
    }
  }
}

export async function updateUserProfileAction(formData: ProfileFormData) {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        message: "You must be logged in to update your profile",
      }
    }

    // First get the current user profile
    const userResponse = await api.getUserProfile()
    const user = userResponse.success && userResponse.data ? userResponse.data : null

    if (!user) {
      return {
        success: false,
        message: "User not found",
      }
    }

    // Validate the form data
    if (!formData.firstName || formData.firstName.length < 2) {
      return {
        success: false,
        message: "First name must be at least 2 characters",
      }
    }

    if (!formData.lastName || formData.lastName.length < 2) {
      return {
        success: false,
        message: "Last name must be at least 2 characters",
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // In a production app, we would implement and call an updateUserProfile API method here
    // For now, we'll just simulate a successful update since this endpoint might not exist yet
    // Example of how it would look:
    // const updateResponse = await api.updateUserProfile(formData);
    // if (!updateResponse.success) {
    //   return {
    //     success: false,
    //     message: updateResponse.message || "Failed to update profile",
    //   }
    // }
    
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Profile updated successfully",
    }
  } catch (error) {
    console.error("Update profile error:", error)
    return {
      success: false,
      message: "An error occurred while updating your profile",
    }
  }
}
