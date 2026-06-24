import { Router } from "express";
import { db } from "@workspace/db";
import { leadsTable, contactsTable } from "@workspace/db";
import { z } from "zod";

const router = Router();

const leadInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(8),
});

const contactInputSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  message: z.string().min(10),
});

router.post("/leads", async (req, res) => {
  const parsed = leadInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos. Verifique os campos e tente novamente." });
    return;
  }

  try {
    const [lead] = await db
      .insert(leadsTable)
      .values(parsed.data)
      .returning();

    res.status(201).json({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      whatsapp: lead.whatsapp,
      createdAt: lead.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create lead");
    res.status(500).json({ error: "Erro interno. Tente novamente mais tarde." });
  }
});

router.post("/contact", async (req, res) => {
  const parsed = contactInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos. Verifique os campos e tente novamente." });
    return;
  }

  try {
    const [contact] = await db
      .insert(contactsTable)
      .values(parsed.data)
      .returning();

    res.status(201).json({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      message: contact.message,
      createdAt: contact.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create contact");
    res.status(500).json({ error: "Erro interno. Tente novamente mais tarde." });
  }
});

export default router;
