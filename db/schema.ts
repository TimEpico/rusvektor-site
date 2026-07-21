import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  direction: text("direction").notNull(),
  service: text("service").notNull(),
  area: integer("area").notNull(),
  detail: integer("detail").notNull(),
  estimate: integer("estimate").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message"),
  status: text("status").notNull().default("new"),
});
