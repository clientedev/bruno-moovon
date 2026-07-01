import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Differentials() {
  const items = [
    "Atendimento consultivo",
    "Soluções personalizadas",
    "Atendimento em todo Brasil",
    "Planejamento de longo prazo",
    "Proteção patrimonial",
    "Especialização em seguros de vida",
    "Suporte contínuo",
    "Atendimento humanizado"
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Por que escolher a BSeguros?</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Excelência e exclusividade em cada detalhe.
            </h3>
            <p className="text-lg text-muted-foreground font-light mb-8">
              Não vendemos apólices. Entregamos tranquilidade, planejamento e a certeza de que seu legado está seguro nas mãos de especialistas dedicados a você.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
          >
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg text-foreground font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}