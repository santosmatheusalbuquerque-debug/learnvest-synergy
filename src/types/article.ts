export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: string;
  author: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  aiSummary: string[];
  personalInsight: string;
  readTime: number;
  summaryLoading: boolean;
}

export const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  tecnologia: { label: "Tecnologia", color: "#3b82f6" },
  negocios:   { label: "Negócios",   color: "#8b5cf6" },
  geopolitica:{ label: "Geopolítica",color: "#ef4444" },
  economia:   { label: "Economia",   color: "#22c55e" },
  ia:         { label: "IA",         color: "#F97316" },
  startups:   { label: "Startups",   color: "#F97316" },
  ciencia:    { label: "Ciência",    color: "#06b6d4" },
  saude:      { label: "Saúde",      color: "#ec4899" },
  esportes:   { label: "Esportes",   color: "#84cc16" },
};
