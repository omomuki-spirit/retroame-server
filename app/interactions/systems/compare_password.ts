import { compareSync } from 'bcrypt';

/**
 * Compare password.
 * @param password          Plain password.
 * @param encryptedPassword Encrypted password.
 * @returns result
 */
export default function comparePassword(password: string, encryptedPassword: string): boolean {
  return compareSync(password, encryptedPassword);
}
