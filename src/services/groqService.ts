const GROQ_API_KEY = "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";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama3-8b-8192";

async function callGroq(systemPrompt: string, userMessage: string): Promise<string> {
  const res = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userMessage },
      ],
      max_tokens: 512,
      temperature: 0.5,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

// ─── Resumo em 3 bullets ──────────────────────────────────────────────────────
export async function summarizeArticle(
  title: string,
  description: string
): Promise<string[]> {
  const system =
    "Você é um assistente de notícias brasileiro. Responda SEMPRE em português do Brasil. Seja objetivo e direto.";
  const user = `Resuma esta notícia em exatamente 3 bullet points curtos (máximo 18 palavras cada).
Retorne APENAS os 3 bullets, um por linha, cada um começando com •

Título: ${title}
Descrição: ${description}`;

  try {
    const raw = await callGroq(system, user);
    const bullets = raw
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("•"))
      .map((l) => l.replace(/^•\s*/, ""))
      .slice(0, 3);
    return bullets.length > 0 ? bullets : ["Resumo indisponível no momento."];
  } catch {
    return ["Resumo indisponível no momento."];
  }
}

// ─── Insight pessoal ──────────────────────────────────────────────────────────
export async function getPersonalInsight(
  title: string,
  categoryLabel: string
): Promise<string> {
  const system =
    "Você é um assistente de notícias brasileiro. Responda SEMPRE em português do Brasil.";
  const user = `Em uma frase curta (máximo 20 palavras), explique por que esta notícia de ${categoryLabel} pode impactar diretamente o leitor brasileiro.
Comece a resposta com "Isso impacta você:"

Notícia: ${title}`;

  try {
    const raw = await callGroq(system, user);
    return raw || "Isso impacta você: acompanhe os desdobramentos desta notícia.";
  } catch {
    return "Isso impacta você: acompanhe os desdobramentos desta notícia.";
  }
}

// ─── Chat com o artigo ────────────────────────────────────────────────────────
export async function chatWithArticle(
  title: string,
  description: string,
  question: string
): Promise<string> {
  const system =
    "Você é um especialista em análise de notícias. Responda em português brasileiro de forma clara, direta e informativa. Máximo 3 parágrafos curtos.";
  const user = `Com base nesta notícia:
Título: ${title}
Conteúdo: ${description}

Pergunta do leitor: ${question}`;

  return callGroq(system, user);
}
