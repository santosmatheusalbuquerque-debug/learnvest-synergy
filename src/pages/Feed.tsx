import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, TrendingUp, MapPin, Bookmark, Clock, Settings,
  Brain, ChevronRight, Flame, Cpu, Globe, Briefcase,
  Share2, X, Sparkles, BarChart3, Send, ArrowRight,
<<<<<<< Updated upstream
=======
  RefreshCw, Loader2, FlaskConical, Heart, Trophy,
>>>>>>> Stashed changes
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
<<<<<<< Updated upstream
import {
  featuredNews, topTodayNews, techNews, techSmallNews,
  aiNews, businessNews, businessSmallNews,
  geopoliticsNews, economyNews, localNews,
  trendingTopics, followedSources, categories,
  type NewsItem,
} from "@/data/mockNews";

/* ─── AI Summary Modal ───────────────────── */
const AISummaryModal = ({ news, onClose }: { news: NewsItem | null; onClose: () => void }) => {
  if (!news) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-primary/20 bg-card p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-primary" />
              <h3 className="font-heading font-semibold text-foreground">Resumo IA</h3>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">IA</span>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
          </div>
          <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium mb-3" style={{ backgroundColor: `${news.categoryColor}20`, color: news.categoryColor }}>{news.category}</span>
          <h4 className="font-heading font-bold text-foreground mb-3">{news.title}</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-sm text-foreground/90"><Sparkles size={14} className="text-primary shrink-0 mt-0.5" />Pontos-chave extraídos automaticamente do conteúdo completo</li>
            <li className="flex items-start gap-2 text-sm text-foreground/90"><Sparkles size={14} className="text-primary shrink-0 mt-0.5" />{news.summary || "Análise detalhada dos impactos e consequências do evento"}</li>
            <li className="flex items-start gap-2 text-sm text-foreground/90"><Sparkles size={14} className="text-primary shrink-0 mt-0.5" />Contextualização com eventos anteriores e tendências futuras</li>
          </ul>
          {news.aiInsight && <div className="rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary mb-4">💡 {news.aiInsight}</div>}
          <Link to={`/feed/article/${news.id}`}><Button variant="hero" className="w-full">Ler artigo completo <ArrowRight size={14} className="ml-1" /></Button></Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── News Card Components ───────────────── */
const LargeCard = ({ news, onSave, onSummary }: { news: NewsItem; onSave: (id: string) => void; onSummary: (n: NewsItem) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/20 transition-colors">
    <div className="h-40 w-full" style={{ background: `linear-gradient(135deg, ${news.categoryColor}15, ${news.categoryColor}05)` }}>
      <div className="h-full flex items-center justify-center text-muted-foreground/30">
        {news.category === "Tecnologia" ? <Cpu size={48} /> : news.category === "IA" ? <Brain size={48} /> : news.category === "Negócios" ? <Briefcase size={48} /> : news.category === "Geopolítica" ? <Globe size={48} /> : <TrendingUp size={48} />}
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 mb-2">
        {news.badge && <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wide">{news.badge}</span>}
        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${news.categoryColor}20`, color: news.categoryColor }}>{news.category}</span>
        {news.trending && <TrendingUp size={12} className="text-primary" />}
      </div>
      <Link to={`/feed/article/${news.id}`}><h3 className="font-heading text-lg font-bold text-foreground leading-snug hover:text-primary transition-colors">{news.title}</h3></Link>
      {news.summary && <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{news.summary}</p>}
      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
        {news.sourceLogo && <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold">{news.sourceLogo}</div>}
        <span>{news.source}</span><span>·</span><span>{news.timeAgo}</span><span>·</span><span>{news.readTime}</span>
      </div>
      {news.tags && <div className="flex flex-wrap gap-1.5 mt-3">{news.tags.slice(0, 4).map((t) => <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>)}</div>}
      {news.aiInsight && <div className="mt-3 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2 text-xs text-primary">💡 {news.aiInsight}</div>}
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
        <button onClick={() => onSummary(news)} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"><Brain size={13} /> Resumo IA</button>
        <button onClick={() => onSave(news.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Bookmark size={13} className={news.saved ? "fill-primary text-primary" : ""} /> Salvar</button>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Share2 size={13} /> Compartilhar</button>
        {news.reactions && (
          <div className="ml-auto flex gap-2 text-[10px] text-muted-foreground">
            <span>🤔 {(news.reactions.interessante / 1000).toFixed(1)}k</span>
            <span>⚡ {(news.reactions.importante / 1000).toFixed(1)}k</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const MediumCard = ({ news, onSave, onSummary }: { news: NewsItem; onSave: (id: string) => void; onSummary: (n: NewsItem) => void }) => (
  <div className="rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${news.categoryColor}20`, color: news.categoryColor }}>{news.category}</span>
      {news.localBadge && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary"><MapPin size={8} className="inline mr-0.5" />{news.localBadge}</span>}
    </div>
    <Link to={`/feed/article/${news.id}`}><h4 className="font-heading font-semibold text-foreground text-sm leading-snug hover:text-primary transition-colors">{news.title}</h4></Link>
    {news.summary && <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{news.summary}</p>}
    <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
      <span>{news.source}</span><span>·</span><span>{news.timeAgo}</span><span>·</span><span>{news.readTime}</span>
    </div>
    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
      <button onClick={() => onSummary(news)} className="text-[11px] text-primary hover:text-primary/80 flex items-center gap-1"><Brain size={11} />Resumo IA</button>
      <button onClick={() => onSave(news.id)} className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"><Bookmark size={11} />Salvar</button>
    </div>
  </div>
);

/* ─── Section Component ──────────────────── */
const NewsSection = ({
  title, icon: Icon, color, news, smallNews, onSave, onSummary,
}: {
  title: string; icon: React.ElementType; color: string;
  news: NewsItem[]; smallNews?: { title: string; source: string; timeAgo: string; readTime: string }[];
  onSave: (id: string) => void; onSummary: (n: NewsItem) => void;
}) => (
  <div className="mt-8">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon size={18} style={{ color }} />
        <h2 className="font-heading text-lg font-bold text-foreground">{title}</h2>
      </div>
      <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">Ver tudo <ChevronRight size={12} /></button>
    </div>
    {news[0] && <LargeCard news={news[0]} onSave={onSave} onSummary={onSummary} />}
    <div className="grid gap-3 mt-3 sm:grid-cols-2">
      {news.slice(1).map((n) => <MediumCard key={n.id} news={n} onSave={onSave} onSummary={onSummary} />)}
    </div>
    {smallNews && (
      <div className="mt-3 rounded-xl border border-border bg-card divide-y divide-border/50">
        {smallNews.map((n, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{n.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{n.source} · {n.timeAgo} · {n.readTime}</p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground shrink-0 ml-2" />
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ─── Main Feed Page ─────────────────────── */
const Feed = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("foryou");
  const [activeCategory, setActiveCategory] = useState("all");
  const [savedCount, setSavedCount] = useState(8);
  const [summaryNews, setSummaryNews] = useState<NewsItem | null>(null);
=======
import { useNewsFeed, groupByCategory } from "@/hooks/useNewsFeed";
import { Article } from "@/types/article";
import { chatWithArticle } from "@/services/groqService";

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-2xl border border-border bg-card p-5 animate-pulse">
    <div className="h-4 w-24 rounded bg-muted mb-3" />
    <div className="h-48 w-full rounded-xl bg-muted mb-3" />
    <div className="h-5 w-full rounded bg-muted mb-2" />
    <div className="h-5 w-3/4 rounded bg-muted mb-3" />
    <div className="h-3 w-1/2 rounded bg-muted" />
  </div>
);

// ─── Article Chat Modal ───────────────────────────────────────────────────────
const ArticleChatModal = ({
  article,
  onClose,
}: {
  article: Article | null;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  if (!article) return null;

  const suggested = [
    "O que causou isso?",
    "Como isso me afeta?",
    "Quais as consequências?",
    "Qual o contexto histórico?",
  ];

  const handleSend = async (q?: string) => {
    const question = q ?? input;
    if (!question.trim()) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setTyping(true);
    try {
      const answer = await chatWithArticle(article.title, article.description, question);
      setMessages((prev) => [...prev, { role: "ai", text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Não consegui responder agora. Tente novamente." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-end bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        className="h-full w-full max-w-md bg-card border-l border-border flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Chat com a Notícia</span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3 border-b border-border bg-muted/30">
          <p className="text-xs text-muted-foreground line-clamp-2">{article.title}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-xs text-muted-foreground text-center pt-8">
              Faça uma pergunta sobre esta notícia
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 text-sm ${msg.role === "ai" ? "" : "justify-end"}`}
            >
              {msg.role === "ai" && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Brain className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              <p
                className={`rounded-xl px-3 py-2 max-w-[85%] leading-relaxed ${
                  msg.role === "ai"
                    ? "bg-muted text-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2 items-center text-sm text-muted-foreground">
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
        </div>

        {/* Suggestions */}
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {suggested.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2 p-4 border-t border-border">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Pergunte algo sobre esta notícia..."
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={() => handleSend()} size="sm" disabled={typing}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── AI Summary Modal ─────────────────────────────────────────────────────────
const AISummaryModal = ({
  article,
  onClose,
}: {
  article: Article | null;
  onClose: () => void;
}) => {
  if (!article) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-primary/20 bg-card p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Resumo IA</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-3">
          <span
            className="inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: article.categoryColor }}
          >
            {article.categoryLabel}
          </span>
          <h4 className="mt-2 font-medium text-foreground">{article.title}</h4>
        </div>
        {article.summaryLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Gerando resumo com IA...
          </div>
        ) : (
          <ul className="mb-4 space-y-2">
            {article.aiSummary.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {article.personalInsight && (
          <p className="mb-4 rounded-lg bg-primary/5 p-3 text-sm text-primary border-l-2 border-primary">
            💡 {article.personalInsight}
          </p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Ler artigo completo <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

// ─── News Card ────────────────────────────────────────────────────────────────
const NewsCard = ({
  article,
  size = "large",
  onSave,
  onSummary,
  onChat,
}: {
  article: Article;
  size?: "large" | "medium";
  onSave: (id: string) => void;
  onSummary: (a: Article) => void;
  onChat: (a: Article) => void;
}) => {
  const timeAgo = (() => {
    const diff = Date.now() - new Date(article.publishedAt).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor(diff / 60000);
    if (h > 48) return `${Math.floor(h / 24)} dias atrás`;
    if (h >= 1) return `há ${h}h`;
    return `há ${m}min`;
  })();

  if (size === "medium") {
    return (
      <div className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
            style={{ backgroundColor: article.categoryColor }}
          >
            {article.categoryLabel}
          </span>
        </div>
        <h4 className="mb-1.5 text-sm font-medium text-foreground line-clamp-2">
          {article.title}
        </h4>
        {article.description && (
          <p className="mb-2 text-xs text-muted-foreground line-clamp-2">{article.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            {article.source} · {timeAgo} · {article.readTime} min
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSummary(article)}
              className="text-[11px] text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <Brain className="h-2.5 w-2.5" /> Resumo IA
            </button>
            <button
              onClick={() => onChat(article)}
              className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Send className="h-2.5 w-2.5" /> Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors">
      {/* Image */}
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-44 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div
          className="w-full h-44 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${article.categoryColor}33, ${article.categoryColor}11)`,
          }}
        >
          <span className="text-4xl opacity-30">📰</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: article.categoryColor }}
          >
            {article.categoryLabel}
          </span>
        </div>

        <h3 className="mb-2 text-base font-semibold text-foreground leading-snug line-clamp-2">
          {article.title}
        </h3>

        {article.description && (
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {article.description}
          </p>
        )}

        {/* AI Summary bullets */}
        {article.summaryLoading ? (
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            Gerando resumo com IA...
          </div>
        ) : article.aiSummary.length > 0 ? (
          <ul className="mb-3 space-y-1">
            {article.aiSummary.slice(0, 2).map((b, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Personal insight */}
        {article.personalInsight && (
          <p className="mb-3 rounded-lg bg-primary/5 px-3 py-2 text-xs text-primary border-l-2 border-primary">
            💡 {article.personalInsight}
          </p>
        )}

        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{article.source}</span>
          <span>·</span>
          <span>{timeAgo}</span>
          <span>·</span>
          <span>{article.readTime} min</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSummary(article)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
          >
            <Brain className="h-3 w-3" /> Resumo IA
          </button>
          <button
            onClick={() => onChat(article)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Send className="h-3 w-3" /> Perguntar à IA
          </button>
          <button
            onClick={() => onSave(article.id)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Bookmark className="h-3 w-3" /> Salvar
          </button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Ler <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Category Section ─────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  tecnologia: Cpu,
  negocios: Briefcase,
  geopolitica: Globe,
  economia: BarChart3,
  ia: Brain,
  startups: TrendingUp,
  ciencia: FlaskConical,
  saude: Heart,
  esportes: Trophy,
};

const CategorySection = ({
  category,
  articles,
  onSave,
  onSummary,
  onChat,
}: {
  category: string;
  articles: Article[];
  onSave: (id: string) => void;
  onSummary: (a: Article) => void;
  onChat: (a: Article) => void;
}) => {
  if (articles.length === 0) return null;
  const Icon = CATEGORY_ICONS[category] ?? Cpu;
  const color = articles[0].categoryColor;
  const label = articles[0].categoryLabel;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" style={{ color }} />
          <h2 className="font-semibold text-foreground">{label}</h2>
          <span className="text-xs text-muted-foreground">({articles.length})</span>
        </div>
      </div>
      {articles[0] && (
        <NewsCard
          article={articles[0]}
          size="large"
          onSave={onSave}
          onSummary={onSummary}
          onChat={onChat}
        />
      )}
      {articles.length > 1 && (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {articles.slice(1, 3).map((a) => (
            <NewsCard
              key={a.id}
              article={a}
              size="medium"
              onSave={onSave}
              onSummary={onSummary}
              onChat={onChat}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// ─── Main Feed Page ───────────────────────────────────────────────────────────
const Feed = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { articles, loading, enriching, error, lastUpdated, refreshFeed } = useNewsFeed();

  const [activeTab, setActiveTab] = useState("foryou");
  const [activeCategory, setActiveCategory] = useState("all");
  const [savedCount, setSavedCount] = useState(8);
  const [summaryArticle, setSummaryArticle] = useState<Article | null>(null);
  const [chatArticle, setChatArticle] = useState<Article | null>(null);

  const grouped = groupByCategory(articles);

  const CATEGORY_ORDER = [
    "tecnologia", "ia", "negocios", "geopolitica",
    "economia", "startups", "ciencia", "saude", "esportes",
  ];

  const filteredCategories =
    activeCategory === "all"
      ? CATEGORY_ORDER
      : [activeCategory];

  const sidebarCategories = [
    { id: "all", label: "Todas" },
    { id: "tecnologia", label: "Tecnologia", color: "#3b82f6" },
    { id: "ia", label: "IA", color: "#F97316" },
    { id: "negocios", label: "Negócios", color: "#8b5cf6" },
    { id: "geopolitica", label: "Geopolítica", color: "#ef4444" },
    { id: "economia", label: "Economia", color: "#22c55e" },
    { id: "startups", label: "Startups", color: "#F97316" },
    { id: "ciencia", label: "Ciência", color: "#06b6d4" },
    { id: "saude", label: "Saúde", color: "#ec4899" },
    { id: "esportes", label: "Esportes", color: "#84cc16" },
  ];
>>>>>>> Stashed changes

  const tabs = [
    { id: "foryou", label: "Para Você" },
    { id: "trending", label: "Em Alta" },
    { id: "local", label: "Perto de Mim" },
    { id: "following", label: "Seguindo" },
  ];

  const sidebarNav = [
<<<<<<< Updated upstream
    { icon: Home, label: "Para Você", active: true },
=======
    { icon: Home, label: "Para Você" },
>>>>>>> Stashed changes
    { icon: TrendingUp, label: "Em Alta" },
    { icon: MapPin, label: "Perto de Mim" },
    { icon: Bookmark, label: "Salvos", count: savedCount },
    { icon: Clock, label: "Histórico" },
    { icon: Settings, label: "Preferências", route: "/settings" },
  ];

  const handleSave = (id: string) => {
    setSavedCount((c) => c + 1);
<<<<<<< Updated upstream
    toast({ title: "Notícia salva!", description: `Adicionada à sua lista de salvos (${savedCount + 1}).` });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-primary" />
            <span className="font-heading text-lg font-bold text-foreground">notice<span className="text-gradient">.me</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/settings"><Button variant="ghost" size="sm"><Settings size={16} /></Button></Link>
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">M</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex gap-6 px-4 py-6">
        {/* ─ Left sidebar ─ */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-20 space-y-6">
            {/* User profile */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">M</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Matheus</p>
                  <span className="inline-block rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">Pro</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-muted p-2 text-center"><p className="text-lg font-bold text-foreground">12</p><p className="text-[10px] text-muted-foreground">Lidas hoje</p></div>
                <div className="rounded-lg bg-muted p-2 text-center"><p className="text-lg font-bold text-foreground">7 🔥</p><p className="text-[10px] text-muted-foreground">Streak</p></div>
              </div>
            </div>

            {/* Nav */}
            <nav className="space-y-1">
              {sidebarNav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.route ? navigate(item.route) : setActiveTab(item.label === "Para Você" ? "foryou" : item.label === "Em Alta" ? "trending" : item.label === "Perto de Mim" ? "local" : "foryou")}
                  className={cn("w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors", item.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted")}
                >
                  <item.icon size={16} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">{item.count}</span>}
                </button>
              ))}
            </nav>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">Categorias</h4>
              <div className="space-y-0.5">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={cn("w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors", activeCategory === c.id ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground")}
                  >
                    {c.color && <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />}
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ─ Main content ─ */}
        <main className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 rounded-xl bg-muted p-1">
=======
    toast({ title: "Notícia salva!", description: `Adicionada à sua lista de salvos.` });
  };

  const trendingArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <span className="font-bold text-foreground">notice.me</span>
          <div className="flex items-center gap-3">
            {enriching && (
              <div className="flex items-center gap-1.5 text-xs text-primary">
                <Loader2 className="h-3 w-3 animate-spin" />
                Resumindo com IA...
              </div>
            )}
            {lastUpdated && (
              <span className="hidden sm:block text-xs text-muted-foreground">
                Atualizado às{" "}
                {lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button
              onClick={refreshFeed}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              M
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        {/* Left sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                M
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Matheus</p>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                  Pro
                </span>
              </div>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">{articles.length}</p>
                <p className="text-[10px] text-muted-foreground">Notícias</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">7 🔥</p>
                <p className="text-[10px] text-muted-foreground">Streak</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1 mb-6">
            {sidebarNav.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  item.route
                    ? navigate(item.route)
                    : setActiveTab(
                        item.label === "Para Você" ? "foryou" :
                        item.label === "Em Alta" ? "trending" :
                        item.label === "Perto de Mim" ? "local" : "foryou"
                      )
                }
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.count !== undefined && (
                  <span className="ml-auto rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="rounded-xl border border-border bg-card p-3">
            <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Categorias
            </h4>
            {sidebarCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  activeCategory === c.id
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c.color && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                )}
                {c.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Tabs */}
          <div className="mb-6 flex gap-1 rounded-xl bg-muted p-1">
>>>>>>> Stashed changes
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
<<<<<<< Updated upstream
                className={cn("flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all", activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
=======
                className={cn(
                  "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
>>>>>>> Stashed changes
              >
                {tab.label}
              </button>
            ))}
          </div>

<<<<<<< Updated upstream
          {/* Mobile categories */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4 lg:hidden scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={cn("shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all", activeCategory === c.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground")}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Featured card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wide">{featuredNews.badge}</span>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${featuredNews.categoryColor}20`, color: featuredNews.categoryColor }}>{featuredNews.category}</span>
            </div>
            <Link to={`/feed/article/${featuredNews.id}`}><h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground leading-snug hover:text-primary transition-colors">{featuredNews.title}</h2></Link>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{featuredNews.summary}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
              <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold">{featuredNews.sourceLogo}</div>
              <span>{featuredNews.source}</span><span>·</span><span>{featuredNews.timeAgo}</span><span>·</span><span>{featuredNews.readTime}</span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px]">{featuredNews.bias}</span>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-primary/10">
              <button onClick={() => setSummaryNews(featuredNews)} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"><Brain size={13} /> Resumo IA</button>
              <button onClick={() => handleSave(featuredNews.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Bookmark size={13} /> Salvar</button>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Share2 size={13} /> Compartilhar</button>
            </div>
          </motion.div>

          {/* Top do Dia - Horizontal scroll */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Flame size={16} className="text-primary" />
              <h3 className="font-heading font-bold text-foreground">Top do Dia</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {topTodayNews.map((n) => (
                <Link key={n.id} to={`/feed/article/${n.id}`} className="shrink-0 w-56 rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp size={10} className="text-primary" />
                    <span className="text-[10px] font-bold text-muted-foreground">#{n.trendingRank}</span>
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-medium" style={{ backgroundColor: `${n.categoryColor}20`, color: n.categoryColor }}>{n.category}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground line-clamp-3">{n.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-2">{n.source} · {n.timeAgo}</p>
                </Link>
=======
          {/* Error banner */}
          {error && (
            <div className="mb-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-600">
              {error}
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground mb-4">Não foi possível carregar as notícias.</p>
              <Button onClick={refreshFeed} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" /> Tentar novamente
              </Button>
            </div>
          ) : (
            filteredCategories.map((cat) =>
              grouped[cat] ? (
                <CategorySection
                  key={cat}
                  category={cat}
                  articles={grouped[cat]}
                  onSave={handleSave}
                  onSummary={setSummaryArticle}
                  onChat={setChatArticle}
                />
              ) : null
            )
          )}
        </main>

        {/* Right sidebar */}
        <aside className="hidden w-72 shrink-0 xl:block">
          {/* AI Brief */}
          <div className="mb-4 rounded-xl border border-primary/20 bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Top do Momento</h3>
            </div>
            <div className="space-y-2">
              {trendingArticles.map((a, i) => (
                <div key={a.id} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-0.5 text-primary font-bold">{i + 1}.</span>
                  <p className="line-clamp-2">{a.title}</p>
                </div>
>>>>>>> Stashed changes
              ))}
            </div>
          </div>

<<<<<<< Updated upstream
          {/* Sections */}
          <NewsSection title="Tecnologia" icon={Cpu} color="#3b82f6" news={techNews} smallNews={techSmallNews} onSave={handleSave} onSummary={setSummaryNews} />
          <NewsSection title="Inteligência Artificial" icon={Brain} color="#F97316" news={aiNews} onSave={handleSave} onSummary={setSummaryNews} />
          <NewsSection title="Negócios & Startups" icon={Briefcase} color="#8b5cf6" news={businessNews} smallNews={businessSmallNews} onSave={handleSave} onSummary={setSummaryNews} />
          <NewsSection title="Geopolítica" icon={Globe} color="#ef4444" news={geopoliticsNews} onSave={handleSave} onSummary={setSummaryNews} />
          <NewsSection title="Economia" icon={TrendingUp} color="#22c55e" news={economyNews} onSave={handleSave} onSummary={setSummaryNews} />

          {/* Local */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-primary" />
              <h2 className="font-heading text-lg font-bold text-foreground">Perto de Você — São Paulo</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {localNews.map((n) => <MediumCard key={n.id} news={n} onSave={handleSave} onSummary={setSummaryNews} />)}
            </div>
          </div>
        </main>

        {/* ─ Right sidebar ─ */}
        <aside className="hidden xl:block w-72 shrink-0">
          <div className="sticky top-20 space-y-5">
            {/* AI Daily Brief */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain size={16} className="text-primary" />
                <h4 className="font-heading font-semibold text-sm text-foreground">Seu Briefing de Hoje</h4>
              </div>
              <p className="text-[10px] text-muted-foreground mb-2">Gerado pela IA às 07:00</p>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Bom dia, Matheus! Hoje são 5 notícias que você precisa saber: (1) Acordo EUA-China pode baratear eletrônicos no Brasil.
                (2) GPT-5 chega em abril. (3) Nubank bate 100M de clientes. (4) PIB Brasil surpreende. (5) Tensão em Taiwan.
              </p>
              <button className="mt-3 text-xs text-primary hover:text-primary/80 font-medium">Ver análise completa →</button>
            </div>

            {/* Trending */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Trending Agora</h4>
              <div className="space-y-2.5">
                {trendingTopics.map((t) => (
                  <div key={t.rank} className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-muted-foreground w-4">{t.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{t.topic}</p>
                      <p className="text-[10px] text-muted-foreground">{t.count}</p>
                    </div>
                    <TrendingUp size={12} className="text-primary shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Fontes que Você Segue</h4>
              <div className="space-y-2.5">
                {followedSources.map((s) => (
                  <div key={s.name} className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold text-foreground">{s.logo}</div>
                    <span className="text-sm text-foreground flex-1">{s.name}</span>
                    <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{s.newCount}</span>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-xs text-primary hover:text-primary/80 font-medium">Gerenciar fontes →</button>
            </div>

            {/* Reading Stats */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Sua Semana de Leitura</h4>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: "Lidas", value: "47", change: "+12%" },
                  { label: "Minutos", value: "138", change: "+8%" },
                  { label: "Categorias", value: "6", change: "=" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-lg font-bold text-foreground">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                    <span className="text-[10px] text-green-500">{s.change}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-1 h-12">
                {[30, 45, 25, 60, 55, 40, 47].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/30 transition-all hover:bg-primary" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-4">
              <h4 className="font-heading font-semibold text-sm text-foreground mb-1">Newsletter Matinal</h4>
              <p className="text-xs text-muted-foreground mb-3">Receba às 7h um resumo dos 5 fatos mais importantes do dia, personalizado para você.</p>
              <Button variant="hero" size="sm" className="w-full" onClick={() => toast({ title: "Newsletter ativada!", description: "Você receberá seu primeiro email amanhã às 7h." })}>
                Ativar Newsletter
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-2">Requer plano Pro</p>
            </div>
=======
          {/* Stats */}
          <div className="mb-4 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Feed em Números</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(grouped).map(([cat, arts]) => (
                <div key={cat} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground capitalize">{arts[0]?.categoryLabel}</span>
                  <span className="text-foreground font-medium">{arts.length} notícias</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Send className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Newsletter Matinal</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Receba as 5 principais notícias toda manhã.
            </p>
            <Button size="sm" className="w-full text-xs">
              Assinar — Pro
            </Button>
>>>>>>> Stashed changes
          </div>
        </aside>
      </div>

<<<<<<< Updated upstream
      {/* AI Summary Modal */}
      <AISummaryModal news={summaryNews} onClose={() => setSummaryNews(null)} />
=======
      {/* Modals */}
      <AnimatePresence>
        {summaryArticle && (
          <AISummaryModal
            article={summaryArticle}
            onClose={() => setSummaryArticle(null)}
          />
        )}
        {chatArticle && (
          <ArticleChatModal
            article={chatArticle}
            onClose={() => setChatArticle(null)}
          />
        )}
      </AnimatePresence>
>>>>>>> Stashed changes
    </div>
  );
};

export default Feed;
