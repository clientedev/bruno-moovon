import { Router } from "express";
import { db } from "@workspace/db";
import { albumsTable, albumMediaTable, heroImagesTable, testimonialsTable, leadsTable, contactsTable, solutionsTable } from "@workspace/db";
import { eq, asc, desc } from "drizzle-orm";
import { requireAdmin } from "../middleware/adminAuth";
import { z } from "zod";

const router = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "bruno2026**";

// ─── Auth ─────────────────────────────────────────────────────────────────────

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
  req.session.destroy(() => { res.json({ ok: true }); });
});

router.get("/admin/me", (req, res) => {
  if (req.session?.isAdmin) {
    res.json({ isAdmin: true });
  } else {
    res.status(401).json({ error: "Não autorizado" });
  }
});

// ─── Hero Images ──────────────────────────────────────────────────────────────

router.get("/admin/hero-images", requireAdmin, async (req, res) => {
  try {
    const images = await db.select().from(heroImagesTable).orderBy(asc(heroImagesTable.orderIndex));
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
  if (!parsed.success) { res.status(400).json({ error: "Dados inválidos" }); return; }
  try {
    const count = await db.select().from(heroImagesTable);
    const [image] = await db.insert(heroImagesTable).values({ ...parsed.data, orderIndex: parsed.data.orderIndex ?? count.length }).returning();
    res.status(201).json(image);
  } catch (err) {
    req.log.error({ err }, "Failed to create hero image");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.put("/admin/hero-images/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const parsed = heroImageSchema.partial().safeParse(req.body);
  if (!parsed.success || isNaN(id)) { res.status(400).json({ error: "Dados inválidos" }); return; }
  try {
    const [image] = await db.update(heroImagesTable).set(parsed.data).where(eq(heroImagesTable.id, id)).returning();
    res.json(image);
  } catch (err) {
    req.log.error({ err }, "Failed to update hero image");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/admin/hero-images/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }
  try {
    await db.delete(heroImagesTable).where(eq(heroImagesTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete hero image");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Albums ───────────────────────────────────────────────────────────────────

router.get("/admin/albums", requireAdmin, async (req, res) => {
  try {
    const albums = await db.select().from(albumsTable).orderBy(asc(albumsTable.orderIndex));
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
  if (!parsed.success) { res.status(400).json({ error: "Dados inválidos" }); return; }
  try {
    const count = await db.select().from(albumsTable);
    const [album] = await db.insert(albumsTable).values({ ...parsed.data, orderIndex: parsed.data.orderIndex ?? count.length }).returning();
    res.status(201).json(album);
  } catch (err) {
    req.log.error({ err }, "Failed to create album");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.put("/admin/albums/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const parsed = albumSchema.partial().safeParse(req.body);
  if (!parsed.success || isNaN(id)) { res.status(400).json({ error: "Dados inválidos" }); return; }
  try {
    const [album] = await db.update(albumsTable).set({ ...parsed.data, updatedAt: new Date() }).where(eq(albumsTable.id, id)).returning();
    res.json(album);
  } catch (err) {
    req.log.error({ err }, "Failed to update album");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/admin/albums/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }
  try {
    await db.delete(albumsTable).where(eq(albumsTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete album");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Album Media ──────────────────────────────────────────────────────────────

router.get("/admin/albums/:id/media", requireAdmin, async (req, res) => {
  const albumId = Number(req.params["id"]);
  if (isNaN(albumId)) { res.status(400).json({ error: "ID inválido" }); return; }
  try {
    const media = await db.select().from(albumMediaTable).where(eq(albumMediaTable.albumId, albumId)).orderBy(asc(albumMediaTable.orderIndex));
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
  if (isNaN(albumId)) { res.status(400).json({ error: "ID inválido" }); return; }
  const parsed = mediaSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Dados inválidos" }); return; }
  try {
    const existing = await db.select().from(albumMediaTable).where(eq(albumMediaTable.albumId, albumId));
    const [media] = await db.insert(albumMediaTable).values({ ...parsed.data, albumId, orderIndex: parsed.data.orderIndex ?? existing.length }).returning();
    res.status(201).json(media);
  } catch (err) {
    req.log.error({ err }, "Failed to add album media");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/admin/albums/:albumId/media/:mediaId", requireAdmin, async (req, res) => {
  const mediaId = Number(req.params["mediaId"]);
  if (isNaN(mediaId)) { res.status(400).json({ error: "ID inválido" }); return; }
  try {
    await db.delete(albumMediaTable).where(eq(albumMediaTable.id, mediaId));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete album media");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonialSchema = z.object({
  text: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  initials: z.string().min(1).max(3),
  active: z.boolean().optional(),
  orderIndex: z.number().int().optional(),
});

router.get("/admin/testimonials", requireAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(testimonialsTable).orderBy(asc(testimonialsTable.orderIndex));
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch testimonials");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.post("/admin/testimonials", requireAdmin, async (req, res) => {
  const parsed = testimonialSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Dados inválidos" }); return; }
  try {
    const count = await db.select().from(testimonialsTable);
    const [row] = await db.insert(testimonialsTable).values({ ...parsed.data, orderIndex: parsed.data.orderIndex ?? count.length }).returning();
    res.status(201).json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to create testimonial");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.put("/admin/testimonials/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const parsed = testimonialSchema.partial().safeParse(req.body);
  if (!parsed.success || isNaN(id)) { res.status(400).json({ error: "Dados inválidos" }); return; }
  try {
    const [row] = await db.update(testimonialsTable).set(parsed.data).where(eq(testimonialsTable.id, id)).returning();
    res.json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to update testimonial");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/admin/testimonials/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }
  try {
    await db.delete(testimonialsTable).where(eq(testimonialsTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete testimonial");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Solutions ────────────────────────────────────────────────────────────────

const solutionSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  icon: z.string().min(1),
  title: z.string().min(1),
  desc: z.string().min(1),
  fullDesc: z.string().min(1),
  image: z.string().min(1),
  benefits: z.array(z.string().min(1)).default([]),
  active: z.boolean().optional(),
  orderIndex: z.number().int().optional(),
});

router.get("/admin/solutions", requireAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(solutionsTable).orderBy(asc(solutionsTable.orderIndex));
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch solutions");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.post("/admin/solutions", requireAdmin, async (req, res) => {
  const parsed = solutionSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Dados inválidos", details: parsed.error.flatten() }); return; }
  try {
    const existing = await db.select().from(solutionsTable).where(eq(solutionsTable.slug, parsed.data.slug));
    if (existing.length > 0) { res.status(409).json({ error: "Já existe uma solução com este slug" }); return; }
    const count = await db.select().from(solutionsTable);
    const [row] = await db.insert(solutionsTable).values({ ...parsed.data, orderIndex: parsed.data.orderIndex ?? count.length }).returning();
    res.status(201).json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to create solution");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.put("/admin/solutions/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const parsed = solutionSchema.partial().safeParse(req.body);
  if (!parsed.success || isNaN(id)) { res.status(400).json({ error: "Dados inválidos", details: parsed.success ? undefined : parsed.error.flatten() }); return; }
  try {
    if (parsed.data.slug) {
      const existing = await db.select().from(solutionsTable).where(eq(solutionsTable.slug, parsed.data.slug));
      if (existing.length > 0 && existing[0]?.id !== id) { res.status(409).json({ error: "Já existe uma solução com este slug" }); return; }
    }
    const [row] = await db.update(solutionsTable).set({ ...parsed.data, updatedAt: new Date() }).where(eq(solutionsTable.id, id)).returning();
    if (!row) { res.status(404).json({ error: "Solução não encontrada" }); return; }
    res.json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to update solution");
    res.status(500).json({ error: "Erro interno" });
  }
});

router.delete("/admin/solutions/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }
  try {
    await db.delete(solutionsTable).where(eq(solutionsTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete solution");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Leads ────────────────────────────────────────────────────────────────────

router.get("/admin/leads", requireAdmin, async (req, res) => {
  try {
    const leads = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
    res.json(leads);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch leads");
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── Contacts ─────────────────────────────────────────────────────────────────

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
