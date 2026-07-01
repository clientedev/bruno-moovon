import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/bruno-saraiva.jpg" 
                alt="Bruno Saraiva de Castro" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-3xl z-0" />
            <div className="absolute top-12 -left-8 bg-card shadow-xl rounded-2xl p-6 border border-border/50 backdrop-blur-md z-20">
              <p className="font-serif text-3xl font-bold text-foreground">10+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Anos de Experiência</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Conheça Bruno Saraiva</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Sua segurança financeira é a nossa missão.
            </h3>
            
            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed mb-8">
              <p>
                Como fundador da BSeguros, dediquei os últimos 10 anos a uma única missão: proteger famílias, empresários e profissionais de imprevistos financeiros que podem desestabilizar uma vida inteira de trabalho.
              </p>
              <p>
                Acredito que o seguro de vida não é um custo, mas sim o pilar fundamental de qualquer planejamento patrimonial sério. Minha abordagem é consultiva e personalizada, entendendo profundamente a sua realidade antes de propor qualquer solução.
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                "Especialista em Seguros de Vida",
                "Consultor Financeiro e Mentor",
                "Foco em Planejamento Sucessório",
                "Educador Financeiro"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 pt-6 border-t border-border">
              <img src="/bruno-saraiva.jpg" alt="Bruno Saraiva" className="w-16 h-16 rounded-full object-cover object-top" />
              <div>
                <p className="font-serif font-bold text-xl text-foreground">Bruno Saraiva de Castro</p>
                <p className="text-sm text-muted-foreground">Fundador & CEO, BSeguros</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
