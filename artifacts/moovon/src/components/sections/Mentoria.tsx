import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, Briefcase, MessageCircle } from "lucide-react";

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
              Transforme sua carreira de corretor e construa uma renda recorrente e vitalícia escalável, mesmo que esteja começando do zero.
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
                icon: Brain,
                title: "1. Domínio Técnico",
                desc: "Aprenda a dominar coberturas, cláusulas, simulações e fazer comparativos entre seguradoras, garantindo autoridade e segurança em cada venda."
              },
              {
                icon: Target,
                title: "2. Captação Estratégica",
                desc: "Atração de Clientes Qualificados: Defina seu nicho, aprenda a captar clientes por indicações, redes sociais e parcerias."
              },
              {
                icon: Briefcase,
                title: "3. Roteiro de Vendas",
                desc: "Aprenda um roteiro completo para agendar, abordar e fechar com técnica. Aprenda a contornar objeções e gerar recomendações com naturalidade."
              },
              {
                icon: MessageCircle,
                title: "4. Performance e Comunicação",
                desc: "Dicas de Ouro: Desenvolva sua comunicação emocional e storytelling para conectar e vender. Use PNL e arquétipos de clientes para entender perfis e ajustar sua abordagem."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}