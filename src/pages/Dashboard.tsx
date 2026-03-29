import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BookOpen, Newspaper, Trophy, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: BookOpen, label: "Cursos Ativos", value: "4", color: "bg-primary/15 text-primary" },
  { icon: Clock, label: "Horas Estudadas", value: "32h", color: "bg-accent/15 text-accent" },
  { icon: Trophy, label: "Certificados", value: "2", color: "bg-secondary/15 text-secondary" },
  { icon: TrendingUp, label: "Progresso Geral", value: "68%", color: "bg-primary/15 text-primary" },
];

const recentCourses = [
  { title: "Machine Learning Fundamentals", progress: 75, category: "IA" },
  { title: "UX Design Avançado", progress: 42, category: "Design" },
  { title: "Python para Data Science", progress: 90, category: "Dados" },
];

const recentNews = [
  { title: "OpenAI anuncia GPT-5 com capacidades revolucionárias", time: "2h atrás", category: "Tecnologia" },
  { title: "Novas diretrizes do MEC para cursos online em 2026", time: "4h atrás", category: "Educação" },
  { title: "Brasil lidera adoção de IA na América Latina", time: "6h atrás", category: "IA" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Bom dia! 👋</h1>
          <p className="text-muted-foreground">Continue de onde parou.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent courses */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Seus Cursos</h2>
              <Link to="/dashboard/cursos">
                <Button variant="ghost" size="sm">Ver todos <ArrowRight size={14} /></Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentCourses.map((c) => (
                <div key={c.title} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary text-xs font-bold font-heading">
                    {c.category.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.title}</p>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{c.progress}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent news */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Notícias Recentes</h2>
              <Link to="/dashboard/noticias">
                <Button variant="ghost" size="sm">Ver todas <ArrowRight size={14} /></Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentNews.map((n) => (
                <div key={n.title} className="flex items-start gap-3 group cursor-pointer">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Newspaper size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{n.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{n.time}</span>
                      <span>·</span>
                      <span className="rounded bg-muted px-1.5 py-0.5">{n.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
