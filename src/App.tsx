import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Registro from "./pages/Registro.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Cursos from "./pages/Cursos.tsx";
import Noticias from "./pages/Noticias.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Feed from "./pages/Feed.tsx";
import Article from "./pages/Article.tsx";
import Settings from "./pages/Settings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/article/:id" element={<Article />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/cursos" element={<Cursos />} />
          <Route path="/dashboard/noticias" element={<Noticias />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
