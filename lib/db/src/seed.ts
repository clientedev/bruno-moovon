/**
 * Seed script — inserts initial albums (Realizações) into the database.
 * Safe to run multiple times: skips any album whose name already exists.
 */
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { albumsTable } from "./schema/content.js";
import { eq } from "drizzle-orm";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const albums = [
  {
    name: "MDRT Miami 2025",
    description: "Million Dollar Round Table Annual Meeting em Miami, EUA.",
    orderIndex: 0,
  },
  {
    name: "MAG Seguros Curaçao 2025",
    description: "Reconhecimento MAG Seguros em Curaçao.",
    orderIndex: 1,
  },
  {
    name: "Insurance Experience África do Sul 2024",
    description: "Experiência internacional de seguros na África do Sul.",
    orderIndex: 2,
  },
  {
    name: "Omint Awards Olimpíadas de Paris 2024",
    description: "Premiação Omint durante as Olimpíadas de Paris.",
    orderIndex: 3,
  },
  {
    name: "Troféus",
    description: "Coleção de troféus e reconhecimentos conquistados ao longo da carreira.",
    orderIndex: 4,
  },
];

async function seed() {
  console.log("🌱 Iniciando seed de Realizações...");

  for (const album of albums) {
    const existing = await db
      .select({ id: albumsTable.id })
      .from(albumsTable)
      .where(eq(albumsTable.name, album.name))
      .limit(1);

    if (existing.length > 0) {
      console.log(`  ✓ Já existe: "${album.name}" — pulando.`);
      continue;
    }

    await db.insert(albumsTable).values(album);
    console.log(`  + Inserido: "${album.name}"`);
  }

  console.log("✅ Seed concluído.");
  await pool.end();
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
