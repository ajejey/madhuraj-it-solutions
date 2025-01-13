 'use server';
// Authentication utilities
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getJwtSecretKey() {
 console.log("process.env.JWT_SECRET in getJwtSecretKey", process.env.JWT_SECRET);
  // return new TextEncoder().encode(process.env.JWT_SECRET);
  return new TextEncoder().encode("madhurajsystemssolutions_secret_key");
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  console.log("token in verify auth", token);


  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(
      token.value,
      await getJwtSecretKey()
    );
    console.log("verified in verify auth", verified);
    return verified.payload;
  } catch (err) {
    return null;
  }
}

export async function requireAuth() {
  const user = await verifyAuth();
  console.log("user in require auth", user);
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function requireRole(allowedRoles) {
  console.log("allowedRoles in require role", allowedRoles);
  const user = await requireAuth();
  console.log("user in require role", user);
  console.log("user role in require role", user.role);
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Unauthorized');
  }
  return user;
}
