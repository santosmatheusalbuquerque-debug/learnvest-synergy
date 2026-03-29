import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sliders, Rss, BookOpen, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { onboardingTopics } from "@/data/mockNews";
import { useToast } from "@/hooks/use-toast";

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
      checked ? "bg-primary" : "bg-muted"
    )}
  >
    <span className={cn("inline-block h-4 w-4 rounded-full bg-white transition-transform", checked ? "translate-x-6" : "translate-x-1")} />
  </button>
);

const Settings = () => {
  const { toast } = useToast();
  const [interests, setInterests] = useState<Record<string, number>>({
    tech: 80, business: 60, ai: 90, economy: 40, geopolitics: 70, science: 50,
  });
  const [prefs, setPrefs] = useState({
    depth: "balanced",
    showBias: true,
    antiBubble: true,
    newsletter: false,
    breakingNews: true,
    dailySummary: true,
    favCategories: false,
  });

  const togglePref = (key: string) => {
    setPrefs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
    toast({ title: "Preferência atualizada", description: "Suas configurações foram salvas." });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link to="/feed" className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></Link>
          <h1 className="font-heading text-lg font-bold text-foreground">Preferências</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-8 space-y-8">
        {/* Interests */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Sliders size={18} className="text-primary" />
            <h2 className="font-heading text-xl font-semibold text-foreground">Meus Interesses</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Ajuste os tópicos que você quer ver no feed</p>
          <div className="space-y-3">
            {onboardingTopics.slice(0, 6).map((t) => (
              <div key={t.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold" style={{ backgroundColor: `${t.color}20`, color: t.color }}>
                  {t.label.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground flex-1">{t.label}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={interests[t.id] || 50}
                  onChange={(e) => setInterests((p) => ({ ...p, [t.id]: Number(e.target.value) }))}
                  className="w-24 accent-primary"
                />
                <span className="text-xs text-muted-foreground w-8 text-right">{interests[t.id] || 50}%</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Sources */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-2 mb-1">
            <Rss size={18} className="text-primary" />
            <h2 className="font-heading text-xl font-semibold text-foreground">Fontes</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Gerencie as fontes de notícias que você segue ou bloqueia</p>
          <div className="grid grid-cols-2 gap-3">
            {["TechCrunch", "InfoMoney", "The Economist", "Bloomberg", "Folha de S.Paulo", "Exame"].map((s) => (
              <div key={s} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">{s[0]}</div>
                <span className="text-sm text-foreground flex-1">{s}</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Reading Prefs */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={18} className="text-primary" />
            <h2 className="font-heading text-xl font-semibold text-foreground">Preferências de Leitura</h2>
          </div>
          <div className="space-y-4 mt-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-medium text-foreground mb-3">Profundidade preferida</p>
              <div className="flex gap-2">
                {[
                  { id: "quick", label: "Resumos rápidos" },
                  { id: "balanced", label: "Equilibrado" },
                  { id: "deep", label: "Análises profundas" },
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setPrefs((p) => ({ ...p, depth: o.id }))}
                    className={cn(
                      "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                      prefs.depth === o.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            {[
              { key: "showBias", label: "Mostrar análise de viés" },
              { key: "antiBubble", label: "Feed anti-bolha (perspectivas opostas)" },
              { key: "newsletter", label: "Newsletter matinal" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                <span className="text-sm text-foreground">{item.label}</span>
                <Toggle checked={prefs[item.key as keyof typeof prefs] as boolean} onChange={() => togglePref(item.key)} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Notifications */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-1">
            <Bell size={18} className="text-primary" />
            <h2 className="font-heading text-xl font-semibold text-foreground">Notificações</h2>
          </div>
          <div className="space-y-3 mt-4">
            {[
              { key: "breakingNews", label: "Breaking news urgente" },
              { key: "dailySummary", label: "Resumo diário às 7h" },
              { key: "favCategories", label: "Notícias das categorias favoritas" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                <span className="text-sm text-foreground">{item.label}</span>
                <Toggle checked={prefs[item.key as keyof typeof prefs] as boolean} onChange={() => togglePref(item.key)} />
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Settings;
