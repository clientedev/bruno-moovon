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
    desc: "Proteção financeira para quem construiu um patrimônio e quer preservar seu legado.",
    full_desc: "Um seguro de vida moderno vai muito além da indenização em caso de falecimento. Ele é uma ferramenta estratégica de proteção patrimonial, planejamento financeiro e tranquilidade para você e sua família.\n\nNa BSEGUROS desenvolvemos projetos personalizados, considerando seu patrimônio, renda, objetivos e momento de vida, para garantir que qualquer imprevisto não comprometa tudo aquilo que você levou anos para construir.\n\nNosso processo: Diagnóstico financeiro · Levantamento de necessidades · Comparação entre as principais seguradoras · Estruturação personalizada · Acompanhamento permanente da apólice.\n\nPara quem é: Empresários · Executivos · Profissionais liberais · Médicos · Advogados · Investidores · Famílias que desejam segurança financeira.\n\nProteja quem depende de você e preserve seu patrimônio.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80",
    benefits: [
      "Falecimento",
      "Invalidez permanente",
      "Doenças graves",
      "Incapacidade temporária",
      "Diagnóstico de câncer e outras enfermidades previstas em apólice",
      "Antecipação de capital em vida",
    ],
    order_index: 0,
  },
  {
    slug: "seguro-para-familias",
    icon: "Users",
    title: "Seguro para Famílias",
    desc: "Quem ama protege.",
    full_desc: "A maior preocupação de uma família não é apenas perder alguém, mas perder a estabilidade financeira em um momento extremamente delicado.\n\nNossa missão é garantir que o padrão de vida da família seja preservado mesmo diante de acontecimentos inesperados.\n\nCada planejamento é construído considerando: despesas mensais; educação dos filhos; financiamento imobiliário; sucessão patrimonial; reserva financeira; objetivos futuros.\n\nMais do que contratar um seguro, você cria um plano de continuidade para quem mais importa.",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=80",
    benefits: [
      "Despesas mensais",
      "Educação dos filhos",
      "Financiamento imobiliário",
      "Sucessão patrimonial",
      "Reserva financeira",
      "Objetivos futuros",
    ],
    order_index: 1,
  },
  {
    slug: "seguro-para-empresarios",
    icon: "Briefcase",
    title: "Seguro para Empresários",
    desc: "Proteção estratégica para empresas e sócios.",
    full_desc: "Empresas também enfrentam riscos que podem comprometer sua continuidade.\n\nUma doença grave, invalidez ou falecimento de um sócio pode gerar enormes impactos financeiros e operacionais.\n\nA BSEGUROS estrutura soluções específicas para empresas: Seguro de Vida Empresarial · Seguro Pessoa-Chave · Buy and Sell Agreement · Planejamento sucessório empresarial · Proteção para executivos · Benefícios corporativos.\n\nNosso objetivo é garantir que a empresa continue crescendo independentemente dos imprevistos.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80",
    benefits: [
      "Seguro de Vida Empresarial",
      "Seguro Pessoa-Chave",
      "Buy and Sell Agreement",
      "Planejamento sucessório empresarial",
      "Proteção para executivos",
      "Benefícios corporativos",
    ],
    order_index: 2,
  },
  {
    slug: "planejamento-sucessorio",
    icon: "FileText",
    title: "Planejamento Sucessório",
    desc: "Transmita seu patrimônio com inteligência.",
    full_desc: "Construir patrimônio exige anos.\n\nPerdê-lo em custos, conflitos familiares e demora judicial pode acontecer em poucos meses.\n\nNa BSEGUROS desenvolvemos estratégias para organizar a sucessão patrimonial de forma eficiente, reduzindo burocracia e proporcionando liquidez imediata para a família.\n\nAnalisamos ferramentas como: Seguro de Vida · Previdência Privada · Testamento · Holdings · Planejamento tributário · Organização patrimonial.\n\nCada família possui uma realidade diferente. Por isso cada projeto é totalmente personalizado.\n\nNosso objetivo é preservar patrimônio, reduzir conflitos e garantir que seu legado seja respeitado.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80",
    benefits: [
      "Seguro de Vida",
      "Previdência Privada",
      "Testamento",
      "Holdings",
      "Planejamento tributário",
      "Organização patrimonial",
    ],
    order_index: 3,
  },
  {
    slug: "protecao-patrimonial",
    icon: "Lock",
    title: "Proteção Patrimonial",
    desc: "Patrimônio protegido. Futuro preservado.",
    full_desc: "Seu patrimônio representa anos de trabalho, dedicação e conquistas.\n\nNosso trabalho é identificar riscos que muitas vezes passam despercebidos e criar uma estrutura capaz de protegê-lo contra eventos inesperados.\n\nRealizamos um diagnóstico completo envolvendo: patrimônio financeiro; imóveis; empresas; riscos familiares; exposição tributária; liquidez.\n\nCom uma visão integrada entre seguros e planejamento patrimonial, desenvolvemos soluções para proteger aquilo que realmente importa.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    benefits: [
      "Patrimônio financeiro",
      "Imóveis",
      "Empresas",
      "Riscos familiares",
      "Exposição tributária",
      "Liquidez",
    ],
    order_index: 4,
  },
  {
    slug: "blindagem-financeira",
    icon: "Landmark",
    title: "Blindagem Financeira",
    desc: "Estratégias para proteger seu patrimônio contra riscos inesperados.",
    full_desc: "Blindagem financeira não significa esconder patrimônio.\n\nSignifica estruturar seu patrimônio de forma inteligente para reduzir vulnerabilidades financeiras e garantir estabilidade diante de situações inesperadas.\n\nNa prática, isso envolve: proteção de patrimônio; geração de liquidez; organização financeira; sucessão eficiente; mitigação de riscos.\n\nNosso papel é criar uma estrutura sólida para que seu patrimônio continue crescendo com segurança ao longo dos anos.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
    benefits: [
      "Proteção de patrimônio",
      "Geração de liquidez",
      "Organização financeira",
      "Sucessão eficiente",
      "Mitigação de riscos",
    ],
    order_index: 5,
  },
  {
    slug: "consultoria-financeira",
    icon: "LineChart",
    title: "Consultoria Financeira",
    desc: "Decisões melhores começam com um bom planejamento.",
    full_desc: "Antes de contratar qualquer produto, entendemos seus objetivos.\n\nAcreditamos que seguros fazem parte de um planejamento financeiro completo.\n\nPor isso realizamos uma consultoria personalizada para analisar: patrimônio; renda; despesas; investimentos; riscos; planejamento sucessório; necessidades de proteção.\n\nAo final, você recebe recomendações totalmente alinhadas ao seu momento de vida.\n\nSem soluções padronizadas. Sem conflitos de interesse. Apenas estratégias personalizadas.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1600&q=80",
    benefits: [
      "Patrimônio",
      "Renda",
      "Despesas",
      "Investimentos",
      "Riscos",
      "Planejamento sucessório",
      "Necessidades de proteção",
    ],
    order_index: 6,
  },
  {
    slug: "mentoria-personalizada",
    icon: "GraduationCap",
    title: "Mentoria Personalizada",
    desc: "Desenvolvendo profissionais que desejam construir uma carreira sólida no mercado de seguros.",
    full_desc: "Além da consultoria para clientes finais, a BSEGUROS também compartilha conhecimento com profissionais do mercado segurador.\n\nNossa mentoria foi criada para corretores que desejam: vender mais; aumentar sua renda recorrente; atuar com seguros de vida consultivos; aprender planejamento sucessório; estruturar processos comerciais; construir autoridade no mercado.\n\nVocê aprende diretamente com quem possui experiência prática, reconhecimento nacional e atuação em planejamento patrimonial de clientes de alta renda.\n\nA mentoria combina estratégia comercial, conhecimento técnico e acompanhamento próximo para acelerar seus resultados.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&q=80",
    benefits: [
      "Vender mais",
      "Aumentar renda recorrente",
      "Seguros de vida consultivos",
      "Planejamento sucessório",
      "Processos comerciais",
      "Construir autoridade no mercado",
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

    // Upsert solutions — insert or update existing by slug
    logger.info("Upserting solutions...");
    for (const s of SOLUTIONS_SEED) {
      await pool.query(
        `INSERT INTO solutions (slug, icon, title, "desc", full_desc, image, benefits, active, order_index)
         VALUES ($1, $2, $3, $4, $5, $6, $7, true, $8)
         ON CONFLICT (slug) DO UPDATE SET
           icon       = EXCLUDED.icon,
           title      = EXCLUDED.title,
           "desc"     = EXCLUDED."desc",
           full_desc  = EXCLUDED.full_desc,
           image      = EXCLUDED.image,
           benefits   = EXCLUDED.benefits,
           order_index = EXCLUDED.order_index,
           updated_at = NOW()`,
        [s.slug, s.icon, s.title, s.desc, s.full_desc, s.image, s.benefits, s.order_index]
      );
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
