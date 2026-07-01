import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EbookCapture() {
  const benefits = [
    "Seguro de vida explicado de forma simples",
    "Estratégias de proteção patrimonial",
    "Planejamento sucessório na prática",
    "Como evitar erros financeiros fatais",
    "Dicas exclusivas dos especialistas",
  ];

  return (
    <section id="ebook" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-primary/5 dark:bg-card border border-primary/20 dark:border-border rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Content Side */}
            <div className="p-8 md:p-16 flex flex-col justify-center bg-muted/50 dark:bg-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Guia Completo de Proteção Financeira
                </h2>
                <p className="text-lg text-muted-foreground font-light mb-8">
                  Descubra como proteger sua família, seu patrimônio e garantir que o seu futuro seja exatamente como você planejou.
                </p>

                <ul className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Info Side */}
            <div className="p-8 md:p-16 flex items-center justify-center bg-background dark:bg-background/50 border-l border-transparent lg:border-border/50">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-md text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                  <BookOpen className="w-9 h-9 text-primary" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Mentoria Renda Vitalícia
                </h3>

                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Acesse o programa completo de mentoria e transforme sua relação com o dinheiro. Conteúdo exclusivo, estratégias comprovadas e o acompanhamento direto de Bruno Saraiva para construir sua renda vitalícia.
                </p>

                <div className="flex flex-col gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-full gap-2 text-base font-semibold"
                  >
                    <a
                      href="https://mentoriarendavitalicia.com.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Acessar o E-book
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Você será redirecionado para o site oficial da mentoria
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
