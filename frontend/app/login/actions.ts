"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { api } from "@/lib/api-client";

interface LoginFormData {
  email: string
  password: string
}


export async function loginAction(formData: LoginFormData) {
  try {
    const result = await api.login(formData.email, formData.password)

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      }
    }

    // Store the token in a cookie
    const cookieStore = await cookies();
    if (result.token) {
      await cookieStore.set({
        name: "token",
        value: result.token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    // Determine where to redirect based on user role
    const redirectTo = result.user?.role === "admin" ? "/admin" : "/dashboard";

    return {
      success: true,
      message: "Login successful",
      redirectTo,
    };
  } catch (error) {
    console.error("Login action error:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}

import { logout } from "@/lib/auth";

export async function logoutAction() {
  await logout();
  redirect("/login");
}
