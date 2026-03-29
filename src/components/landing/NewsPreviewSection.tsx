import { motion } from "framer-motion";
import { Brain, Bookmark, MessageSquare, TrendingUp } from "lucide-react";

const NewsPreviewSection = () => {
  return (
    <section id="noticias" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Notícias que fazem sentido <span className="text-gradient">para você</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Nossa IA analisa seus interesses e entrega o que realmente importa — sem ruído, sem perda de tempo.
          </p>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-card">
            {/* Browser bar */}
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-accent/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 ml-4 rounded-md bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                notice.me/feed
              </div>
            </div>

            {/* Fake feed content */}
            <div className="p-6 space-y-4">
              {/* Featured card */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wide">Destaque</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium" style={{ backgroundColor: "#ef444420", color: "#ef4444" }}>Geopolítica</span>
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg leading-snug">
                  EUA e China firmam acordo histórico sobre tarifas comerciais
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  Após 8 meses de impasse, representantes assinaram memorando que suspende tarifas sobre 340 categorias de produtos...
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80"><Brain size={14} /> Resumo IA</button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><Bookmark size={14} /> Salvar</button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><MessageSquare size={14} /> Chat</button>
                </div>
              </div>

              {/* Mini cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { cat: "Tecnologia", color: "#3b82f6", title: "Apple lança chips M4 Ultra", rank: 1 },
                  { cat: "IA", color: "#F97316", title: "OpenAI anuncia GPT-5", rank: 2 },
                  { cat: "Economia", color: "#22c55e", title: "PIB do Brasil cresce 3,8%", rank: 3 },
                ].map((n) => (
                  <div key={n.rank} className="rounded-lg border border-border bg-background/50 p-3">
                    <div className="flex items-center gap-1 mb-1.5">
                      <TrendingUp size={10} className="text-primary" />
                      <span className="text-[10px] font-medium text-muted-foreground">#{n.rank}</span>
                    </div>
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-medium" style={{ backgroundColor: `${n.color}20`, color: n.color }}>{n.cat}</span>
                    <p className="text-xs font-medium text-foreground mt-1.5 line-clamp-2">{n.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsPreviewSection;
