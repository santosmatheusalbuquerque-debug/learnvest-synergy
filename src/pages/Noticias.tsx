import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Clock, ExternalLink, TrendingUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const newsCategories = ["Todas", "Tecnologia", "Educação", "IA", "Mercado", "Ciência"];

const newsItems = [
  {
    id: 1, title: "OpenAI anuncia GPT-5 com capacidades multimodais avançadas",
    summary: "O novo modelo promete revolucionar a forma como interagimos com IA, trazendo compreensão contextual profunda e raciocínio lógico aprimorado.",
    category: "IA", time: "2h atrás", source: "TechCrunch", sentiment: "positivo", trending: true,
  },
  {
    id: 2, title: "MEC divulga novas diretrizes para educação digital em 2026",
    summary: "As novas regras estabelecem padrões de qualidade para cursos online e plataformas de ensino, impactando diretamente o mercado EdTech brasileiro.",
    category: "Educação", time: "4h atrás", source: "Folha", sentiment: "neutro", trending: false,
  },
  {
    id: 3, title: "Brasil lidera ranking de adoção de IA na América Latina",
    summary: "Relatório da McKinsey mostra que empresas brasileiras estão à frente na implementação de soluções de inteligência artificial na região.",
    category: "Tecnologia", time: "6h atrás", source: "Exame", sentiment: "positivo", trending: true,
  },
  {
    id: 4, title: "Estudo revela que microlearning aumenta retenção em 80%",
    summary: "Pesquisa conduzida por universidades brasileiras confirma a eficácia de sessões curtas de aprendizado para retenção de longo prazo.",
    category: "Educação", time: "8h atrás", source: "Época", sentiment: "positivo", trending: false,
  },
  {
    id: 5, title: "Nova regulamentação para plataformas de tecnologia entra em vigor",
    summary: "As novas regras de proteção de dados e transparência algorítmica começam a valer para empresas de tecnologia operando no Brasil.",
    category: "Tecnologia", time: "10h atrás", source: "G1", sentiment: "neutro", trending: false,
  },
  {
    id: 6, title: "Mercado de EdTech brasileiro deve crescer 25% em 2026",
    summary: "Análise do setor indica aceleração no investimento em plataformas educacionais, impulsionada por demanda por qualificação profissional.",
    category: "Mercado", time: "12h atrás", source: "InfoMoney", sentiment: "positivo", trending: true,
  },
  {
    id: 7, title: "Cientistas desenvolvem novo método de sequenciamento genético com IA",
    summary: "Técnica combina deep learning com bioinformática para acelerar diagnósticos genéticos em até 10 vezes.",
    category: "Ciência", time: "14h atrás", source: "Nature BR", sentiment: "positivo", trending: false,
  },
];

const sentimentColors: Record<string, string> = {
  positivo: "bg-green-500/15 text-green-400",
  negativo: "bg-red-500/15 text-red-400",
  neutro: "bg-muted text-muted-foreground",
};

const Noticias = () => {
  const [filter, setFilter] = useState("Todas");
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const toggleSave = (id: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = filter === "Todas" ? newsItems : newsItems.filter((n) => n.category === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Notícias</h1>
          <p className="text-muted-foreground">Fique por dentro das últimas novidades.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News list */}
        <div className="space-y-4">
          {filtered.map((news, i) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">{news.category}</span>
                    <span className={cn("rounded px-2 py-0.5 text-xs font-medium", sentimentColors[news.sentiment])}>
                      {news.sentiment}
                    </span>
                    {news.trending && (
                      <span className="flex items-center gap-1 text-xs text-accent">
                        <TrendingUp size={12} /> Em alta
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{news.summary}</p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={12} /> {news.time}</span>
                    <span>Fonte: {news.source}</span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSave(news.id)}
                    className={cn(saved.has(news.id) && "text-accent")}
                  >
                    {saved.has(news.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ExternalLink size={18} />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Noticias;
