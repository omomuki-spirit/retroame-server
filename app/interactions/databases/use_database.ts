import { PrismaClient } from "/app/.output/prisma/client";

const CLIENT = new PrismaClient();


/**
 * Use database.
 * @param callback
 * @returns Return value of callback
 */
export default function useDatabase<T>(callback: (client: PrismaClient) => T): T {
  return callback(CLIENT);
}
