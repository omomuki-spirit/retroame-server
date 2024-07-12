import { PrismaClient } from "/app/.output/prisma/client";

const CLIENT = new PrismaClient();


/**
 * Use database.
 * @param callback
 * @returns Return value of callback
 */
export default function useDatabase<RT>(callback: (client: PrismaClient) => RT): RT {
  return callback(CLIENT);
}
