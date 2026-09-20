import "server-only"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

const globalDatabase = globalThis as unknown as { kodcreatePool?: Pool }
export const pool = globalDatabase.kodcreatePool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 20000,
})
if (process.env.NODE_ENV !== "production") globalDatabase.kodcreatePool = pool
export const db = drizzle(pool, { schema })
export const businessScope = "kodcreate"
