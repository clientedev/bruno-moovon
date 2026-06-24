import { motion } from "framer-motion";
import { Shield, Users, Briefcase, FileText, Lock, Landmark, LineChart, GraduationCap, ChevronRight } from "lucide-react";

const solutions = [
  {
    icon: Shield,
    title: "Seguro de Vida Individual",
    desc: "Proteção personalizada para você e sua família continuarem prosperando."
  },
  {
    icon: Users,
    title: "Seguro para Famílias",
    desc: "Cobertura completa garantindo o padrão de vida de quem você mais ama."
  },
  {
    icon: Briefcase,
    title: "Seguro para Empresários",
    desc: "Proteção estratégica do negócio e salvaguarda do patrimônio corporativo."
  },
  {
    icon: FileText,
    title: "Planejamento Sucessório",
    desc: "Organize a transmissão do patrimônio com eficiência tributária e paz de espírito."
  },
  {
    icon: Lock,
    title: "Proteção Patrimonial",
    desc: "Blindagem legal e financeira dos seus bens contra reveses inesperados."
  },
  {
    icon: Landmark,
    title: "Blindagem Financeira",
    desc: "Estratégias avançadas para proteger e consolidar seu capital no longo prazo."
  },
  {
    icon: LineChart,
    title: "Consultoria Financeira",
    desc: "Diagnóstico completo e planejamento sob medida para seus objetivos de vida."
  },
  {
    icon: GraduationCap,
    title: "Mentoria Personalizada",
    desc: "Acompanhamento individual e estratégico para tomadas de decisão inteligentes."
  }
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
              className="group relative bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{item.title}</h4>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">{item.desc}</p>
              
              <a href="#contato" className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors mt-auto">
                Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}