import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { Clock, Users, Star, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Tecnologia", "IA", "Design", "Dados", "Negócios"];

const courses = [
  {
    id: 1, title: "Machine Learning Fundamentals", instructor: "Ana Silva", category: "IA",
    level: "Intermediário", duration: "12h", students: 3420, rating: 4.8, image: "ML",
    desc: "Domine os fundamentos de ML com projetos práticos e aplicações reais.",
    enrolled: true, progress: 75,
  },
  {
    id: 2, title: "UX Design Avançado", instructor: "Carlos Lima", category: "Design",
    level: "Avançado", duration: "8h", students: 1890, rating: 4.9, image: "UX",
    desc: "Técnicas avançadas de pesquisa, prototipação e testes de usabilidade.",
    enrolled: true, progress: 42,
  },
  {
    id: 3, title: "Python para Data Science", instructor: "Maria Costa", category: "Dados",
    level: "Iniciante", duration: "16h", students: 5600, rating: 4.7, image: "PY",
    desc: "De zero a análise de dados com Python, Pandas e Matplotlib.",
    enrolled: true, progress: 90,
  },
  {
    id: 4, title: "React & TypeScript Masterclass", instructor: "João Souza", category: "Tecnologia",
    level: "Intermediário", duration: "20h", students: 2800, rating: 4.6, image: "RE",
    desc: "Construa aplicações modernas com React, TypeScript e boas práticas.",
    enrolled: false, progress: 0,
  },
  {
    id: 5, title: "Estratégias de Negócios Digitais", instructor: "Luciana Reis", category: "Negócios",
    level: "Iniciante", duration: "6h", students: 4200, rating: 4.5, image: "NG",
    desc: "Aprenda a criar e escalar negócios digitais no mercado brasileiro.",
    enrolled: false, progress: 0,
  },
  {
    id: 6, title: "Deep Learning com TensorFlow", instructor: "Pedro Alves", category: "IA",
    level: "Avançado", duration: "18h", students: 1240, rating: 4.8, image: "DL",
    desc: "Redes neurais profundas, CNNs, RNNs e Transformers na prática.",
    enrolled: false, progress: 0,
  },
];

const Cursos = () => {
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos" ? courses : courses.filter((c) => c.category === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Cursos</h1>
          <p className="text-muted-foreground">Explore e continue seus cursos.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
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

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-glow"
            >
              {/* Image placeholder */}
              <div className="relative flex h-36 items-center justify-center bg-gradient-primary/80">
                <span className="font-heading text-4xl font-bold text-primary-foreground/50">{course.image}</span>
                {course.enrolled && (
                  <div className="absolute top-3 right-3 rounded-full bg-background/80 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
                    {course.progress}%
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all group-hover:bg-background/30 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                    <Play size={20} />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">{course.category}</span>
                  <span className="text-xs text-muted-foreground">{course.level}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground line-clamp-1">{course.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{course.desc}</p>

                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {course.students.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-accent" /> {course.rating}</span>
                </div>

                {course.enrolled ? (
                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium text-foreground">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-primary transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                    <Button variant="default" size="sm" className="mt-3 w-full">
                      <BookOpen size={14} className="mr-1" /> Continuar
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Matricular-se
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cursos;
