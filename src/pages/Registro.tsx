import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

const Registro = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative hidden w-1/2 items-center justify-center bg-gradient-hero lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(30_85%_50%/0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-md px-12 text-center">
          <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-gradient-primary" />
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Comece sua jornada na <span className="text-gradient">notice.me</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Acesse cursos de qualidade e notícias curadas com IA. Tudo em um só lugar.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Voltar ao início
          </Link>

          <div>
            <h1 className="font-heading text-2xl font-bold">Criar Conta</h1>
            <p className="mt-1 text-muted-foreground">Preencha seus dados para começar.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="nome" placeholder="Seu nome" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input id="sobrenome" placeholder="Seu sobrenome" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="Mínimo 8 caracteres" className="pl-10" />
              </div>
            </div>

            <Link to="/dashboard">
              <Button variant="hero" className="w-full" size="lg">
                Criar Conta
              </Button>
            </Link>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Entrar</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Registro;
