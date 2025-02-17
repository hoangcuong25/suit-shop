import Redis from "ioredis"
import 'dotenv/config'

const client = new Redis(process.env.UPSTASH_REDIS_URL)

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
