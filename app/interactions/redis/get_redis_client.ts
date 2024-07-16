import type { RedisClientType } from "redis";
import { createClient } from "redis";

export default function createRedisClient(): RedisClientType {
  return createClient({
    url: process.env.RETROAME_REDIS_URL,
  });
}
