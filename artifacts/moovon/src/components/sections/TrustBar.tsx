import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function TrustBar() {
  const stats = [
    { label: "Anos de Mercado", value: 7, suffix: "+" },
    { label: "Clientes Atendidos", value: 500, suffix: "+" },
    { label: "Atendimento Nacional", value: 100, suffix: "%" }
  ];

  const credentials = [
    "SUSEP Credenciado",
    "Corretor Certificado",
    "Planejamento Patrimonial"
  ];

  return (
    <section className="py-16 bg-secondary dark:bg-background border-b border-border/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-2">Confiança construída através de resultados</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="text-3xl font-serif font-bold text-white mb-2">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs text-gray-400 text-center font-medium uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
          
          {credentials.map((cred, i) => (
            <motion.div 
              key={`cred-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 3) * 0.1 }}
              className="flex items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="text-xs text-gray-300 text-center font-medium uppercase tracking-wider">{cred}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}