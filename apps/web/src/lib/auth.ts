import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

const SECRET = new TextEncoder().encode(
  process.env['JWT_SECRET'] ?? 'dev-secret-change-in-production'
)

export interface Session {
  email: string
  name?: string | null
  iat?: number
  exp?: number
}

export async function createSession(
  email: string,
  name?: string | null
): Promise<string> {
  return new SignJWT({ email, name })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET)
}

export async function getSession(
  token: string | undefined
): Promise<Session | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as Session
  } catch {
    return null
  }
}

export function isAdmin(email: string): boolean {
  const admins = (process.env['ADMIN_EMAIL'] ?? 'CEO@epicai.ai')
    .split(',')
    .map((e) => e.trim().toLowerCase())
  return admins.includes(email.toLowerCase())
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
