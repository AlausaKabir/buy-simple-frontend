import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // TODO: Replace with your actual authentication logic
    // This is just a demo endpoint

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo credentials (remove in production)
    if (email === "demo@teamachieve.com" && password === "password123") {
      return NextResponse.json(
        {
          message: "Login successful",
          user: {
            id: 1,
            email: email,
            name: "Demo User",
          },
          token: "demo-jwt-token",
        },
        { status: 200 }
      );
    }

    // Invalid credentials
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
