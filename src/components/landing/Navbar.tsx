import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Cursos", href: "#cursos" },
    { label: "Notícias", href: "#noticias" },
    { label: "Preços", href: "#precos" },
    { label: "Sobre", href: "#sobre" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
          <span className="font-heading text-xl font-bold text-foreground">
            notice<span className="text-gradient">.me</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link to="/registro">
            <Button variant="hero" size="sm">Começar Grátis</Button>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
              {links.map((l) => (
                <a key={l.label} href={l.href} className="text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <Link to="/login" className="flex-1"><Button variant="outline" className="w-full">Entrar</Button></Link>
                <Link to="/registro" className="flex-1"><Button variant="hero" className="w-full">Começar Grátis</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
