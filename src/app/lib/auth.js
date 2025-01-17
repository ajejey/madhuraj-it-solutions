 'use server';
// Authentication utilities
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // console.error("JWT_SECRET is not defined in environment variables");
    throw new Error("JWT_SECRET is not configured");
  }
  // console.log("JWT_SECRET is configured:", !!secret);
  return new TextEncoder().encode(secret);
}

export async function verifyAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
    // console.log("Attempting to verify auth token:", !!token);

    if (!token) {
      console.log("No auth token found in cookies");
      return null;
    }

    try {
      const { payload } = await jwtVerify(
        token.value,
        await getJwtSecretKey()
      );
      // console.log("Token verified successfully, payload:", payload);
      return payload;
    } catch (err) {
      // console.error("Token verification failed:", err.message);
      return null;
    }
  } catch (err) {
    console.error("Error in verifyAuth:", err);
    return null;
  }
}

export async function requireAuth() {
  const user = await verifyAuth();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function requireRole(allowedRoles) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Unauthorized');
  }
  return user;
}
