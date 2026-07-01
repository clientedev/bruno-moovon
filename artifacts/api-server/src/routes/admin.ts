import { Router } from "express";
import { db } from "@workspace/db";
import { albumsTable, albumMediaTable, heroImagesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middleware/adminAuth";
import { z } from "zod";

const router = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "bruno2026**";

// ─── Auth ────────────────────────────────────────────────────────────────────

router.post("/admin/login", (req, res) => {
  const { password } = req.body as { password?: string };
  if (password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: "Senha incorreta" });
  }
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/admin/me", (req, res) => {
  if (req.session?.isAdmin) {
    res.json({ isAdmin: true });
  } else {
    res.status(401).json({ error: "Não autorizado" });
  }
});

// ─── Hero Images ─────────────────────────────────────────────────────────────

router.get("/admin/hero-images", requireAdmin, async (req, res) => {
  try {
    const images = await db
      .select()
      .from(heroImagesTable)
      .orderBy(asc(heroImagesTable.orderIndex));
    res.json(images);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch hero images");
    res.status(500).json({ error: "Erro interno" });
  }
});

const heroImageSchema = z.object({
  data: z.string().min(10),
  label: z.string().optional(),
  orderIndex: z.number().int().optional(),
  active: z.boolean().optional(),
});

router.post("/admin/hero-images", requireAdmin, async (req, res) => {
  const parsed = heroImageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos" });
    return;
  }
  try {
    const count = await db.select().from(heroImagesTable);
    const [image] = await db
      .insert(heroImagesTable)
      .values({ ...parsed.data, orderIndex: parsed.data.orderIndex ?? count.length })
      .returning();
    res.status(201).json(image);
  } catch (err) {
    req.log.error({ err }, "Failed to create hero image");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.put("/admin/hero-images/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const parsed = heroImageSchema.partial().safeParse(req.body);
  if (!parsed.success || isNaN(id)) {
    res.status(400).json({ error: "Dados inválidos" });
    return;
  }
  try {
    const [image] = await db
      .update(heroImagesTable)
      .set(parsed.data)
      .where(eq(heroImagesTable.id, id))
      .returning();
    res.json(image);
  } catch (err) {
    req.log.error({ err }, "Failed to update hero image");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/admin/hero-images/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }
  try {
    await db.delete(heroImagesTable).where(eq(heroImagesTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete hero image");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Albums ──────────────────────────────────────────────────────────────────

router.get("/admin/albums", requireAdmin, async (req, res) => {
  try {
    const albums = await db
      .select()
      .from(albumsTable)
      .orderBy(asc(albumsTable.orderIndex));
    res.json(albums);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch albums");
    res.status(500).json({ error: "Erro interno" });
  }
});

const albumSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  orderIndex: z.number().int().optional(),
});

router.post("/admin/albums", requireAdmin, async (req, res) => {
  const parsed = albumSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos" });
    return;
  }
  try {
    const count = await db.select().from(albumsTable);
    const [album] = await db
      .insert(albumsTable)
      .values({ ...parsed.data, orderIndex: parsed.data.orderIndex ?? count.length })
      .returning();
    res.status(201).json(album);
  } catch (err) {
    req.log.error({ err }, "Failed to create album");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.put("/admin/albums/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const parsed = albumSchema.partial().safeParse(req.body);
  if (!parsed.success || isNaN(id)) {
    res.status(400).json({ error: "Dados inválidos" });
    return;
  }
  try {
    const [album] = await db
      .update(albumsTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(albumsTable.id, id))
      .returning();
    res.json(album);
  } catch (err) {
    req.log.error({ err }, "Failed to update album");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/admin/albums/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }
  try {
    await db.delete(albumsTable).where(eq(albumsTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete album");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Album Media ─────────────────────────────────────────────────────────────

router.get("/admin/albums/:id/media", requireAdmin, async (req, res) => {
  const albumId = Number(req.params["id"]);
  if (isNaN(albumId)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }
  try {
    const media = await db
      .select()
      .from(albumMediaTable)
      .where(eq(albumMediaTable.albumId, albumId))
      .orderBy(asc(albumMediaTable.orderIndex));
    res.json(media);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch album media");
    res.status(500).json({ error: "Erro interno" });
  }
});

const mediaSchema = z.object({
  type: z.enum(["image", "video"]),
  data: z.string().min(1),
  caption: z.string().optional(),
  orderIndex: z.number().int().optional(),
});

router.post("/admin/albums/:id/media", requireAdmin, async (req, res) => {
  const albumId = Number(req.params["id"]);
  if (isNaN(albumId)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }
  const parsed = mediaSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos" });
    return;
  }
  try {
    const existing = await db.select().from(albumMediaTable).where(eq(albumMediaTable.albumId, albumId));
    const [media] = await db
      .insert(albumMediaTable)
      .values({ ...parsed.data, albumId, orderIndex: parsed.data.orderIndex ?? existing.length })
      .returning();
    res.status(201).json(media);
  } catch (err) {
    req.log.error({ err }, "Failed to add album media");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/admin/albums/:albumId/media/:mediaId", requireAdmin, async (req, res) => {
  const mediaId = Number(req.params["mediaId"]);
  if (isNaN(mediaId)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }
  try {
    await db.delete(albumMediaTable).where(eq(albumMediaTable.id, mediaId));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete album media");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Leads (admin view) ───────────────────────────────────────────────────────

import { leadsTable, contactsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

router.get("/admin/leads", requireAdmin, async (req, res) => {
  try {
    const leads = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
    res.json(leads);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch leads");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.get("/admin/contacts", requireAdmin, async (req, res) => {
  try {
    const contacts = await db.select().from(contactsTable).orderBy(desc(contactsTable.createdAt));
    res.json(contacts);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch contacts");
    res.status(500).json({ error: "Erro interno" });
  }
});

export default router;
