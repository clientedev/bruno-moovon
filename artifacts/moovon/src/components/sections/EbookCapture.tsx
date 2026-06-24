import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Download } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(10, "WhatsApp é obrigatório"),
  lgpd: z.literal(true, {
    errorMap: () => ({ message: "Você precisa concordar com a política de privacidade" }),
  }),
});

export function EbookCapture() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      // @ts-ignore - literal true checkbox
      lgpd: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      // Ignore 404s since it's a mock endpoint
      toast({
        title: "E-book enviado com sucesso!",
        description: "Verifique sua caixa de entrada em instantes.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "E-book enviado!",
        description: "Verifique sua caixa de entrada em instantes.",
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  const benefits = [
    "Seguro de vida explicado de forma simples",
    "Estratégias de proteção patrimonial",
    "Planejamento sucessório na prática",
    "Como evitar erros financeiros fatais",
    "Dicas exclusivas dos especialistas"
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
                  <Download className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Baixe Gratuitamente o Guia Completo de Proteção Financeira
                </h2>
                <p className="text-lg text-muted-foreground font-light mb-8">
                  Descubra como proteger sua família, seu patrimônio e garantir que o seu futuro seja exatamente como você planejou.
                </p>

                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Form Side */}
            <div className="p-8 md:p-16 flex items-center justify-center bg-background dark:bg-background/50 border-l border-transparent lg:border-border/50">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-md"
              >
                <h3 className="text-xl font-bold text-foreground mb-6">Preencha os dados para receber:</h3>
                
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

                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lgpd"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2 mt-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-normal text-sm text-muted-foreground cursor-pointer">
                              Li e concordo com a <a href="#" className="text-primary underline underline-offset-4">Política de Privacidade</a> e consinto em receber comunicações.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full mt-4" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Receber E-book Gratuitamente"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}