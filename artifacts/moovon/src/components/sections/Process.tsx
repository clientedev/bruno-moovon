import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Análise completa da sua situação atual, patrimônio e necessidades familiares."
  },
  {
    num: "02",
    title: "Planejamento",
    desc: "Elaboração da estratégia personalizada focada na sua proteção a longo prazo."
  },
  {
    num: "03",
    title: "Apresentação",
    desc: "Apresentação das soluções ideais desenhadas exclusivamente para o seu perfil."
  },
  {
    num: "04",
    title: "Contratação",
    desc: "Formalização simples, ágil e totalmente digital com as melhores seguradoras."
  },
  {
    num: "05",
    title: "Acompanhamento",
    desc: "Suporte contínuo e revisões periódicas para adaptar o plano às mudanças da sua vida."
  }
];

export function Process() {
  return (
    <section className="py-24 bg-muted/30 dark:bg-card/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Como funciona o atendimento</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Uma jornada clara para sua tranquilidade
            </h3>
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border/50 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center mb-6 group-hover:border-primary group-hover:text-primary transition-colors shadow-sm relative">
                  <span className="font-serif text-xl font-bold">{step.num}</span>
                  {/* Active dot */}
                  <div className="absolute inset-1 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{step.title}</h4>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}