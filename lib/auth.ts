import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function validateMasterPassword(inputPassword: string): boolean {
  const masterPassword = process.env.ADMIN_MASTER_PASSWORD;
  if (!masterPassword) {
    throw new Error("Master password not configured");
  }
  return inputPassword === masterPassword;
}

