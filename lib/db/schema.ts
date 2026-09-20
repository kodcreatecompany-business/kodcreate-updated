import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const enquiries = pgTable("kodcreate_enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId").notNull().default("kodcreate"),
  requestId: uuid("request_id").notNull().unique(),
  payloadHash: text("payload_hash").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  businessName: text("business_name"),
  description: text("description").notNull(),
  budget: text("budget"),
  timeline: text("timeline"),
  emailStatus: text("email_status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const submissionLimits = pgTable("kodcreate_submission_limits", {
  key: text("key").primaryKey(),
  userId: text("userId").notNull().default("kodcreate"),
  count: integer("count").notNull().default(0),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
})
