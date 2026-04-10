import { decimal, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const roastModeEnum = pgEnum("roast_mode", ["brutal", "sarcasm"]);
export const languageEnum = pgEnum("language", [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "csharp",
  "php",
  "html",
  "css",
  "sql",
]);

export const roasts = pgTable("roasts", {
  id: uuid().primaryKey().defaultRandom(),
  codeContent: text().notNull(),
  language: languageEnum().notNull(),
  mode: roastModeEnum().notNull(),
  score: decimal({ precision: 3, scale: 1 }).notNull(),
  roastText: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
