import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EbookCapture() {
  return (
    <section id="ebook" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-primary/5 dark:bg-card border border-primary/20 dark:border-border rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Cover Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-10 md:p-16 bg-secondary/5 dark:bg-black/10"
            >
              <img
                src="/ebook-cover.png"
                alt="Ebook Desvendando o Planejamento Sucessório"
                className="w-full max-w-sm object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Content Side */}
            <div className="p-10 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Desvendando o Planejamento Sucessório
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Material exclusivo gratuito para quem quer entender de verdade como proteger patrimônio e planejar o futuro com segurança.
                </p>

                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                  Material exclusivo para
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-medium leading-relaxed">Clientes de alto patrimônio que desejam entender melhor planejamento sucessório e reforma tributária.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-medium leading-relaxed">Corretores de seguros que desejam aprofundar seus conhecimentos e evoluir profissionalmente.</span>
                  </li>
                </ul>

                <div className="flex flex-col gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto rounded-full gap-2 text-base font-semibold px-8"
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
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
