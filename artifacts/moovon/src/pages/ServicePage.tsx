import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { solutions } from "@/components/sections/Solutions";

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = solutions.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Serviço não encontrado</h1>
          <Link href="/">
            <Button variant="outline">Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const currentIndex = solutions.findIndex((s) => s.slug === slug);
  const otherServices = solutions.filter((_, i) => i !== currentIndex).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/#solucoes">
              <span className="inline-flex items-center text-white/70 hover:text-white text-sm font-medium mb-6 cursor-pointer transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Todas as soluções
              </span>
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/60 text-sm font-medium tracking-widest uppercase">Solução</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 max-w-3xl leading-tight">
              {service.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Main content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                O que é este serviço?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 font-light">
                {service.fullDesc}
              </p>

              <h3 className="text-xl font-bold text-foreground mb-6">O que está incluído</h3>
              <ul className="space-y-4 mb-12">
                {service.benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/80">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="/#contato">Solicitar Consultoria Gratuita</a>
              </Button>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-card border border-border/50 rounded-3xl p-8 mb-8">
                <h3 className="text-lg font-bold text-foreground mb-2">Pronto para começar?</h3>
                <p className="text-muted-foreground text-sm mb-6 font-light leading-relaxed">
                  Agende uma consulta gratuita e entenda como esta solução pode proteger o seu patrimônio.
                </p>
                <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3">
                  <a href="/#contato">Falar com Bruno Saraiva</a>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>

              {otherServices.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">Outras Soluções</h3>
                  <div className="space-y-3">
                    {otherServices.map((s) => {
                      const SIcon = s.icon;
                      return (
                        <Link key={s.slug} href={`/solucao/${s.slug}`}>
                          <div className="group flex items-center gap-3 p-4 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                              <SIcon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{s.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
