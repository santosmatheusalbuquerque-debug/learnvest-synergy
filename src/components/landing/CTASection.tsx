import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-primary p-12 text-center sm:p-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(30_85%_50%/0.3),transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
              Pronto para transformar seu aprendizado?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
              Junte-se a milhares de brasileiros que já estão evoluindo com a notice.me.
              Comece gratuitamente hoje.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/registro">
                <Button size="xl" variant="heroOutline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50">
                  Criar Conta Grátis <ArrowRight className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
