import { setTimeout } from 'timers/promises';
import useRedis from '../redis/use_redis';
const KEY_PREFIX = 'run_with_mutex/';

/**
 * Run function with mutex.
 * @note Mutex is valid betwween all servers.
 * @param id        Muxtex ID.
 * @param timeout   Unlock timeout.
 * @param expiresIn Lock expiration.
 * @param func      Function to run with mutex.
 * @returns Function return value.
 */
export default async function runWithMutex<T>(id: string, timeout: number, expiresIn: number, func: () => T): Promise<T> {
  let result!: T;
  const key = `${KEY_PREFIX}/${id}`;
  const lockId = Math.random().toString();
  const now = Date.now();

  await useRedis(async (redis) => {
    try {
      while ((await redis.set(key, lockId, { NX: true, EX: expiresIn })) !== 'OK') {
        if (Date.now() - now > timeout) {
          throw new Error(`Mutex timeout (${id}).`);
        }
        await setTimeout(100);
      };

      result = await func();
    } finally {
      if ((await redis.get(key)) === lockId) {
        await redis.del(key);
      }
    }
  });

  return result;
}
