import { compare, hash } from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isVerify = await compare(password, hashedPassword);

  return isVerify;
}
