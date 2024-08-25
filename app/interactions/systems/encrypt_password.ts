import { hashSync } from 'bcrypt';

/**
 * Encrypt password.
 * @param password Plain password.
 * @returns Encrypted password.
 */
export default function encryptPassword(password: string): string {
  return hashSync(password, 10);
}
