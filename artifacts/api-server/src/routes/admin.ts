import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  reportSectionsTable,
  reportTablesTable,
  reportStatsTable,
  reportMetadataTable,
  adminUsersTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!req.user?.isAdmin) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
}

router.put("/admin/sections/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const [updated] = await db
      .update(reportSectionsTable)
      .set({ title, content, updatedAt: new Date() })
      .where(eq(reportSectionsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update section");
    res.status(500).json({ error: "Failed to update section" });
  }
});

router.put("/admin/tables/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, headers, rows, footnote } = req.body;
    const [updated] = await db
      .update(reportTablesTable)
      .set({ title, description, headers, rows, footnote, updatedAt: new Date() })
      .where(eq(reportTablesTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update table");
    res.status(500).json({ error: "Failed to update table" });
  }
});

router.put("/admin/stats/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { label, value, description } = req.body;
    const [updated] = await db
      .update(reportStatsTable)
      .set({ label, value, description, updatedAt: new Date() })
      .where(eq(reportStatsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update stat");
    res.status(500).json({ error: "Failed to update stat" });
  }
});

router.put("/admin/metadata", requireAdmin, async (req, res) => {
  try {
    const { reportTitle, reportYear, reportDescription, publishedDate } = req.body;
    const [existing] = await db.select().from(reportMetadataTable).limit(1);
    if (!existing) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const [updated] = await db
      .update(reportMetadataTable)
      .set({ reportTitle, reportYear, reportDescription, publishedDate, updatedAt: new Date() })
      .where(eq(reportMetadataTable.id, existing.id))
      .returning();
    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update metadata");
    res.status(500).json({ error: "Failed to update metadata" });
  }
});

router.get("/admin/users", requireAdmin, async (req, res) => {
  try {
    const users = await db.select().from(adminUsersTable).orderBy(adminUsersTable.addedAt);
    res.json(users);
  } catch (err) {
    req.log.error({ err }, "Failed to get admin users");
    res.status(500).json({ error: "Failed to get admin users" });
  }
});

router.post("/admin/users", requireAdmin, async (req, res) => {
  try {
    const { replitUserId, username } = req.body;
    const [created] = await db
      .insert(adminUsersTable)
      .values({ replitUserId, username })
      .returning();
    res.status(201).json(created);
  } catch (err) {
    req.log.error({ err }, "Failed to add admin user");
    res.status(500).json({ error: "Failed to add admin user" });
  }
});

router.delete("/admin/users/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(adminUsersTable).where(eq(adminUsersTable.id, id));
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to remove admin user");
    res.status(500).json({ error: "Failed to remove admin user" });
  }
});

export default router;
