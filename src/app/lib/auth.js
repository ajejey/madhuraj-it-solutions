 "use server"
// Authentication utilities
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getJwtSecretKey() {
 
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');


  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(
      token.value,
      await getJwtSecretKey()
    );
    return verified.payload;
  } catch (err) {
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
