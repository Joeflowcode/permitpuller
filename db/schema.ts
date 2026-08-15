import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const signups = pgTable(
  "signups",
  {
    contactKey: text("contact_key").primaryKey(),
    name: text("name").notNull(),
    trade: text("trade").notNull(),
    contact: text("contact").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("signups_contact_key_idx").on(table.contactKey)],
);
