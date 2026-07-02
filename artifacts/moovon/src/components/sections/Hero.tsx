import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroImage {
  id: string;
  data: string;
  label?: string;
  active: boolean;
  orderIndex: number;
}

export function Hero() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const activeImages = data.filter((img) => img.active).sort((a, b) => a.orderIndex - b.orderIndex);
          if (activeImages.length > 0) {
            setImages(activeImages);
          }
        }
      })
      .catch((err) => console.error("Failed to load hero images", err));
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const currentImage = images.length > 0 ? images[currentIndex].data : "/images/hero-bg.png";

  return (
    <section id="inicio" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImage}
            src={currentImage}
            alt="Hero Background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-5"
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
            Há mais de 10 anos ajudando famílias, empresários e profissionais a proteger seu patrimônio e construir um futuro financeiro seguro.
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

        </div>
      </div>

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-primary w-8" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
