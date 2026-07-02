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

const SOLUTIONS_SEED = [
  {
    slug: "seguro-de-vida-individual",
    icon: "Shield",
    title: "Seguro de Vida Individual",
    desc: "Proteção personalizada para você e sua família continuarem prosperando.",
    full_desc: "Uma solução sob medida que garante que sua família mantenha o mesmo padrão de vida na sua ausência. Cobertura para morte, invalidez, doenças graves e diária por incapacidade temporária.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80",
    benefits: [
      "Cobertura por morte natural e acidental",
      "Invalidez permanente total ou parcial",
      "Doenças graves (câncer, infarto, AVC)",
      "Diária de incapacidade temporária",
      "Assistência funeral",
    ],
    order_index: 0,
  },
  {
    slug: "seguro-para-familias",
    icon: "Users",
    title: "Seguro para Famílias",
    desc: "Cobertura completa garantindo o padrão de vida de quem você mais ama.",
    full_desc: "Proteja todos os membros da sua família com uma apólice unificada e completa. Garanta educação, saúde e qualidade de vida para filhos e cônjuge, independentemente do que aconteça.",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=80",
    benefits: [
      "Cobertura para toda a família em uma apólice",
      "Garantia de educação dos filhos",
      "Proteção do cônjuge dependente",
      "Renda mensal por até 10 anos",
      "Flexibilidade de personalização",
    ],
    order_index: 1,
  },
  {
    slug: "seguro-para-empresarios",
    icon: "Briefcase",
    title: "Seguro para Empresários",
    desc: "Proteção estratégica do negócio e salvaguarda do patrimônio corporativo.",
    full_desc: "Soluções específicas para empresários que precisam proteger o negócio, os sócios e o patrimônio construído ao longo de anos. Inclui seguro de vida sócio, key-man e proteção contratual.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80",
    benefits: [
      "Seguro de vida societário (sócio-chave)",
      "Continuidade do negócio garantida",
      "Proteção contra dissolução forçada",
      "Cobertura key-man para executivos",
      "Benefícios fiscais para a empresa",
    ],
    order_index: 2,
  },
  {
    slug: "planejamento-sucessorio",
    icon: "FileText",
    title: "Planejamento Sucessório",
    desc: "Organize a transmissão do patrimônio com eficiência tributária e paz de espírito.",
    full_desc: "Estruture a passagem do seu patrimônio de forma eficiente, evitando disputas, reduzindo carga tributária e garantindo que seus bens cheguem a quem você deseja, de forma rápida e segura.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80",
    benefits: [
      "Redução de até 80% no ITCMD",
      "Transferência sem inventário",
      "Proteção contra disputas familiares",
      "Holdigs patrimoniais e previdência privada",
      "Planejamento tributário integrado",
    ],
    order_index: 3,
  },
  {
    slug: "protecao-patrimonial",
    icon: "Lock",
    title: "Proteção Patrimonial",
    desc: "Blindagem legal e financeira dos seus bens contra reveses inesperados.",
    full_desc: "Estruture seus bens para que fiquem protegidos de credores, litígios e instabilidades econômicas. Combinamos instrumentos jurídicos e financeiros para criar uma camada sólida de proteção.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    benefits: [
      "Separação entre patrimônio pessoal e empresarial",
      "Proteção contra credores e litígios",
      "Estruturação via holdings e offshores",
      "Blindagem de bens imóveis e investimentos",
      "Compliance fiscal e jurídico",
    ],
    order_index: 4,
  },
  {
    slug: "blindagem-financeira",
    icon: "Landmark",
    title: "Blindagem Financeira",
    desc: "Estratégias avançadas para proteger e consolidar seu capital no longo prazo.",
    full_desc: "Uma abordagem completa que combina previdência privada, investimentos protegidos e seguros patrimoniais para criar uma muralha financeira em torno do seu capital, em qualquer cenário.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
    benefits: [
      "Previdência privada VGBL e PGBL",
      "Investimentos com proteção cambial",
      "Diversificação em ativos reais",
      "Estratégias anticíclicas",
      "Revisão periódica e rebalanceamento",
    ],
    order_index: 5,
  },
  {
    slug: "consultoria-financeira",
    icon: "LineChart",
    title: "Consultoria Financeira",
    desc: "Diagnóstico completo e planejamento sob medida para seus objetivos de vida.",
    full_desc: "Um diagnóstico aprofundado da sua situação financeira, seguido de um plano estratégico personalizado que conecta seus recursos aos seus objetivos de curto, médio e longo prazo.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1600&q=80",
    benefits: [
      "Mapeamento completo do patrimônio",
      "Plano financeiro personalizado",
      "Gestão de riscos e seguros",
      "Otimização tributária",
      "Acompanhamento trimestral",
    ],
    order_index: 6,
  },
  {
    slug: "mentoria-personalizada",
    icon: "GraduationCap",
    title: "Mentoria Personalizada",
    desc: "Acompanhamento individual e estratégico para tomadas de decisão inteligentes.",
    full_desc: "Sessões individuais de alta intensidade com Bruno Saraiva para desenvolver sua inteligência financeira, tomar decisões mais seguras e construir uma trajetória de prosperidade consistente.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&q=80",
    benefits: [
      "Sessões individuais quinzenais",
      "Plano de metas financeiras",
      "Análise de investimentos e riscos",
      "Suporte via WhatsApp",
      "Acesso a materiais exclusivos",
    ],
    order_index: 7,
  },
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

      CREATE TABLE IF NOT EXISTS solutions (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        icon TEXT NOT NULL,
        title TEXT NOT NULL,
        "desc" TEXT NOT NULL,
        full_desc TEXT NOT NULL,
        image TEXT NOT NULL,
        benefits TEXT[] NOT NULL DEFAULT '{}',
        active BOOLEAN DEFAULT TRUE NOT NULL,
        order_index INTEGER DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
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

    // Seed solutions if none exist
    const solutionsCount = await pool.query("SELECT COUNT(*) FROM solutions");
    if (Number(solutionsCount.rows[0].count) === 0) {
      logger.info("Seeding solutions...");
      for (const s of SOLUTIONS_SEED) {
        await pool.query(
          `INSERT INTO solutions (slug, icon, title, "desc", full_desc, image, benefits, active, order_index)
           VALUES ($1, $2, $3, $4, $5, $6, $7, true, $8)`,
          [s.slug, s.icon, s.title, s.desc, s.full_desc, s.image, s.benefits, s.order_index]
        );
      }
    }

    // Seed albums (Realizações) — insert by name if not already present
    const ALBUMS_SEED = [
      { name: "MDRT Miami 2025",                           description: "Million Dollar Round Table Annual Meeting em Miami, EUA.",           order_index: 0 },
      { name: "MAG Seguros Curaçao 2025",                  description: "Reconhecimento MAG Seguros em Curaçao.",                            order_index: 1 },
      { name: "Insurance Experience África do Sul 2024",   description: "Experiência internacional de seguros na África do Sul.",             order_index: 2 },
      { name: "Omint Awards Olimpíadas de Paris 2024",     description: "Premiação Omint durante as Olimpíadas de Paris.",                   order_index: 3 },
      { name: "Troféus",                                   description: "Coleção de troféus e reconhecimentos conquistados ao longo da carreira.", order_index: 4 },
    ];
    logger.info("Seeding albums (Realizações)...");
    for (const album of ALBUMS_SEED) {
      await pool.query(
        `INSERT INTO albums (name, description, order_index)
         SELECT $1, $2, $3
         WHERE NOT EXISTS (SELECT 1 FROM albums WHERE name = $1)`,
        [album.name, album.description, album.order_index]
      );
    }

    logger.info("Database tables ready.");
  } catch (err) {
    logger.error({ err }, "Failed to ensure database tables");
    throw err;
  }
}
