import { useState, useEffect, useCallback } from "react";
import { Article } from "@/types/article";
import { fetchAllCategories } from "@/services/newsService";
import { summarizeArticle, getPersonalInsight } from "@/services/groqService";

const CACHE_KEY = "noticeme_feed_cache";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutos

interface CacheEntry {
  articles: Article[];
  timestamp: number;
}

function loadCache(): Article[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) return null;
    return entry.articles;
  } catch {
    return null;
  }
}

function saveCache(articles: Article[]) {
  try {
    const entry: CacheEntry = { articles, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // storage cheio — ignora
  }
}

async function enrichBatch(articles: Article[]): Promise<Article[]> {
  const BATCH_SIZE = 5;
  const enriched = [...articles];

  for (let i = 0; i < enriched.length; i += BATCH_SIZE) {
    const batch = enriched.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (article, batchIdx) => {
        const idx = i + batchIdx;
        try {
          const [bullets, insight] = await Promise.all([
            summarizeArticle(article.title, article.description),
            getPersonalInsight(article.title, article.categoryLabel),
          ]);
          enriched[idx] = {
            ...enriched[idx],
            aiSummary: bullets,
            personalInsight: insight,
            summaryLoading: false,
          };
        } catch {
          enriched[idx] = { ...enriched[idx], summaryLoading: false };
        }
      })
    );
  }

  return enriched;
}

export interface UseNewsFeedReturn {
  articles: Article[];
  loading: boolean;
  enriching: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshFeed: () => void;
}

export function useNewsFeed(): UseNewsFeedReturn {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [enriching, setEnriching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [forceRefresh, setForceRefresh] = useState(0);

  const refreshFeed = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
    setForceRefresh((n) => n + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      // Tentar cache
      const cached = loadCache();
      if (cached && cached.length > 0) {
        setArticles(cached);
        setLoading(false);
        setLastUpdated(new Date());
        return;
      }

      try {
        // Buscar notícias reais
        const raw = await fetchAllCategories();

        if (cancelled) return;

        if (raw.length === 0) {
          setError("Não foi possível carregar as notícias. Usando conteúdo em cache.");
          setLoading(false);
          return;
        }

        setArticles(raw);
        setLoading(false);
        setLastUpdated(new Date());

        // Enriquecer com Groq em background
        setEnriching(true);
        const enriched = await enrichBatch(raw);
        if (cancelled) return;

        setArticles(enriched);
        setEnriching(false);
        saveCache(enriched);
        setLastUpdated(new Date());
      } catch (err) {
        if (!cancelled) {
          setError("Erro ao carregar notícias. Verifique sua conexão.");
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [forceRefresh]);

  return { articles, loading, enriching, error, lastUpdated, refreshFeed };
}

// Helper: agrupa artigos por categoria
export function groupByCategory(articles: Article[]): Record<string, Article[]> {
  return articles.reduce<Record<string, Article[]>>((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});
}
