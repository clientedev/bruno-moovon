import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Por que contratar um seguro de vida?",
    a: "O seguro de vida garante proteção financeira para sua família em caso de imprevistos, mantendo o padrão de vida e honrando compromissos mesmo na sua ausência."
  },
  {
    q: "Seguro de vida serve apenas para quem tem filhos?",
    a: "Não. O seguro de vida é recomendado para qualquer pessoa que possui dependentes financeiros, dívidas ou patrimônio a proteger, servindo também como proteção em casos de invalidez ou doenças graves."
  },
  {
    q: "Como funciona o pagamento?",
    a: "O pagamento é feito através de boleto bancário ou débito em conta, com mensalidades que se encaixam perfeitamente no seu orçamento financeiro, desenhadas no momento do planejamento."
  },
  {
    q: "Posso contratar online?",
    a: "Sim! Realizamos todo o processo de forma digital, com atendimento personalizado via videoconferência, garantindo a mesma qualidade e segurança de um encontro presencial."
  },
  {
    q: "Quais seguradoras vocês trabalham?",
    a: "Trabalhamos com as principais seguradoras do mercado nacional e internacional, sempre buscando a melhor cobertura com o melhor custo-benefício para o seu perfil específico."
  },
  {
    q: "Como funciona a consultoria?",
    a: "Fazemos um diagnóstico completo da sua situação patrimonial, elaboramos um planejamento estratégico personalizado e apresentamos as melhores soluções desenhadas exclusivamente para o seu perfil e momento de vida."
  }
];

export function FAQ() {
  return (
    <section className="py-24 bg-muted/30 dark:bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Tire suas dúvidas</h2>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Perguntas Frequentes
            </h3>
            <p className="text-muted-foreground font-light mb-6">
              Ainda tem dúvidas sobre proteção financeira e sucessória? Separamos as perguntas mais comuns dos nossos clientes.
            </p>
            <p className="text-sm text-foreground font-medium">
              Não encontrou o que procurava? <a href="#contato" className="text-primary hover:underline">Fale conosco</a>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-background rounded-2xl border border-border/50 px-6 shadow-sm data-[state=open]:border-primary/30 transition-colors">
                  <AccordionTrigger className="text-left font-bold text-base hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6 text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
}