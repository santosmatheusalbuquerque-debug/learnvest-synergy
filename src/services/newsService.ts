import { Article, CATEGORY_MAP } from "@/types/article";

const NEWS_API_KEY = "0922b07621554dc99bdcd3ebdd51f94b";
const CORS_PROXY = "https://corsproxy.io/?";

interface NewsAPIArticle {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
  author: string | null;
}

interface NewsAPIResponse {
  articles: NewsAPIArticle[];
}

function estimateReadTime(text: string): number {
  const words = text?.split(" ").length ?? 100;
  return Math.max(1, Math.round(words / 200));
}

function buildUrl(endpoint: string, params: Record<string, string>): string {
  const base = `https://newsapi.org/v2/${endpoint}`;
  const query = new URLSearchParams({ ...params, apiKey: NEWS_API_KEY }).toString();
  return `${CORS_PROXY}${encodeURIComponent(`${base}?${query}`)}`;
}

async function fetchCategory(
  endpoint: string,
  params: Record<string, string>,
  category: string
): Promise<Article[]> {
  try {
    const url = buildUrl(endpoint, params);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: NewsAPIResponse = await res.json();

    return (data.articles ?? [])
      .filter((a) => a.title && a.title !== "[Removed]")
      .map((a, idx) => ({
        id: `${category}-${idx}-${Date.now()}`,
        title: a.title,
        description: a.description ?? "",
        content: a.content ?? a.description ?? "",
        url: a.url,
        image: a.urlToImage ?? "",
        publishedAt: a.publishedAt,
        source: a.source.name,
        author: a.author ?? a.source.name,
        category,
        categoryLabel: CATEGORY_MAP[category]?.label ?? category,
        categoryColor: CATEGORY_MAP[category]?.color ?? "#F97316",
        aiSummary: [],
        personalInsight: "",
        readTime: estimateReadTime(a.content ?? a.description ?? ""),
        summaryLoading: true,
      }));
  } catch (err) {
    console.error(`[newsService] Erro ao buscar categoria ${category}:`, err);
    return [];
  }
}

export async function fetchAllCategories(): Promise<Article[]> {
  const requests: Promise<Article[]>[] = [
    fetchCategory("top-headlines", { country: "br", category: "technology", pageSize: "8" }, "tecnologia"),
    fetchCategory("top-headlines", { country: "br", category: "business",   pageSize: "8" }, "negocios"),
    fetchCategory("top-headlines", { country: "br", category: "science",    pageSize: "6" }, "ciencia"),
    fetchCategory("top-headlines", { country: "br", category: "health",     pageSize: "6" }, "saude"),
    fetchCategory("top-headlines", { country: "br", category: "sports",     pageSize: "6" }, "esportes"),
    fetchCategory("everything", {
      q: "geopolítica OR relações internacionais OR diplomacia",
      language: "pt", sortBy: "publishedAt", pageSize: "8",
    }, "geopolitica"),
    fetchCategory("everything", {
      q: "economia brasil OR mercado financeiro OR PIB",
      language: "pt", sortBy: "publishedAt", pageSize: "8",
    }, "economia"),
    fetchCategory("everything", {
      q: "inteligência artificial OR machine learning OR IA",
      language: "pt", sortBy: "publishedAt", pageSize: "8",
    }, "ia"),
    fetchCategory("everything", {
      q: "startup brasil OR empreendedorismo OR venture capital",
      language: "pt", sortBy: "publishedAt", pageSize: "6",
    }, "startups"),
  ];

  const results = await Promise.all(requests);
  return results.flat();
}
