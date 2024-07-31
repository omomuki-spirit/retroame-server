import { createClient } from "redis";

const CLIENT = createClient({
  url: process.env.RETROAME_REDIS_URL,
});

/**
 * Use redis.
 * @param callback
 * @returns Return value of callback
 */
export default async function useRedis<T>(callback: (client: typeof CLIENT) => T): Promise<T> {
  if (!CLIENT.isReady) {
    await CLIENT.connect();
  }

  return callback(CLIENT);
}
