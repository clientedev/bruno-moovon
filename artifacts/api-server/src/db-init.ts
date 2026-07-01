import { pool } from "@workspace/db";
import { logger } from "./lib/logger";

const HERO_SEED = [
  {
    data: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80",
    label: "Patrimônio e proteção",
    order_index: 0,
  },
  {
    data: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80",
    label: "Consultoria personalizada",
    order_index: 1,
  },
  {
    data: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
    label: "Planejamento financeiro",
    order_index: 2,
  },
];

const TESTIMONIALS_SEED = [
  { text: "Graças à MOOVON, finalmente entendi como proteger minha família e meu patrimônio. Bruno é um profissional excepcional.", author: "Carlos Eduardo M.", role: "Empresário", initials: "CE", order_index: 0 },
  { text: "A consultoria personalizada foi fundamental para o planejamento sucessório da nossa empresa. Recomendo sem hesitar.", author: "Dra. Ana Paula S.", role: "Médica", initials: "AP", order_index: 1 },
  { text: "Profissionalismo e atenção em cada detalhe. Me sinto seguro sabendo que minha família está protegida.", author: "Roberto T.", role: "Advogado", initials: "RT", order_index: 2 },
  { text: "O Bruno me ajudou a entender que seguro de vida é investimento, não custo. Transformou minha visão financeira.", author: "Marcos V.", role: "Executivo", initials: "MV", order_index: 3 },
  { text: "Atendimento humanizado e soluções que realmente fazem sentido para o meu perfil. Excelente!", author: "Patrícia L.", role: "Profissional Liberal", initials: "PL", order_index: 4 },
];

export async function ensureTables(): Promise<void> {
  logger.info("Ensuring database tables exist...");
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS albums (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        cover_image TEXT,
        order_index INTEGER DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS album_media (
        id SERIAL PRIMARY KEY,
        album_id INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        data TEXT NOT NULL,
        caption TEXT,
        order_index INTEGER DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS hero_images (
        id SERIAL PRIMARY KEY,
        data TEXT NOT NULL,
        label TEXT,
        order_index INTEGER DEFAULT 0 NOT NULL,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        author TEXT NOT NULL,
        role TEXT NOT NULL,
        initials TEXT NOT NULL,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        order_index INTEGER DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Seed hero images if none exist
    const heroCount = await pool.query("SELECT COUNT(*) FROM hero_images");
    if (Number(heroCount.rows[0].count) === 0) {
      logger.info("Seeding hero images...");
      for (const img of HERO_SEED) {
        await pool.query(
          "INSERT INTO hero_images (data, label, order_index, active) VALUES ($1, $2, $3, true)",
          [img.data, img.label, img.order_index]
        );
      }
    }

    // Seed testimonials if none exist
    const testCount = await pool.query("SELECT COUNT(*) FROM testimonials");
    if (Number(testCount.rows[0].count) === 0) {
      logger.info("Seeding testimonials...");
      for (const t of TESTIMONIALS_SEED) {
        await pool.query(
          "INSERT INTO testimonials (text, author, role, initials, active, order_index) VALUES ($1, $2, $3, $4, true, $5)",
          [t.text, t.author, t.role, t.initials, t.order_index]
        );
      }
    }

    logger.info("Database tables ready.");
  } catch (err) {
    logger.error({ err }, "Failed to ensure database tables");
    throw err;
  }
}
