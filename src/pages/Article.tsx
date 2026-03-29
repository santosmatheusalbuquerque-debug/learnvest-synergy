import { useState } from "react";
<<<<<<< Updated upstream
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Share2, Volume2, Languages, Brain, ChevronRight, Send, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articleData } from "@/data/mockNews";
import { useToast } from "@/hooks/use-toast";

const Article = () => {
  const { toast } = useToast();
=======
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

  // Tenta pegar artigo passado via state (ao navegar do feed)
  const passedArticle = location.state?.article as Article | undefined;

>>>>>>> Stashed changes
  const [saved, setSaved] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
<<<<<<< Updated upstream
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

=======
  const [typing, setTyping] = useState(false);

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
    setMessages((prev) => [...prev, { role: "user", text: question }]);

    try {
      const title = passedArticle?.title ?? articleData.title;
      const description = passedArticle?.description ?? articleData.subtitle;
      const answer = await chatWithArticle(title, description, question);
      setMessages((prev) => [...prev, { role: "ai", text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Não consegui responder agora. Tente novamente em instantes." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  // helper para evitar conflito com o useState acima
  function setMessages(fn: (prev: { role: string; text: string }[]) => { role: string; text: string }[]) {
    setChatMessages(fn);
  }

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
    ? new Date(passedArticle.publishedAt).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "long", year: "numeric",
      })
    : articleData.publishedAt;
  const readTime = passedArticle?.readTime ?? parseInt(articleData.readTime);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link
            to="/feed"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Feed
          </Link>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Em breve", description: "Recurso de áudio em desenvolvimento." })}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Em breve", description: "Tradução em desenvolvimento." })}
            >
              <Languages className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSaved(!saved);
                toast({ title: saved ? "Removido dos salvos" : "Notícia salva!" });
              }}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast({ title: "Link copiado!" });
              }}
            >
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
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
            style={{ backgroundColor: categoryColor }}
          >
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
              <span>• {publishedAt}</span>
              <span>• {readTime} min de leitura</span>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        {image && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="mb-8">
            <img src={image} alt={title} className="w-full rounded-2xl object-cover max-h-72" />
          </motion.div>
        )}

>>>>>>> Stashed changes
        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
<<<<<<< Updated upstream
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
=======
          className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-5"
        >
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

        {/* Article body / link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {passedArticle ? (
            <>
              <p className="text-base text-foreground leading-relaxed">{description}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary hover:bg-primary/10 transition-colors"
              >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10 rounded-xl border border-primary/20 bg-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Pergunte sobre esta notícia</h3>
          </div>

          {chatMessages.length > 0 && (
            <div className="mb-4 space-y-3 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 text-sm ${msg.role === "ai" ? "text-foreground" : "justify-end"}`}
                >
                  {msg.role === "ai" && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Brain className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <p
                    className={`rounded-xl px-3 py-2 max-w-[85%] leading-relaxed ${
                      msg.role === "ai" ? "bg-muted" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {msg.text}
                  </p>
>>>>>>> Stashed changes
                </div>
              ))}
            </div>
          )}

<<<<<<< Updated upstream
          <div className="flex flex-wrap gap-2 mb-3">
            {d.suggestedQuestions.map((q) => (
              <button key={q} onClick={() => { setChatInput(q); }} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
=======
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
              <button
                key={q}
                onClick={() => handleAskAI(q)}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
>>>>>>> Stashed changes
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
<<<<<<< Updated upstream
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
=======
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
                onClick={() => {
                  setFeedback(opt);
                  toast({ title: "Obrigado pelo feedback!" });
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs transition-all ${
                  feedback === opt
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
>>>>>>> Stashed changes
              >
                {opt}
              </button>
            ))}
          </div>
<<<<<<< Updated upstream
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
=======
          <div className="flex gap-2">
            <button
              onClick={() => toast({ title: "Entendido!", description: "Vamos mostrar mais notícias assim." })}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30"
            >
              <ThumbsUp className="h-3 w-3" /> Mais assim
            </button>
            <button
              onClick={() => toast({ title: "Entendido!", description: "Vamos ajustar suas preferências." })}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30"
            >
              <ThumbsDown className="h-3 w-3" /> Menos assim
            </button>
          </div>
        </div>
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

<<<<<<< Updated upstream
export default Article;
=======
export default ArticlePage;
>>>>>>> Stashed changes
