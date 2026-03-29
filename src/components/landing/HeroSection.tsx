import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, BookOpen, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-accent/10 blur-[80px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Plataforma #1 em Educação + Notícias no Brasil
          </motion.div>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Aprenda, se informe e{" "}
            <span className="text-gradient">evolua</span> com a{" "}
            <span className="text-gradient">notice.me</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Cursos de alta qualidade e notícias curadas com inteligência artificial.
            Tudo em uma única plataforma feita para quem quer crescer.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/registro">
              <Button variant="hero" size="xl">
                Começar Agora <ArrowRight className="ml-1" />
              </Button>
            </Link>
            <Button variant="heroOutline" size="xl">
              <Play className="mr-1" /> Ver Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: BookOpen, label: "200+ Cursos", desc: "Conteúdo atualizado" },
              { icon: Newspaper, label: "Notícias 24/7", desc: "Curadoria com IA" },
              { icon: ArrowRight, label: "Certificados", desc: "Reconhecidos" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-5 py-4 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <item.icon size={20} />
                </div>
                <div className="text-left">
                  <p className="font-heading font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
