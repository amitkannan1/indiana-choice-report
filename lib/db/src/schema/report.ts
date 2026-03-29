import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reportMetadataTable = pgTable("report_metadata", {
  id: serial("id").primaryKey(),
  reportTitle: text("report_title").notNull(),
  reportYear: text("report_year").notNull(),
  reportDescription: text("report_description"),
  publishedDate: text("published_date"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertReportMetadataSchema = createInsertSchema(reportMetadataTable).omit({ id: true, updatedAt: true });
export type InsertReportMetadata = z.infer<typeof insertReportMetadataSchema>;
export type ReportMetadata = typeof reportMetadataTable.$inferSelect;

export const reportSectionsTable = pgTable("report_sections", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  sectionOrder: integer("section_order").notNull().default(0),
  parentKey: text("parent_key"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertReportSectionSchema = createInsertSchema(reportSectionsTable).omit({ id: true, updatedAt: true });
export type InsertReportSection = z.infer<typeof insertReportSectionSchema>;
export type ReportSection = typeof reportSectionsTable.$inferSelect;

export const reportTablesTable = pgTable("report_tables", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  headers: jsonb("headers").notNull().$type<string[]>(),
  rows: jsonb("rows").notNull().$type<string[][]>(),
  footnote: text("footnote"),
  sectionKey: text("section_key").notNull(),
  tableOrder: integer("table_order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertReportTableSchema = createInsertSchema(reportTablesTable).omit({ id: true, updatedAt: true });
export type InsertReportTable = z.infer<typeof insertReportTableSchema>;
export type ReportTable = typeof reportTablesTable.$inferSelect;

export const reportStatsTable = pgTable("report_stats", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  description: text("description"),
  sectionKey: text("section_key").notNull(),
  statOrder: integer("stat_order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertReportStatSchema = createInsertSchema(reportStatsTable).omit({ id: true, updatedAt: true });
export type InsertReportStat = z.infer<typeof insertReportStatSchema>;
export type ReportStat = typeof reportStatsTable.$inferSelect;

export const adminUsersTable = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  replitUserId: text("replit_user_id").notNull().unique(),
  username: text("username").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsersTable).omit({ id: true, addedAt: true });
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsersTable.$inferSelect;
