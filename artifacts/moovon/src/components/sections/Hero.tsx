import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Família e prosperidade"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/30 dark:from-background dark:via-background/80 dark:to-background/20" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-foreground text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm border border-primary/30">
              Wealth Management & Proteção
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6"
          >
            Proteja quem você ama. <br />
            <span className="text-primary-foreground/90 font-light italic">Planeje o futuro</span> com segurança.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed"
          >
            Há mais de 7 anos ajudando famílias, empresários e profissionais a proteger seu patrimônio e construir um futuro financeiro seguro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button size="lg" className="rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <a href="#contato">Solicitar Consultoria</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-white/30 text-white hover:bg-white hover:text-secondary bg-transparent backdrop-blur-sm" asChild>
              <a href="https://wa.me/5511966088872" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              "+7 anos de experiência",
              "Atendimento nacional",
              "Especialista em proteção"
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm text-gray-300 font-medium tracking-wide uppercase">{stat}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}