import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EbookCapture() {
  return (
    <section id="ebook" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-primary/5 dark:bg-card border border-primary/20 dark:border-border rounded-3xl overflow-hidden p-10 md:p-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <BookOpen className="w-9 h-9 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Desvendando o Planejamento Sucessório
            </h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Material exclusivo gratuito para quem quer entender de verdade como proteger patrimônio e planejar o futuro com segurança.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                Material exclusivo para
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm font-medium leading-relaxed">Clientes de alto patrimônio que desejam entender melhor planejamento sucessório e reforma tributária.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm font-medium leading-relaxed">Corretores de seguros que desejam aprofundar seus conhecimentos e evoluir profissionalmente.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start gap-4 md:pl-8 md:border-l md:border-border/50"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Acesso imediato
              </p>
              <p className="text-muted-foreground font-light text-sm leading-relaxed">
                Baixe agora e comece a aplicar as estratégias ainda hoje.
              </p>
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto rounded-full gap-2 text-base font-semibold px-8"
              >
                <a
                  href="https://brunosaraiva-c.hotmart.host/desvendendo-o-planejamento-sucessorio-ef2a33f4-de34-472f-92f5-7481f5416bd4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acessar E-book
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Você será redirecionado para a página oficial do E-book
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

