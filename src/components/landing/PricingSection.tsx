import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "para sempre",
    features: ["Feed de notícias básico", "10 resumos de IA por dia", "Acesso a 5 cursos gratuitos", "Personalização simples", "Anúncios contextuais"],
    cta: "Começar Grátis",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R$ 19",
    period: "por mês",
    badge: "Mais Popular",
    features: ["Tudo do plano Gratuito", "IA ilimitada", "Análise de viés das notícias", "Chat com notícias", "Sem anúncios", "Todos os cursos", "Certificados verificáveis"],
    cta: "Assinar Pro",
    highlight: true,
  },
  {
    name: "Elite",
    price: "R$ 39",
    period: "por mês",
    features: ["Tudo do plano Pro", "Newsletters curadas exclusivas", "Relatório semanal personalizado", "Acesso antecipado a recursos", "Suporte prioritário", "API de notícias para projetos", "Grupo VIP no Discord"],
    cta: "Assinar Elite",
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section id="precos" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Escolha seu <span className="text-gradient">plano</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Comece gratuitamente e evolua conforme suas necessidades.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl border p-6 flex flex-col",
                plan.highlight
                  ? "border-primary bg-primary/5 shadow-glow"
                  : "border-border bg-card"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/registro">
                <Button variant={plan.highlight ? "hero" : "outline"} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
