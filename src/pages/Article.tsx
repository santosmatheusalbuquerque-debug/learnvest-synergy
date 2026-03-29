import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Share2, Volume2, Languages, Brain, ChevronRight, Send, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articleData } from "@/data/mockNews";
import { useToast } from "@/hooks/use-toast";

const Article = () => {
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const d = articleData;

  const handleAskAI = () => {
    if (!chatInput.trim()) return;
    const q = chatInput;
    setChatInput("");
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: q },
      {
        role: "ai",
        text: `Com base no artigo sobre o GPT-5, posso dizer que ${q.toLowerCase().includes("afeta") ? "o impacto será significativo para profissionais de tecnologia. A automação de tarefas complexas pode reduzir em até 40% o tempo gasto em codificação repetitiva, liberando profissionais para trabalho criativo e estratégico." : q.toLowerCase().includes("empresa") ? "empresas como Nubank, iFood e VTEX já estão na fila do beta. A tendência é que empresas de todos os portes adotem agentes autônomos de IA até o final de 2026." : "este desenvolvimento representa uma mudança de paradigma na indústria. O GPT-5 é capaz de raciocínio autônomo prolongado, o que abre possibilidades completamente novas para automação empresarial e pesquisa científica."}`,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-3xl">
          <Link to="/feed" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Feed
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "Em breve", description: "Recurso de áudio em desenvolvimento." })}><Volume2 size={16} /></Button>
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "Em breve", description: "Tradução em desenvolvimento." })}><Languages size={16} /></Button>
            <Button variant="ghost" size="icon" onClick={() => { setSaved(!saved); toast({ title: saved ? "Removido dos salvos" : "Notícia salva!" }); }}>
              <Bookmark size={16} className={saved ? "fill-primary text-primary" : ""} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "Link copiado!" })}><Share2 size={16} /></Button>
          </div>
        </div>
      </div>

      <article className="container mx-auto max-w-3xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
          <Link to="/feed" className="hover:text-foreground">Feed</Link>
          <ChevronRight size={12} />
          <span style={{ color: d.categoryColor }}>{d.category}</span>
          <ChevronRight size={12} />
          <span className="text-foreground/70">Artigo</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-4" style={{ backgroundColor: `${d.categoryColor}20`, color: d.categoryColor }}>
            {d.category}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight">{d.title}</h1>
          <p className="text-lg text-muted-foreground mt-3">{d.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">{d.sourceLogo}</div>
              <div>
                <p className="text-foreground font-medium text-xs">{d.source}</p>
                <p className="text-xs">{d.author}</p>
              </div>
            </div>
            <span>•</span>
            <span>{d.publishedAt}</span>
            <span>•</span>
            <span>{d.readTime} de leitura</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs">{d.bias}</span>
          </div>
        </motion.div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain size={18} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Resumo em 30 segundos</h3>
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">IA</span>
          </div>
          <ul className="space-y-2">
            {d.aiSummary.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
            💡 {d.aiContext}
          </div>
        </motion.div>

        {/* Article Body */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 space-y-5">
          {d.body.map((p, i) => (
            <p key={i} className={`text-[15px] leading-relaxed ${i === 2 ? "border-l-2 border-primary pl-4 italic text-foreground/80" : "text-foreground/90"}`}>
              {p}
            </p>
          ))}
        </motion.div>

        {/* AI Chat */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Pergunte sobre esta notícia</h3>
          </div>

          {chatMessages.length > 0 && (
            <div className="mb-4 space-y-3 max-h-60 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`rounded-lg p-3 text-sm ${msg.role === "user" ? "bg-muted text-foreground ml-8" : "bg-primary/5 border border-primary/10 text-foreground/90 mr-8"}`}>
                  {msg.role === "ai" && <Brain size={14} className="text-primary inline mr-1.5" />}
                  {msg.text}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            {d.suggestedQuestions.map((q) => (
              <button key={q} onClick={() => { setChatInput(q); }} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
              placeholder="Ex: Como isso afeta o mercado de trabalho em TI no Brasil?"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="hero" size="icon" onClick={handleAskAI}><Send size={16} /></Button>
          </div>
        </motion.div>

        {/* Related */}
        <div className="mt-10">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Notícias Relacionadas</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {d.relatedNews.map((n) => (
              <Link key={n.id} to={`/feed/article/${n.id}`} className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors">
                <p className="text-sm font-medium text-foreground line-clamp-2">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-2">{n.source} · {n.timeAgo}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="mt-10 rounded-xl border border-border bg-card p-5 text-center">
          <p className="text-sm font-medium text-foreground mb-3">Esta notícia foi útil para você?</p>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {["Muito útil", "Útil", "Pouco relevante", "Não era o que eu queria"].map((opt) => (
              <button
                key={opt}
                onClick={() => { setFeedback(opt); toast({ title: "Obrigado pelo feedback!" }); }}
                className={`rounded-lg border px-3 py-1.5 text-xs transition-all ${feedback === opt ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <button onClick={() => toast({ title: "Entendido!", description: "Vamos mostrar mais notícias assim." })} className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30">
              <ThumbsUp size={12} /> Mais notícias assim
            </button>
            <button onClick={() => toast({ title: "Entendido!", description: "Vamos ajustar suas preferências." })} className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30">
              <ThumbsDown size={12} /> Menos notícias assim
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Article;
