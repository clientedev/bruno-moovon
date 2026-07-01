import { motion } from "framer-motion";
import { Shield, Users, Briefcase, FileText, Lock, Landmark, LineChart, GraduationCap, ChevronRight } from "lucide-react";

export const solutions = [
  {
    slug: "seguro-de-vida-individual",
    icon: Shield,
    title: "Seguro de Vida Individual",
    desc: "Proteção personalizada para você e sua família continuarem prosperando.",
    fullDesc: "Uma solução sob medida que garante que sua família mantenha o mesmo padrão de vida na sua ausência. Cobertura para morte, invalidez, doenças graves e diária por incapacidade temporária.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80",
    benefits: [
      "Cobertura por morte natural e acidental",
      "Invalidez permanente total ou parcial",
      "Doenças graves (câncer, infarto, AVC)",
      "Diária de incapacidade temporária",
      "Assistência funeral",
    ],
  },
  {
    slug: "seguro-para-familias",
    icon: Users,
    title: "Seguro para Famílias",
    desc: "Cobertura completa garantindo o padrão de vida de quem você mais ama.",
    fullDesc: "Proteja todos os membros da sua família com uma apólice unificada e completa. Garanta educação, saúde e qualidade de vida para filhos e cônjuge, independentemente do que aconteça.",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=80",
    benefits: [
      "Cobertura para toda a família em uma apólice",
      "Garantia de educação dos filhos",
      "Proteção do cônjuge dependente",
      "Renda mensal por até 10 anos",
      "Flexibilidade de personalização",
    ],
  },
  {
    slug: "seguro-para-empresarios",
    icon: Briefcase,
    title: "Seguro para Empresários",
    desc: "Proteção estratégica do negócio e salvaguarda do patrimônio corporativo.",
    fullDesc: "Soluções específicas para empresários que precisam proteger o negócio, os sócios e o patrimônio construído ao longo de anos. Inclui seguro de vida sócio, key-man e proteção contratual.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80",
    benefits: [
      "Seguro de vida societário (sócio-chave)",
      "Continuidade do negócio garantida",
      "Proteção contra dissolução forçada",
      "Cobertura key-man para executivos",
      "Benefícios fiscais para a empresa",
    ],
  },
  {
    slug: "planejamento-sucessorio",
    icon: FileText,
    title: "Planejamento Sucessório",
    desc: "Organize a transmissão do patrimônio com eficiência tributária e paz de espírito.",
    fullDesc: "Estruture a passagem do seu patrimônio de forma eficiente, evitando disputas, reduzindo carga tributária e garantindo que seus bens cheguem a quem você deseja, de forma rápida e segura.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80",
    benefits: [
      "Redução de até 80% no ITCMD",
      "Transferência sem inventário",
      "Proteção contra disputas familiares",
      "Holdigs patrimoniais e previdência privada",
      "Planejamento tributário integrado",
    ],
  },
  {
    slug: "protecao-patrimonial",
    icon: Lock,
    title: "Proteção Patrimonial",
    desc: "Blindagem legal e financeira dos seus bens contra reveses inesperados.",
    fullDesc: "Estruture seus bens para que fiquem protegidos de credores, litígios e instabilidades econômicas. Combinamos instrumentos jurídicos e financeiros para criar uma camada sólida de proteção.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    benefits: [
      "Separação entre patrimônio pessoal e empresarial",
      "Proteção contra credores e litígios",
      "Estruturação via holdings e offshores",
      "Blindagem de bens imóveis e investimentos",
      "Compliance fiscal e jurídico",
    ],
  },
  {
    slug: "blindagem-financeira",
    icon: Landmark,
    title: "Blindagem Financeira",
    desc: "Estratégias avançadas para proteger e consolidar seu capital no longo prazo.",
    fullDesc: "Uma abordagem completa que combina previdência privada, investimentos protegidos e seguros patrimoniais para criar uma muralha financeira em torno do seu capital, em qualquer cenário.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
    benefits: [
      "Previdência privada VGBL e PGBL",
      "Investimentos com proteção cambial",
      "Diversificação em ativos reais",
      "Estratégias anticíclicas",
      "Revisão periódica e rebalanceamento",
    ],
  },
  {
    slug: "consultoria-financeira",
    icon: LineChart,
    title: "Consultoria Financeira",
    desc: "Diagnóstico completo e planejamento sob medida para seus objetivos de vida.",
    fullDesc: "Um diagnóstico aprofundado da sua situação financeira, seguido de um plano estratégico personalizado que conecta seus recursos aos seus objetivos de curto, médio e longo prazo.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1600&q=80",
    benefits: [
      "Mapeamento completo do patrimônio",
      "Plano financeiro personalizado",
      "Gestão de riscos e seguros",
      "Otimização tributária",
      "Acompanhamento trimestral",
    ],
  },
  {
    slug: "mentoria-personalizada",
    icon: GraduationCap,
    title: "Mentoria Personalizada",
    desc: "Acompanhamento individual e estratégico para tomadas de decisão inteligentes.",
    fullDesc: "Sessões individuais de alta intensidade com Bruno Saraiva para desenvolver sua inteligência financeira, tomar decisões mais seguras e construir uma trajetória de prosperidade consistente.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&q=80",
    benefits: [
      "Sessões individuais quinzenais",
      "Plano de metas financeiras",
      "Análise de investimentos e riscos",
      "Suporte via WhatsApp",
      "Acesso a materiais exclusivos",
    ],
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="py-24 bg-muted/30 dark:bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Nossas Soluções</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Proteção sob medida para o seu momento de vida
            </h3>
            <p className="text-lg text-muted-foreground font-light">
              Oferecemos um portfólio completo de soluções em wealth management e seguros, desenhadas especificamente para profissionais exigentes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{item.title}</h4>
              <p className="text-muted-foreground font-light leading-relaxed mb-6 flex-1">{item.desc}</p>

              <a
                href={`/solucao/${item.slug}`}
                className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors mt-auto"
              >
                Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
