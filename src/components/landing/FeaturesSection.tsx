import { motion } from "framer-motion";
import { BookOpen, Newspaper, Brain, Award, Bell, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Cursos Interativos",
    desc: "Trilhas personalizadas com vídeo, texto e exercícios práticos para todos os níveis.",
  },
  {
    icon: Newspaper,
    title: "Feed de Notícias",
    desc: "Notícias curadas de múltiplas fontes, organizadas por relevância e seus interesses.",
  },
  {
    icon: Brain,
    title: "IA Integrada",
    desc: "Tutor virtual, resumos automáticos e recomendações inteligentes de conteúdo.",
  },
  {
    icon: Award,
    title: "Certificados",
    desc: "Conquiste certificados verificáveis ao concluir cursos e trilhas completas.",
  },
  {
    icon: Bell,
    title: "Notificações Inteligentes",
    desc: "Alertas personalizados sobre novos conteúdos, notícias relevantes e seu progresso.",
  },
  {
    icon: TrendingUp,
    title: "Progresso Detalhado",
    desc: "Acompanhe sua evolução com analytics, streaks e metas personalizadas.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="cursos" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Tudo que você precisa para <span className="text-gradient">evoluir</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Uma plataforma completa que une educação de qualidade com informação relevante.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-glow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
