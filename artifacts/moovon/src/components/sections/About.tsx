import { motion } from "framer-motion";
import { CheckCircle2, Mail, Instagram, Linkedin } from "lucide-react";

export function About() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">

        {/* Main grid — photo + bio */}
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
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-3xl z-0" />
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
              <img src="/bruno-perfil.jpg" alt="Bruno Saraiva" className="w-16 h-16 rounded-full object-cover object-top" />
              <div>
                <p className="font-serif font-bold text-xl text-foreground">Bruno Saraiva de Castro</p>
                <p className="text-sm text-muted-foreground">Fundador & CEO, BSeguros</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certification seal cards — centered below the bio grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {/* MDRT */}
          <a
            href="https://www.mdrt.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/40 hover:bg-muted/60 transition-all duration-300"
          >
            <img
              src="/mdrt-logo.png"
              alt="MDRT"
              className="w-24 h-24 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <p className="font-serif font-bold text-lg text-foreground">MDRT</p>
              <p className="text-sm font-medium text-primary mb-2">Million Dollar Round Table</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                O mais alto reconhecimento internacional do setor de seguros, conquistado por menos de 1% dos profissionais no mundo.
              </p>
            </div>
          </a>

          {/* ATCB */}
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-muted/40 border border-border/60">
            <img
              src="/atcb-selo.png"
              alt="ATCB"
              className="w-24 h-24 object-contain drop-shadow-md"
            />
            <div>
              <p className="font-serif font-bold text-lg text-foreground">ATCB</p>
              <p className="text-sm font-medium text-primary mb-2">Associação Top Corretores do Brasil</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Membro ativo da maior associação de elite do mercado de seguros do Brasil, reunindo os melhores profissionais do setor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Thin contact strip — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 pt-7 border-t border-border/50 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <a
            href="mailto:atendimento@bseguros.com.br"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span>atendimento@bseguros.com.br</span>
          </a>
          <a
            href="https://instagram.com/brunosaraiva.c"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <Instagram className="w-4 h-4 text-primary shrink-0" />
            <span>@brunosaraiva.c</span>
          </a>
          <a
            href="https://www.linkedin.com/in/brunosaraivadecastro/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <Linkedin className="w-4 h-4 text-primary shrink-0" />
            <span>Bruno Saraiva</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
