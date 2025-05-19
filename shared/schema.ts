import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Mood entries schema
export const moodEntries = pgTable("mood_entries", {
  id: serial("id").primaryKey(),
  emoji: text("emoji").notNull(),
  moodName: text("mood_name").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMoodEntrySchema = createInsertSchema(moodEntries).pick({
  emoji: true,
  moodName: true,
  note: true,
});

export type InsertMoodEntry = z.infer<typeof insertMoodEntrySchema>;
export type MoodEntry = typeof moodEntries.$inferSelect;

// For the frontend, we'll use a simplified structure with local storage
export const moodEntrySchema = z.object({
  id: z.string(),
  emoji: z.string(),
  moodName: z.string(),
  note: z.string().optional(),
  createdAt: z.string()
});

export type LocalMoodEntry = z.infer<typeof moodEntrySchema>;
