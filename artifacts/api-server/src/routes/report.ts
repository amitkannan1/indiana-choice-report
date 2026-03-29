import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { reportSectionsTable, reportTablesTable, reportStatsTable, reportMetadataTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/report/sections", async (req, res) => {
  try {
    const sections = await db.select().from(reportSectionsTable).orderBy(reportSectionsTable.sectionOrder);
    res.json(sections);
  } catch (err) {
    req.log.error({ err }, "Failed to get sections");
    res.status(500).json({ error: "Failed to get sections" });
  }
});

router.get("/report/sections/:key", async (req, res) => {
  try {
    const [section] = await db.select().from(reportSectionsTable).where(eq(reportSectionsTable.key, req.params.key));
    if (!section) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(section);
  } catch (err) {
    req.log.error({ err }, "Failed to get section");
    res.status(500).json({ error: "Failed to get section" });
  }
});

router.get("/report/tables", async (req, res) => {
  try {
    const tables = await db.select().from(reportTablesTable).orderBy(reportTablesTable.tableOrder);
    res.json(tables);
  } catch (err) {
    req.log.error({ err }, "Failed to get tables");
    res.status(500).json({ error: "Failed to get tables" });
  }
});

router.get("/report/tables/:key", async (req, res) => {
  try {
    const [table] = await db.select().from(reportTablesTable).where(eq(reportTablesTable.key, req.params.key));
    if (!table) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(table);
  } catch (err) {
    req.log.error({ err }, "Failed to get table");
    res.status(500).json({ error: "Failed to get table" });
  }
});

router.get("/report/stats", async (req, res) => {
  try {
    const stats = await db.select().from(reportStatsTable).orderBy(reportStatsTable.statOrder);
    res.json(stats);
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Failed to get stats" });
  }
});

router.get("/report/metadata", async (req, res) => {
  try {
    const [metadata] = await db.select().from(reportMetadataTable).limit(1);
    if (!metadata) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(metadata);
  } catch (err) {
    req.log.error({ err }, "Failed to get metadata");
    res.status(500).json({ error: "Failed to get metadata" });
  }
});

export default router;
