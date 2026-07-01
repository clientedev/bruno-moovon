import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ from, to, duration = 2, prefix = "", suffix = "" }: { from: number; to: number; duration?: number; prefix?: string; suffix?: string }) {
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

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export function TrustBar() {
  const stats = [
    { label: "Anos de Experiência", value: 10, suffix: "+", prefix: "" },
    { label: "Clientes Ativos", value: 1000, suffix: "+", prefix: "" },
    { label: "Capital Segurado", value: 1, suffix: " Bi+", prefix: "R$ " },
  ];

  const credentials = [
    { title: "MDRT", name: "Million Dollar Round Table", desc: "Selo máximo do mercado de seguros mundial", img: "/mdrt-logo.png", invert: true },
    { title: "ATCB", name: "Top Corretores do Brasil", desc: "Membro da maior associação de elite em seguros", img: "/atcb-selo.png", invert: false },
    { title: "SUSEP", name: "Credenciado", desc: "Corretor regulamentado e certificado", img: null, invert: false },
  ];

  return (
    <section className="py-16 bg-secondary dark:bg-background border-b border-border/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-2">Confiança construída através de resultados</h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
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
                <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </span>
              <span className="text-xs text-gray-400 text-center font-medium uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Credential badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {credentials.map((cred, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              {cred.img ? (
                <img
                  src={cred.img}
                  alt={cred.title}
                  className={`h-12 w-12 object-contain flex-shrink-0 ${cred.invert ? "brightness-0 invert opacity-90" : "opacity-90"}`}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">{cred.title}</span>
                </div>
              )}
              <div className="min-w-0">
                <p className="text-white font-bold text-sm">{cred.title}</p>
                <p className="text-gray-300 text-xs font-medium leading-tight">{cred.name}</p>
                <p className="text-gray-500 text-xs leading-tight mt-0.5">{cred.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
