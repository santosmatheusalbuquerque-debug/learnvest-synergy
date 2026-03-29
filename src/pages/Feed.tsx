import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Flame, Heart, Bookmark, BookmarkCheck, Send,
  Loader2, RefreshCw, Sparkles, ChevronDown, ChevronUp,
  ExternalLink, BarChart3, Cpu, Globe, Briefcase,
  FlaskConical, Trophy, MessageCircle, EyeOff, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNewsFeed } from "@/hooks/useNewsFeed";
import { Article } from "@/types/article";
import { chatWithArticle } from "@/services/groqService";
import {
  loadPreferences, savePreferences, updateScoreOnLike,
  updateScoreOnHide, updateScoreOnRead, getSortedCategories,
  UserPreferences,
} from "@/hooks/usePreferences";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  tecnologia: Cpu, negocios: Briefcase, geopolitica: Globe,
  economia: BarChart3, ia: Brain, startups: TrendingUp,
  ciencia: FlaskConical, saude: Heart, esportes: Trophy,
};

const CATEGORY_COLORS: Record<string, string> = {
  tecnologia: "#3b82f6", ia: "#F97316", negocios: "#8b5cf6",
  geopolitica: "#ef4444", economia: "#22c55e", startups: "#F97316",
  ciencia: "#06b6d4", saude: "#ec4899", esportes: "#84cc16",
};

const CATEGORY_LABELS: Record<string, string> = {
  tecnologia: "Tecnologia", ia: "IA", negocios: "Negócios",
  geopolitica: "Geopolítica", economia: "Economia", startups: "Startups",
  ciencia: "Ciência", saude: "Saúde", esportes: "Esportes",
};

const ALL_CATEGORIES = [
  "tecnologia","ia","negocios","geopolitica",
  "economia","startups","ciencia","saude","esportes",
];

// ─── Chat Drawer ──────────────────────────────────────────────────────────────
const ChatDrawer = ({ article, onClose }: { article: Article; onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = ["O que causou isso?", "Como isso me afeta?", "Quais as consequências?", "Contexto histórico?"];

  const send = async (q?: string) => {
    const question = q ?? input;
    if (!question.trim() || typing) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", text: question }]);
    setTyping(true);
    try {
      const ans = await chatWithArticle(article.title, article.description, question);
      setMessages((p) => [...p, { role: "ai", text: ans }]);
    } catch {
      setMessages((p) => [...p, { role: "ai", text: "Não consegui responder agora. Tente novamente." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-card border-t border-border rounded-t-2xl shadow-2xl"
      style={{ maxHeight: "75vh" }}
    >
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Pergunte à IA</span>
        </div>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-muted text-muted-foreground">✕</button>
      </div>
      <p className="px-4 py-2 text-xs text-muted-foreground line-clamp-1 border-b border-border bg-muted/30">{article.title}</p>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.length === 0 && (
          <p className="text-center text-xs text-muted-foreground pt-4">Escolha uma sugestão ou faça sua pergunta</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "ai" ? "" : "justify-end"}`}>
            {msg.role === "ai" && (
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <Brain className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
            <p className={`rounded-2xl px-3 py-2 text-sm max-w-[85%] leading-relaxed ${msg.role === "ai" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>
              {msg.text}
            </p>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Brain className="h-3 w-3 text-primary-foreground" />
            </div>
            <div className="flex gap-1 px-3 py-2 bg-muted rounded-2xl">
              {[0, 150, 300].map((d) => (
                <span key={d} className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
        {suggestions.map((s) => (
          <button key={s} onClick={() => send(s)}
            className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-2 p-4 border-t border-border">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Faça uma pergunta..."
          className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        <Button onClick={() => send()} size="sm" className="rounded-full w-9 h-9 p-0" disabled={typing}>
          {typing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  );
};

// ─── News Card ────────────────────────────────────────────────────────────────
const NewsCard = ({
  article, prefs, onLike, onSave, onHide, onRead, onChat,
}: {
  article: Article; prefs: UserPreferences;
  onLike: (a: Article) => void; onSave: (a: Article) => void;
  onHide: (a: Article) => void; onRead: (a: Article) => void;
  onChat: (a: Article) => void;
}) => {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const isLiked = prefs.likedArticles.includes(article.id);
  const isSaved = prefs.savedArticles.includes(article.id);

  const timeAgo = (() => {
    const diff = Date.now() - new Date(article.publishedAt).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor(diff / 60000);
    if (h > 48) return `${Math.floor(h / 24)}d`;
    if (h >= 1) return `${h}h`;
    return `${m}min`;
  })();

  const Icon = CATEGORY_ICONS[article.category] ?? Cpu;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card overflow-hidden">
      {article.image ? (
        <img src={article.image} alt={article.title} loading="lazy"
          className="w-full h-48 object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      ) : (
        <div className="w-full h-32 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${article.categoryColor}22, ${article.categoryColor}08)` }}>
          <Icon className="h-10 w-10 opacity-20" style={{ color: article.categoryColor }} />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
            style={{ backgroundColor: article.categoryColor }}>
            {article.categoryLabel}
          </span>
          <span className="text-xs text-muted-foreground">{article.source}</span>
          <span className="text-xs text-muted-foreground ml-auto">{timeAgo} · {article.readTime}min</span>
        </div>

        <h3 className="font-semibold text-foreground leading-snug mb-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => { onRead(article); window.open(article.url, "_blank"); }}>
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.description}</p>
        )}

        {(article.summaryLoading || article.aiSummary.length > 0) && (
          <div className="mb-3">
            <button onClick={() => setSummaryOpen((o) => !o)}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors">
              <Brain className="h-3 w-3" />
              {summaryOpen ? "Fechar resumo" : "Ver resumo IA"}
              {summaryOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            <AnimatePresence>
              {summaryOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="mt-2 rounded-xl bg-primary/5 border-l-2 border-primary p-3 space-y-1.5">
                    {article.summaryLoading ? (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin text-primary" /> Resumindo com IA...
                      </div>
                    ) : (
                      article.aiSummary.map((b, i) => (
                        <p key={i} className="flex gap-2 text-xs text-muted-foreground">
                          <span className="text-primary font-bold shrink-0">•</span>{b}
                        </p>
                      ))
                    )}
                    {article.personalInsight && !article.summaryLoading && (
                      <p className="pt-1 text-xs text-primary font-medium">💡 {article.personalInsight}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="flex items-center gap-1 pt-2 border-t border-border/60">
          <button onClick={() => onLike(article)}
            className={cn("flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all",
              isLiked ? "bg-red-500/10 text-red-500" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
            <Heart className={cn("h-4 w-4", isLiked && "fill-red-500")} />
            {isLiked ? "Curtido" : "Curtir"}
          </button>

          <button onClick={() => onSave(article)}
            className={cn("flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all",
              isSaved ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {isSaved ? "Salvo" : "Salvar"}
          </button>

          <button onClick={() => onChat(article)}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <MessageCircle className="h-4 w-4" /> IA
          </button>

          <a href={article.url} target="_blank" rel="noopener noreferrer" onClick={() => onRead(article)}
            className="ml-auto flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button onClick={() => onHide(article)} title="Não tenho interesse"
            className="flex items-center rounded-xl px-2 py-2 text-xs text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-all">
            <EyeOff className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Skeleton = () => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
    <div className="h-48 bg-muted" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-24 bg-muted rounded-full" />
      <div className="h-5 w-full bg-muted rounded" />
      <div className="h-5 w-3/4 bg-muted rounded" />
      <div className="h-3 w-1/2 bg-muted rounded-full" />
    </div>
  </div>
);

// ─── Main Feed ────────────────────────────────────────────────────────────────
const Feed = () => {
  const { toast } = useToast();
  const { articles, loading, enriching, error, lastUpdated, refreshFeed } = useNewsFeed();
  const [prefs, setPrefs] = useState<UserPreferences>(loadPreferences);
  const [activeTab, setActiveTab] = useState<"foryou" | "hot" | "saved">("foryou");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [chatArticle, setChatArticle] = useState<Article | null>(null);

  useEffect(() => { savePreferences(prefs); }, [prefs]);

  const handleLike = useCallback((article: Article) => {
    setPrefs((p) => {
      const isLiked = p.likedArticles.includes(article.id);
      if (isLiked) return { ...p, likedArticles: p.likedArticles.filter((id) => id !== article.id) };
      return updateScoreOnLike({ ...p, likedArticles: [...p.likedArticles, article.id] }, article.category);
    });
  }, []);

  const handleSave = useCallback((article: Article) => {
    setPrefs((p) => {
      const isSaved = p.savedArticles.includes(article.id);
      if (isSaved) { toast({ title: "Removido dos salvos" }); return { ...p, savedArticles: p.savedArticles.filter((id) => id !== article.id) }; }
      toast({ title: "Notícia salva!" });
      return { ...p, savedArticles: [...p.savedArticles, article.id] };
    });
  }, [toast]);

  const handleHide = useCallback((article: Article) => {
    setPrefs((p) => updateScoreOnHide({ ...p, hiddenArticles: [...p.hiddenArticles, article.id] }, article.category));
    toast({ title: "Preferência atualizada", description: "Veremos menos notícias deste tipo." });
  }, [toast]);

  const handleRead = useCallback((article: Article) => {
    setPrefs((p) => updateScoreOnRead({ ...p, readArticles: [...p.readArticles, article.id] }, article.category));
  }, []);

  const visibleArticles = articles
    .filter((a) => !prefs.hiddenArticles.includes(a.id))
    .filter((a) => activeCategory === "all" || a.category === activeCategory);

  const feedArticles = (() => {
    if (activeTab === "saved") return visibleArticles.filter((a) => prefs.savedArticles.includes(a.id));
    if (activeTab === "hot") return [...visibleArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return [...visibleArticles].sort((a, b) => (prefs.categoryScores[b.category] ?? 50) - (prefs.categoryScores[a.category] ?? 50));
  })();

  const sortedCats = getSortedCategories(prefs, ALL_CATEGORIES).filter((c) =>
    articles.some((a) => a.category === c && !prefs.hiddenArticles.includes(a.id))
  );

  const tabs = [
    { id: "foryou" as const, label: "Para Você", icon: Sparkles },
    { id: "hot"    as const, label: "Em Alta",   icon: Flame },
    { id: "saved"  as const, label: "Salvos",     icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-lg font-bold text-foreground">notice<span className="text-primary">.</span>me</span>
          <div className="flex items-center gap-3">
            {enriching && (
              <div className="flex items-center gap-1.5 text-xs text-primary">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="hidden sm:inline">Atualizando com IA...</span>
              </div>
            )}
            {lastUpdated && (
              <span className="hidden sm:block text-xs text-muted-foreground">
                {lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button onClick={refreshFeed} className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl gap-6 px-4 py-6">
        {/* Sidebar esquerda */}
        <aside className="hidden md:flex w-52 shrink-0 flex-col gap-1 pt-1">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Categorias</p>
          <button onClick={() => setActiveCategory("all")}
            className={cn("flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              activeCategory === "all" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
            <Sparkles className="h-4 w-4" /> Todas
          </button>
          {sortedCats.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] ?? Cpu;
            const score = prefs.categoryScores[cat] ?? 50;
            const count = articles.filter((a) => a.category === cat).length;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn("flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  activeCategory === cat ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                <Icon className="h-4 w-4 shrink-0" style={{ color: CATEGORY_COLORS[cat] }} />
                <span className="flex-1">{CATEGORY_LABELS[cat]}</span>
                <span className="text-[10px] text-muted-foreground/60">{count}</span>
                <div className="w-1 h-4 rounded-full bg-muted overflow-hidden">
                  <div className="w-full rounded-full transition-all" style={{ height: `${score}%`, backgroundColor: CATEGORY_COLORS[cat] }} />
                </div>
              </button>
            );
          })}
          {prefs.totalInteractions > 0 && (
            <div className="mt-4 rounded-xl bg-primary/5 border border-primary/10 p-3">
              <p className="text-xs text-primary font-medium mb-1">Feed personalizado</p>
              <p className="text-[11px] text-muted-foreground">{prefs.totalInteractions} interações. O feed aprende com você.</p>
            </div>
          )}
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={cn("flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                    activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {tab.id === "saved" && prefs.savedArticles.length > 0 && (
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{prefs.savedArticles.length}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Filtro mobile */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 md:hidden">
            <button onClick={() => setActiveCategory("all")}
              className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors",
                activeCategory === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground")}>
              Todas
            </button>
            {sortedCats.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors",
                  activeCategory === cat ? "text-white border-transparent" : "border-border text-muted-foreground")}
                style={activeCategory === cat ? { backgroundColor: CATEGORY_COLORS[cat] } : {}}>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-600">{error}</div>
          )}

          <div className="space-y-4 pb-24">
            {loading ? (
              [1,2,3,4].map((i) => <Skeleton key={i} />)
            ) : feedArticles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                {activeTab === "saved" ? (
                  <><Bookmark className="h-10 w-10 text-muted-foreground/30" /><p className="text-muted-foreground">Nenhuma notícia salva ainda.</p></>
                ) : (
                  <><RefreshCw className="h-8 w-8 text-muted-foreground/30" /><p className="text-muted-foreground">Nenhuma notícia encontrada.</p><Button onClick={refreshFeed} variant="outline" size="sm">Atualizar feed</Button></>
                )}
              </div>
            ) : (
              feedArticles.map((article) => (
                <NewsCard key={article.id} article={article} prefs={prefs}
                  onLike={handleLike} onSave={handleSave} onHide={handleHide}
                  onRead={handleRead} onChat={setChatArticle} />
              ))
            )}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {chatArticle && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setChatArticle(null)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <ChatDrawer article={chatArticle} onClose={() => setChatArticle(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
