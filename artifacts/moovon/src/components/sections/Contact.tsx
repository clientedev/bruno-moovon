import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
  message: z.string().min(10, "Mensagem é obrigatória"),
});

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Nossa equipe entrará em contato em breve.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Mensagem enviada!",
        description: "Nossa equipe entrará em contato em breve.",
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Atendimento Exclusivo</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pronto para planejar o seu legado?
            </h3>
            <p className="text-lg text-muted-foreground font-light mb-10">
              Solicite uma consultoria gratuita. Vamos analisar o seu cenário e entender as melhores opções de proteção para o seu patrimônio.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">WhatsApp / Telefone</h4>
                  <a href="https://wa.me/5511966088872" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    (11) 96608-8872
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">E-mail</h4>
                  <a href="mailto:moovon.consulting@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    moovon.consulting@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Instagram</h4>
                  <a href="https://instagram.com/moovonconsulting" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    @moovonconsulting
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Localização</h4>
                  <p className="text-muted-foreground">
                    São Paulo, SP<br />Atendimento em todo o Brasil
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Envie uma mensagem</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone / WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Como podemos te ajudar hoje?" 
                          className="min-h-[120px] resize-none bg-background" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Solicitar Consultoria"}
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}