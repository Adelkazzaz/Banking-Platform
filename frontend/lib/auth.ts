import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtVerify, SignJWT } from "jose"
import bcrypt from "bcryptjs"
import type { User } from "./db"
import { api } from "./api-client"

// Secret key for JWT
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_jwt_secret_key_change_in_production")

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const result = await api.login(email, password);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    // Create session
    const session = await createSession(result.user!);

    return { success: true, message: "Login successful", user: result.user };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }
}

export async function createSession(user: User): Promise<string> {
  // Create a JWT token
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  // Set the token in a cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
  })

  return token
}

export async function getSession(): Promise<{ id: string; email: string; role: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("token")

  if (!sessionCookie?.value) {
    return null
  }

  try {
    const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET)
    return payload as { id: string; email: string; role: string }
  } catch (error) {
    console.error("Session verification error:", error)
    return null
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token")
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}

export async function requireAdmin() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  if (session.role !== "admin") {
    redirect("/dashboard")
  }

  return session
}
