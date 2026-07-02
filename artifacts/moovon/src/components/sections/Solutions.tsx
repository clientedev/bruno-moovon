import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { getSolutionIcon } from "@/lib/solutionIcons";

export interface Solution {
  id: number;
  slug: string;
  icon: string;
  title: string;
  desc: string;
  fullDesc: string;
  image: string;
  benefits: string[];
  active: boolean;
  orderIndex: number;
}

export function Solutions() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    fetch(`${base}/api/solutions`)
      .then((r) => r.json())
      .then((data) => setSolutions(Array.isArray(data) ? data : []))
      .catch(() => setSolutions([]))
      .finally(() => setLoading(false));
  }, [base]);

  return (
    <section id="solucoes" className="py-24 bg-muted/30 dark:bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Nossas Soluções</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Proteção sob medida para o seu momento de vida
            </h3>
            <p className="text-lg text-muted-foreground font-light">
              Oferecemos um portfólio completo de soluções em wealth management e seguros, desenhadas especificamente para profissionais exigentes.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-3xl bg-card border border-border/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((item, i) => {
              const Icon = getSolutionIcon(item.icon);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">{item.title}</h4>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6 flex-1">{item.desc}</p>

                  <a
                    href={`/solucao/${item.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors mt-auto"
                  >
                    Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
