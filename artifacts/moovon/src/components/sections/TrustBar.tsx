import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Award } from "lucide-react";

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
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-2">Confiança construída através de resultados</h2>
        </div>
        
        {/* Prestige Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] border border-[#C9A84C]/30 shadow-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center gap-6">
              <img
                src="/mdrt-logo.png"
                alt="MDRT Logo"
                className="w-24 h-24 object-contain flex-shrink-0 drop-shadow-lg"
              />
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#C9A84C] mb-1">MDRT</h3>
                <p className="text-white font-medium text-lg mb-2">Million Dollar Round Table</p>
                <p className="text-gray-400 text-sm leading-relaxed">Selo máximo do mercado de seguros, conquista de poucos especialistas no mundo.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative flex flex-col p-8 rounded-2xl bg-white/5 border border-white/10 shadow-lg overflow-hidden group"
          >
            <div className="relative z-10 flex items-center gap-6">
              <img
                src="/atcb-selo.png"
                alt="Selo ATCB"
                className="w-24 h-24 object-contain flex-shrink-0 drop-shadow-lg"
              />
              <div>
                <h3 className="text-3xl font-serif font-bold text-white mb-1">ATCB</h3>
                <p className="text-white font-medium text-lg mb-2">Associação Top Corretores do Brasil</p>
                <p className="text-gray-400 text-sm leading-relaxed">Membro ativo da maior associação de elite do mercado de seguros do Brasil.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Standard Stats & Credentials */}
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
