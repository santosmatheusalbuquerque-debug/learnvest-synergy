import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Bookmark, Share2, Volume2, Languages,
  Brain, ChevronRight, Send, ThumbsUp, ThumbsDown, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { chatWithArticle } from "@/services/groqService";
import { Article } from "@/types/article";
import { articleData } from "@/data/mockNews";

const ArticlePage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const passedArticle = location.state?.article as Article | undefined;

  const [saved, setSaved] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  const title = passedArticle?.title ?? articleData.title;
  const source = passedArticle?.source ?? articleData.source;
  const author = passedArticle?.author ?? articleData.author;
  const categoryLabel = passedArticle?.categoryLabel ?? articleData.category;
  const categoryColor = passedArticle?.categoryColor ?? "#F97316";
  const image = passedArticle?.image ?? "";
  const url = passedArticle?.url ?? "#";
  const description = passedArticle?.description ?? articleData.subtitle;
  const aiSummary = passedArticle?.aiSummary ?? articleData.aiSummary;
  const personalInsight = passedArticle?.personalInsight ?? articleData.aiContext;
  const summaryLoading = passedArticle?.summaryLoading ?? false;
  const publishedAt = passedArticle?.publishedAt
    ? new Date(passedArticle.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : articleData.publishedAt;
  const readTime = passedArticle?.readTime ?? parseInt(articleData.readTime);

  const suggested = [
    "O que causou isso?",
    "Como isso me afeta?",
    "Quais as consequências?",
    "Qual o contexto histórico?",
  ];

  const handleAskAI = async (q?: string) => {
    const question = q ?? chatInput;
    if (!question.trim() || typing) return;
    setChatInput("");
    setTyping(true);
    setChatMessages((prev) => [...prev, { role: "user", text: question }]);

    try {
      const answer = await chatWithArticle(title, description, question);
      setChatMessages((prev) => [...prev, { role: "ai", text: answer }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: "Não consegui responder agora. Tente novamente em instantes." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link to="/feed" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Feed
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => toast({ title: "Em breve", description: "Recurso de áudio em desenvolvimento." })}>
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toast({ title: "Em breve", description: "Tradução em desenvolvimento." })}>
              <Languages className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setSaved(!saved); toast({ title: saved ? "Removido dos salvos" : "Notícia salva!" }); }}>
              <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(url); toast({ title: "Link copiado!" }); }}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/feed" className="hover:text-foreground">Feed</Link>
          <ChevronRight className="h-3 w-3" />
          <span>{categoryLabel}</span>
          <ChevronRight className="h-3 w-3" />
          <span>Artigo</span>
        </nav>

        {/* Article Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}>
            {categoryLabel}
          </span>
          <h1 className="mb-3 text-3xl font-bold text-foreground leading-tight">{title}</h1>
          <p className="mb-6 text-lg text-muted-foreground">{description}</p>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
              {source.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{source}</p>
              <p className="text-xs text-muted-foreground">{author}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
              <span>{publishedAt}</span>
              <span>· {readTime} min de leitura</span>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        {image && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="mb-8">
            <img src={image} alt={title} className="w-full rounded-2xl object-cover max-h-72" />
          </motion.div>
        )}

        {/* AI Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Resumo em 30 segundos</h3>
            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">IA</span>
          </div>

          {summaryLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Gerando resumo com IA...
            </div>
          ) : (
            <ul className="mb-3 space-y-1.5">
              {aiSummary.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 text-primary font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {personalInsight && (
            <p className="text-xs text-primary rounded-lg bg-primary/10 px-3 py-2 border-l-2 border-primary">
              💡 {personalInsight}
            </p>
          )}
        </motion.div>

        {/* Article body */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8 space-y-4">
          {passedArticle ? (
            <>
              <p className="text-base text-foreground leading-relaxed">{description}</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary hover:bg-primary/10 transition-colors">
                Ler matéria completa no {source} →
              </a>
            </>
          ) : (
            articleData.body.map((p, i) => (
              <p key={i} className="text-base text-foreground leading-relaxed">{p}</p>
            ))
          )}
        </motion.div>

        {/* AI Chat */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10 rounded-xl border border-primary/20 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Pergunte sobre esta notícia</h3>
          </div>

          {chatMessages.length > 0 && (
            <div className="mb-4 space-y-3 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2 text-sm ${msg.role === "ai" ? "text-foreground" : "justify-end"}`}>
                  {msg.role === "ai" && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Brain className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <p className={`rounded-xl px-3 py-2 max-w-[85%] leading-relaxed ${msg.role === "ai" ? "bg-muted" : "bg-primary/10 text-primary"}`}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {typing && (
            <div className="mb-4 flex gap-2 items-center text-sm text-muted-foreground">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Brain className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="flex gap-1 px-3 py-2 bg-muted rounded-xl">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div className="mb-3 flex flex-wrap gap-2">
            {suggested.map((q) => (
              <button key={q} onClick={() => handleAskAI(q)} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
              placeholder="Ex: Como isso afeta o mercado de trabalho no Brasil?"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={() => handleAskAI()} size="sm" disabled={typing}>
              {typing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Feedback */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-3 text-sm font-medium text-foreground">Esta notícia foi útil para você?</p>
          <div className="mb-4 flex flex-wrap gap-2">
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
          <div className="flex gap-2">
            <button onClick={() => toast({ title: "Entendido!", description: "Vamos mostrar mais notícias assim." })} className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30">
              <ThumbsUp className="h-3 w-3" /> Mais assim
            </button>
            <button onClick={() => toast({ title: "Entendido!", description: "Vamos ajustar suas preferências." })} className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30">
              <ThumbsDown className="h-3 w-3" /> Menos assim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
