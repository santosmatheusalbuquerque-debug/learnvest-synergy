const Footer = () => {
  const columns = [
    { title: "Produto", links: ["Cursos", "Notícias", "Preços", "Changelog"] },
    { title: "Empresa", links: ["Sobre", "Blog", "Carreiras", "Contato"] },
    { title: "Legal", links: ["Termos de Uso", "Privacidade", "Cookies"] },
  ];

  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-gradient-primary" />
              <span className="font-heading text-lg font-bold text-foreground">
                notice<span className="text-gradient">.me</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Aprenda. Se informe. Evolua.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-sm text-foreground mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 notice.me — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
