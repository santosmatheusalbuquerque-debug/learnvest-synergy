import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Zap, SlidersHorizontal, BookOpen, Cpu, Briefcase, Globe, TrendingUp, FlaskConical, Rocket, Heart, Trophy, Music, Leaf, Brain, Bitcoin, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { onboardingTopics, brStates } from "@/data/mockNews";

const iconMap: Record<string, React.ElementType> = {
  Cpu, Briefcase, Globe, TrendingUp, FlaskConical, Rocket, Heart, Trophy, Music, Leaf, Brain, Bitcoin,
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [profile, setProfile] = useState<string | null>(null);
  const [state, setState] = useState("");

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const profiles = [
    { id: "quick", label: "Leitor Rápido", desc: "Quero resumos e manchetes. Menos de 2 min por notícia.", icon: Zap },
    { id: "balanced", label: "Equilibrado", desc: "Mistura de resumos e reportagens completas.", icon: SlidersHorizontal },
    { id: "deep", label: "Leitor Profundo", desc: "Quero análises detalhadas e contexto completo.", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: step >= s ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
          <span className="text-xs text-muted-foreground ml-2">{step}/3</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Passo 1
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Bem-vindo à notice.me</h1>
              <p className="text-muted-foreground mb-8">Vamos personalizar sua experiência. Escolha pelo menos 3 tópicos de interesse:</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {onboardingTopics.map((topic) => {
                  const Icon = iconMap[topic.icon] || Cpu;
                  const selected = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={cn(
                        "relative flex items-center gap-3 rounded-xl border p-4 transition-all duration-200",
                        selected
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border bg-card hover:border-muted-foreground/30"
                      )}
                    >
                      {selected && (
                        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check size={12} className="text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${topic.color}20`, color: topic.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <span className="font-medium text-sm text-foreground">{topic.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={selectedTopics.length < 3}
                >
                  Continuar <ArrowRight className="ml-1" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Passo 2
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Qual é o seu perfil?</h1>
              <p className="text-muted-foreground mb-8">Isso ajuda a calibrar a profundidade das notícias.</p>

              <div className="space-y-3">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProfile(p.id)}
                    className={cn(
                      "w-full flex items-start gap-4 rounded-xl border p-5 text-left transition-all duration-200",
                      profile === p.id
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-border bg-card hover:border-muted-foreground/30"
                    )}
                  >
                    <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center shrink-0", profile === p.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                      <p.icon size={22} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">{p.label}</p>
                      <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft size={16} className="mr-1" /> Voltar</Button>
                <Button variant="hero" size="lg" onClick={() => setStep(3)} disabled={!profile}>
                  Continuar <ArrowRight className="ml-1" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Passo 3
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Onde você está?</h1>
              <p className="text-muted-foreground mb-8">Para incluir notícias relevantes da sua região.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">País</label>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-foreground">
                    <MapPin size={16} className="text-muted-foreground" />
                    Brasil
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Estado</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecione...</option>
                    {brStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Cidade</label>
                  <input
                    type="text"
                    placeholder="Ex: São Paulo"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}><ArrowLeft size={16} className="mr-1" /> Voltar</Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => navigate("/feed")}>Pular</Button>
                  <Button variant="hero" size="lg" onClick={() => navigate("/feed")}>
                    Ver Meu Feed <ArrowRight className="ml-1" size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
