"use server"

import { api } from "@/lib/api-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function registerAction(formData: RegisterFormData) {
  try {
    const result = await api.register(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password
    );

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    // Store the token in a cookie
    if (result.token) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: "token",
        value: result.token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    return {
      success: true,
      message: "Registration successful",
    };

    // Determine where to redirect based on user role
    const redirectTo = result.user?.role === "admin" ? "/admin" : "/dashboard";

    redirect(redirectTo);
  } catch (error) {
    console.error("Registration action error:", error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
}
