import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EbookCapture() {
  return (
    <section id="ebook" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-primary/5 dark:bg-card border border-primary/20 dark:border-border rounded-3xl overflow-hidden">
          <div className="flex justify-center">

            {/* Info Side */}
            <div className="p-8 md:p-16 flex items-center justify-center bg-background dark:bg-background/50 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-md text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                  <BookOpen className="w-9 h-9 text-primary" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Desvendando o Planejamento Sucessório
                </h3>

                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  Material exclusivo para:
                </p>

                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-medium">Clientes de alto patrimônio que desejam entender melhor planejamento sucessório e reforma tributária.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-medium">Corretores de seguros que desejam aprofundar seus conhecimentos e evoluir profissionalmente.</span>
                  </li>
                </ul>

                <div className="flex flex-col gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-full gap-2 text-base font-semibold"
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

