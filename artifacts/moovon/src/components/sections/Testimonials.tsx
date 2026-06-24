import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    text: "Graças à MOOVON, finalmente entendi como proteger minha família e meu patrimônio. Bruno é um profissional excepcional.",
    author: "Carlos Eduardo M.",
    role: "Empresário",
    initials: "CE"
  },
  {
    text: "A consultoria personalizada foi fundamental para o planejamento sucessório da nossa empresa. Recomendo sem hesitar.",
    author: "Dra. Ana Paula S.",
    role: "Médica",
    initials: "AP"
  },
  {
    text: "Profissionalismo e atenção em cada detalhe. Me sinto seguro sabendo que minha família está protegida.",
    author: "Roberto T.",
    role: "Advogado",
    initials: "RT"
  },
  {
    text: "O Bruno me ajudou a entender que seguro de vida é investimento, não custo. Transformou minha visão financeira.",
    author: "Marcos V.",
    role: "Executivo",
    initials: "MV"
  },
  {
    text: "Atendimento humanizado e soluções que realmente fazem sentido para o meu perfil. Excelente!",
    author: "Patrícia L.",
    role: "Profissional Liberal",
    initials: "PL"
  }
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">O que nossos clientes dizem</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              A confiança é o nosso maior patrimônio.
            </h3>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-card border border-border/50 rounded-3xl p-8 h-full flex flex-col hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground font-light italic leading-relaxed mb-8 flex-grow">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-foreground font-bold">{t.author}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-border text-foreground hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="hidden md:flex -right-12 border-border text-foreground hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}