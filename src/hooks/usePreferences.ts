// Hook de preferências do usuário — alimentado por likes, tempo de leitura e categorias
// Persiste no localStorage e influencia a ordem do feed

export interface UserPreferences {
  // Pontuação por categoria (0-100), atualizada por interações
  categoryScores: Record<string, number>;
  // Artigos curtidos
  likedArticles: string[];
  // Artigos salvos
  savedArticles: string[];
  // Artigos ignorados ("não tenho interesse")
  hiddenArticles: string[];
  // Tempo gasto por categoria (em segundos)
  timePerCategory: Record<string, number>;
  // Artigos lidos
  readArticles: string[];
  // Total de interações
  totalInteractions: number;
}

const PREFS_KEY = "noticeme_preferences";

const DEFAULT_PREFS: UserPreferences = {
  categoryScores: {
    tecnologia: 50,
    ia: 50,
    negocios: 50,
    geopolitica: 50,
    economia: 50,
    startups: 50,
    ciencia: 50,
    saude: 50,
    esportes: 50,
  },
  likedArticles: [],
  savedArticles: [],
  hiddenArticles: [],
  timePerCategory: {},
  readArticles: [],
  totalInteractions: 0,
};

export function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePreferences(prefs: UserPreferences) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {}
}

// Aumenta score da categoria ao curtir (+8), diminui ao ignorar (-5)
export function updateScoreOnLike(prefs: UserPreferences, category: string): UserPreferences {
  const current = prefs.categoryScores[category] ?? 50;
  return {
    ...prefs,
    categoryScores: {
      ...prefs.categoryScores,
      [category]: Math.min(100, current + 8),
    },
    totalInteractions: prefs.totalInteractions + 1,
  };
}

export function updateScoreOnHide(prefs: UserPreferences, category: string): UserPreferences {
  const current = prefs.categoryScores[category] ?? 50;
  return {
    ...prefs,
    categoryScores: {
      ...prefs.categoryScores,
      [category]: Math.max(0, current - 5),
    },
  };
}

export function updateScoreOnRead(prefs: UserPreferences, category: string): UserPreferences {
  const current = prefs.categoryScores[category] ?? 50;
  return {
    ...prefs,
    categoryScores: {
      ...prefs.categoryScores,
      [category]: Math.min(100, current + 3),
    },
  };
}

// Ordena categorias pelo score do usuário (maior score = aparece primeiro)
export function getSortedCategories(prefs: UserPreferences, allCategories: string[]): string[] {
  return [...allCategories].sort(
    (a, b) => (prefs.categoryScores[b] ?? 50) - (prefs.categoryScores[a] ?? 50)
  );
}
