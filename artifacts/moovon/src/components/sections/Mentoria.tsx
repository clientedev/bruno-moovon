import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Target, Lightbulb } from "lucide-react";

export function Mentoria() {
  return (
    <section id="mentoria" className="py-24 bg-secondary dark:bg-card border-y border-border/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-6 border border-primary/30">
              Exclusivo para Corretores
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Mentoria exclusiva para corretores de seguros de vida.
            </h2>
            <p className="text-lg text-gray-300 font-light mb-8 leading-relaxed max-w-xl">
              Uma mentoria desenvolvida especialmente para corretores de seguros de vida que desejam elevar seus resultados, dominar o planejamento sucessório e construir uma carteira de clientes de alto padrão.
            </p>
            
            <Button size="lg" className="rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <a href="https://mentoriarendavitalicia.com.br/" target="_blank" rel="noopener noreferrer">
                Quero saber mais <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: Target,
                title: "Objetivos Claros",
                desc: "Alinhamento das suas finanças com seus objetivos de vida e família."
              },
              {
                icon: TrendingUp,
                title: "Estratégia Sólida",
                desc: "Criação de um portfólio de proteção que evolui com seu patrimônio."
              },
              {
                icon: Lightbulb,
                title: "Decisões Inteligentes",
                desc: "Educação financeira para evitar armadilhas comuns do mercado."
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm ${i === 2 ? 'sm:col-span-2' : ''}`}
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 font-light text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}