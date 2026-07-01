import { Router } from "express";
import { db } from "@workspace/db";
import { albumsTable, albumMediaTable, heroImagesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

// Public: active hero images for the slideshow
router.get("/hero-images", async (req, res) => {
  try {
    const images = await db
      .select()
      .from(heroImagesTable)
      .where(eq(heroImagesTable.active, true))
      .orderBy(asc(heroImagesTable.orderIndex));
    res.json(images);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch hero images");
    res.status(500).json({ error: "Erro interno" });
  }
});

// Public: all albums with their media
router.get("/albums", async (req, res) => {
  try {
    const albums = await db
      .select()
      .from(albumsTable)
      .orderBy(asc(albumsTable.orderIndex));

    const albumsWithMedia = await Promise.all(
      albums.map(async (album) => {
        const media = await db
          .select()
          .from(albumMediaTable)
          .where(eq(albumMediaTable.albumId, album.id))
          .orderBy(asc(albumMediaTable.orderIndex));
        return { ...album, media };
      })
    );

    res.json(albumsWithMedia);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch albums");
    res.status(500).json({ error: "Erro interno" });
  }
});

// Public: single album with its media
router.get("/albums/:id", async (req, res) => {
  const id = Number(req.params["id"]);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }
  try {
    const [album] = await db.select().from(albumsTable).where(eq(albumsTable.id, id));
    if (!album) {
      res.status(404).json({ error: "Álbum não encontrado" });
      return;
    }
    const media = await db
      .select()
      .from(albumMediaTable)
      .where(eq(albumMediaTable.albumId, id))
      .orderBy(asc(albumMediaTable.orderIndex));
    res.json({ ...album, media });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch album");
    res.status(500).json({ error: "Erro interno" });
  }
});

export default router;
