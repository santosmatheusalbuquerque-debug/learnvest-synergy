export interface NewsItem {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  summary?: string;
  source: string;
  sourceLogo?: string;
  author?: string;
  timeAgo: string;
  readTime: string;
  tags?: string[];
  reactions?: { interessante: number; importante: number };
  aiInsight?: string;
  bias?: string;
  trending?: boolean;
  trendingRank?: number;
  saved?: boolean;
  badge?: string;
  localBadge?: string;
}

export const featuredNews: NewsItem = {
  id: "featured",
  category: "Geopolítica",
  categoryColor: "#ef4444",
  title: "EUA e China firmam acordo histórico sobre tarifas comerciais após meses de negociações tensas",
  summary: "Após 8 meses de impasse, representantes das duas maiores economias do mundo assinaram um memorando que suspende as tarifas sobre 340 categorias de produtos. O acordo pode movimentar mais de US$ 2 trilhões em comércio bilateral e impactar diretamente preços de eletrônicos e commodities no Brasil.",
  source: "Reuters Brasil",
  sourceLogo: "R",
  timeAgo: "há 2 horas",
  readTime: "4 min",
  bias: "Centro",
  badge: "DESTAQUE DO DIA",
};

export const topTodayNews: NewsItem[] = [
  {
    id: "n001",
    category: "Tecnologia",
    categoryColor: "#3b82f6",
    title: "Apple lança chips M4 Ultra com desempenho 3x superior ao M3 em tarefas de IA",
    source: "The Verge",
    timeAgo: "há 1h",
    readTime: "3 min",
    trendingRank: 1,
  },
  {
    id: "n002",
    category: "Economia",
    categoryColor: "#22c55e",
    title: "Selic pode cair para 12,5% ao ano até o fim de 2026, aponta relatório do Bradesco",
    source: "InfoMoney",
    timeAgo: "há 3h",
    readTime: "2 min",
    trendingRank: 2,
  },
  {
    id: "n003",
    category: "IA",
    categoryColor: "#F97316",
    title: "OpenAI anuncia GPT-5 com capacidade de raciocínio autônomo e execução de tarefas complexas",
    source: "TechCrunch",
    timeAgo: "há 5h",
    readTime: "5 min",
    trendingRank: 3,
  },
  {
    id: "n004",
    category: "Startups",
    categoryColor: "#8b5cf6",
    title: "Startup brasileira de fintech capta R$ 480 milhões em rodada Série C liderada pelo SoftBank",
    source: "Exame",
    timeAgo: "há 6h",
    readTime: "3 min",
    trendingRank: 4,
  },
  {
    id: "n005",
    category: "Geopolítica",
    categoryColor: "#ef4444",
    title: "Rússia e Ucrânia iniciam negociações mediadas pela Turquia em Istambul",
    source: "BBC Brasil",
    timeAgo: "há 4h",
    readTime: "6 min",
    trendingRank: 5,
  },
];

export const techNews: NewsItem[] = [
  {
    id: "t001",
    category: "Tecnologia",
    categoryColor: "#3b82f6",
    title: "Apple lança chips M4 Ultra com desempenho 3x superior ao M3 em tarefas de IA",
    summary: "A Apple apresentou sua nova linha de processadores M4 Ultra durante o evento WWDC 2026. O chip conta com 32 núcleos de CPU, 80 núcleos de GPU e 32 núcleos de Neural Engine dedicados à IA.",
    source: "The Verge",
    sourceLogo: "V",
    author: "Nilay Patel",
    timeAgo: "há 1h",
    readTime: "3 min",
    tags: ["Apple", "Chips", "Hardware", "IA"],
    reactions: { interessante: 1240, importante: 890 },
    aiInsight: "Isso impacta você: com IA rodando localmente, privacidade aumenta e dependência de nuvem diminui.",
    bias: "Centro-técnico",
  },
  {
    id: "t002",
    category: "Tecnologia",
    categoryColor: "#3b82f6",
    title: "Google DeepMind apresenta AlphaFold 3 com suporte a moléculas de DNA e RNA",
    summary: "A nova versão do modelo de dobramento de proteínas agora consegue prever estruturas de DNA, RNA e ligantes com precisão atômica.",
    source: "Nature",
    timeAgo: "há 7h",
    readTime: "8 min",
    tags: ["Google", "Bioinformática", "Saúde", "IA"],
    reactions: { interessante: 3200, importante: 2100 },
  },
  {
    id: "t003",
    category: "Tecnologia",
    categoryColor: "#3b82f6",
    title: "Microsoft integra Copilot diretamente no Windows 12 como assistente nativo do sistema",
    summary: "O novo Windows 12 traz o Copilot embutido no kernel, permitindo controle por voz de qualquer aplicativo.",
    source: "Windows Central",
    timeAgo: "há 9h",
    readTime: "4 min",
    tags: ["Microsoft", "Windows", "Copilot", "Software"],
    reactions: { interessante: 987, importante: 654 },
  },
];

export const techSmallNews = [
  { title: "Meta lança óculos Ray-Ban com tela holográfica embutida na armação", source: "Engadget", timeAgo: "há 11h", readTime: "2 min" },
  { title: "Samsung anuncia dobrável com tela de 9 polegadas e bateria de grafeno", source: "GSMArena", timeAgo: "há 13h", readTime: "2 min" },
  { title: "Nvidia supera Apple em valor de mercado pela primeira vez na história", source: "Bloomberg", timeAgo: "há 14h", readTime: "3 min" },
];

export const aiNews: NewsItem[] = [
  {
    id: "ai001",
    category: "IA",
    categoryColor: "#F97316",
    title: "OpenAI anuncia GPT-5: raciocínio autônomo e execução de tarefas por horas sem supervisão",
    summary: "O GPT-5 representa uma mudança de paradigma: além de responder perguntas, o modelo consegue planejar, executar e corrigir tarefas complexas de engenharia de software, pesquisa científica e análise financeira por períodos prolongados.",
    source: "TechCrunch",
    sourceLogo: "TC",
    author: "Kyle Wiggers",
    timeAgo: "há 5h",
    readTime: "7 min",
    tags: ["OpenAI", "GPT-5", "LLM", "AGI"],
    aiInsight: "Isso impacta você: profissionais de tecnologia e negócios precisarão adaptar seus fluxos de trabalho nos próximos 12 meses.",
    bias: "Neutro",
    reactions: { interessante: 8900, importante: 6700 },
    trending: true,
    badge: "ANÁLISE PROFUNDA",
  },
  {
    id: "ai002",
    category: "IA",
    categoryColor: "#F97316",
    title: "Anthropic lança Claude 4 com janela de contexto de 2 milhões de tokens",
    summary: "O novo Claude consegue processar livros inteiros, bases de código gigantescas e históricos longos de conversas em uma única chamada.",
    source: "VentureBeat",
    timeAgo: "há 8h",
    readTime: "4 min",
    tags: ["Anthropic", "Claude", "LLM"],
  },
  {
    id: "ai003",
    category: "IA",
    categoryColor: "#F97316",
    title: "IA da DeepSeek ultrapassa modelos ocidentais em benchmark de matemática avançada",
    summary: "O modelo R2 da startup chinesa DeepSeek obteve pontuação 94,7% no MATH-500, superando o GPT-5 e o Gemini Ultra.",
    source: "MIT Technology Review",
    timeAgo: "há 12h",
    readTime: "5 min",
    tags: ["DeepSeek", "China", "IA", "Geopolítica"],
  },
];

export const businessNews: NewsItem[] = [
  {
    id: "b001",
    category: "Negócios",
    categoryColor: "#8b5cf6",
    title: "Nubank atinge 100 milhões de clientes e se torna o maior banco digital do mundo fora da China",
    summary: "O banco digital fundado por David Vélez celebrou a marca histórica com anúncio de novos produtos: conta empresarial com crédito automático, seguro de vida parametrizado por IA e cartão com cashback dinâmico.",
    source: "Exame",
    sourceLogo: "E",
    author: "Redação Exame",
    timeAgo: "há 3h",
    readTime: "4 min",
    tags: ["Nubank", "Fintech", "Brasil", "Banking"],
    aiInsight: "Isso impacta você: se você é cliente ou investidor do Nubank, essa expansão deve trazer novos benefícios até Q3 2026.",
    bias: "Neutro",
    reactions: { interessante: 4500, importante: 3200 },
  },
  {
    id: "b002",
    category: "Negócios",
    categoryColor: "#8b5cf6",
    title: "Startup brasileira de logística capta R$ 480M e mira expansão para América Latina",
    summary: "A Loggi anunciou rodada Série D liderada pelo SoftBank Vision Fund 3, com participação da Sequoia Capital.",
    source: "Startups.com.br",
    timeAgo: "há 6h",
    readTime: "3 min",
    tags: ["Loggi", "Logística", "SoftBank", "VC"],
  },
  {
    id: "b003",
    category: "Negócios",
    categoryColor: "#8b5cf6",
    title: "Warren Buffett revela posição bilionária em empresas de IA na carta anual da Berkshire",
    summary: "A carta anual de 2026 revelou que a Berkshire Hathaway adquiriu participações significativas em três empresas de infraestrutura de IA.",
    source: "Bloomberg",
    timeAgo: "há 8h",
    readTime: "5 min",
    tags: ["Berkshire", "Buffett", "Investimentos", "IA"],
  },
];

export const businessSmallNews = [
  { title: "SpaceX Starship completa primeira viagem comercial ao redor da Lua com sucesso", source: "Space.com", timeAgo: "há 10h", readTime: "4 min" },
  { title: "Tesla lança Robotaxi em São Paulo após aprovação da ANTT", source: "Carro.Blog.br", timeAgo: "há 11h", readTime: "3 min" },
  { title: "Amazon demite 15.000 funcionários e anuncia automação total de 40 centros de distribuição", source: "Reuters", timeAgo: "há 14h", readTime: "3 min" },
];

export const geopoliticsNews: NewsItem[] = [
  {
    id: "g001",
    category: "Geopolítica",
    categoryColor: "#ef4444",
    title: "Cúpula do G20 em Brasília define novo framework global para regulação de IA soberana",
    summary: "Os líderes das 20 maiores economias assinaram a 'Declaração de Brasília sobre IA', estabelecendo princípios de soberania digital, portabilidade de dados entre nações e proibição de sistemas autônomos em decisões militares.",
    source: "Folha de S.Paulo",
    sourceLogo: "FSP",
    timeAgo: "há 4h",
    readTime: "6 min",
    tags: ["G20", "Brasil", "IA", "Diplomacia"],
    reactions: { interessante: 5600, importante: 7800 },
    badge: "EM DESENVOLVIMENTO",
  },
  {
    id: "g002",
    category: "Geopolítica",
    categoryColor: "#ef4444",
    title: "Tensão no Mar do Sul da China: Taiwan anuncia sistema de defesa com mísseis hipersônicos",
    summary: "Taiwan revelou um sistema de defesa costeira com mísseis hipersônicos de fabricação doméstica com alcance de 1.500km.",
    source: "The Economist",
    timeAgo: "há 9h",
    readTime: "7 min",
    tags: ["Taiwan", "China", "Defesa", "Geopolítica"],
  },
  {
    id: "g003",
    category: "Geopolítica",
    categoryColor: "#ef4444",
    title: "União Europeia aprova sanções contra 47 empresas russas ligadas à evasão de chips de IA",
    summary: "O 14º pacote de sanções da UE mira empresas intermediárias que reexportam semicondutores avançados para a Rússia.",
    source: "Politico Europe",
    timeAgo: "há 11h",
    readTime: "4 min",
    tags: ["UE", "Rússia", "Sanções", "Semicondutores"],
  },
];

export const economyNews: NewsItem[] = [
  {
    id: "e001",
    category: "Economia",
    categoryColor: "#22c55e",
    title: "PIB do Brasil cresce 3,8% no primeiro trimestre de 2026, acima das projeções do FMI",
    summary: "O IBGE divulgou hoje que o PIB brasileiro cresceu 3,8% no primeiro trimestre de 2026, superando a projeção de 2,9% do FMI. O setor de serviços de tecnologia liderou o crescimento com expansão de 11,2%.",
    source: "G1 Economia",
    sourceLogo: "G1",
    timeAgo: "há 2h",
    readTime: "4 min",
    tags: ["Brasil", "PIB", "Economia", "IBGE"],
    aiInsight: "Isso impacta você: crescimento acima do esperado pode pressionar a inflação e influenciar a decisão do Copom sobre a Selic em maio.",
    reactions: { interessante: 3400, importante: 5100 },
  },
  {
    id: "e002",
    category: "Economia",
    categoryColor: "#22c55e",
    title: "Dólar cai para R$ 4,82 com entrada de capital estrangeiro em renda fixa brasileira",
    summary: "A moeda americana fechou em queda de 1,3% após dados positivos do PIB.",
    source: "Valor Econômico",
    timeAgo: "há 5h",
    readTime: "3 min",
    tags: ["Câmbio", "Dólar", "Real", "Tesouro"],
  },
  {
    id: "e003",
    category: "Economia",
    categoryColor: "#22c55e",
    title: "Reforma tributária: empresas de tecnologia terão alíquota reduzida de IBS para P&D",
    summary: "Decreto regulamentador prevê alíquota de IBS de 6% para empresas que investirem mais de 15% da receita em P&D.",
    source: "CNN Brasil",
    timeAgo: "há 7h",
    readTime: "4 min",
    tags: ["Reforma Tributária", "Tecnologia", "P&D", "Governo"],
  },
];

export const localNews: NewsItem[] = [
  {
    id: "l001",
    category: "Local",
    categoryColor: "#F97316",
    title: "Prefeitura de SP anuncia 500 novos postos de vagas em tecnologia no programa Inova SP",
    summary: "O programa municipal de qualificação em tecnologia abre inscrições para cursos gratuitos de programação, IA e cibersegurança.",
    source: "Agência SP",
    timeAgo: "há 8h",
    readTime: "2 min",
    tags: ["São Paulo", "Emprego", "Tecnologia", "Educação"],
    localBadge: "São Paulo",
  },
  {
    id: "l002",
    category: "Local",
    categoryColor: "#F97316",
    title: "Metrô de SP inaugura Linha 6-Laranja e reduz tempo entre Centro e Brasilândia para 18 minutos",
    summary: "A nova linha, que conecta a Estação São Joaquim à Brasilândia, foi inaugurada com capacidade para 840 mil passageiros por dia.",
    source: "Folha de SP",
    timeAgo: "há 10h",
    readTime: "3 min",
    tags: ["Metrô SP", "Mobilidade", "São Paulo"],
    localBadge: "São Paulo",
  },
];

export const trendingTopics = [
  { rank: 1, topic: "#GPT5", count: "42.1k posts" },
  { rank: 2, topic: "#AcordoEUAChina", count: "38.7k posts" },
  { rank: 3, topic: "#Nubank100M", count: "29.3k posts" },
  { rank: 4, topic: "#PIBBrasil", count: "18.9k posts" },
  { rank: 5, topic: "#M4Ultra", count: "15.2k posts" },
];

export const followedSources = [
  { name: "TechCrunch", logo: "TC", newCount: 3 },
  { name: "InfoMoney", logo: "IM", newCount: 7 },
  { name: "MIT Tech Review", logo: "MIT", newCount: 2 },
  { name: "The Economist", logo: "TE", newCount: 1 },
];

export const articleData = {
  id: "ai001",
  category: "Tecnologia",
  categoryColor: "#3b82f6",
  title: "OpenAI anuncia GPT-5 com capacidade de raciocínio autônomo e execução de tarefas complexas",
  subtitle: "O modelo mais avançado da empresa promete executar tarefas de engenharia e pesquisa por horas sem supervisão, marcando uma nova era na IA aplicada.",
  source: "TechCrunch",
  sourceLogo: "TC",
  author: "Kyle Wiggers",
  publishedAt: "29 de março de 2026, 14:30",
  readTime: "7 min",
  bias: "Neutro",
  aiSummary: [
    "GPT-5 consegue executar tarefas complexas por horas sem supervisão humana",
    "Desempenho 3x superior ao GPT-4 em benchmarks de programação e matemática",
    "Disponível via API a partir de abril de 2026 por US$ 0,08 por 1M tokens",
    "Empresas brasileiras de tecnologia já estão na lista de espera do beta",
  ],
  aiContext: "Por que isso importa para você: como profissional de tecnologia, o GPT-5 pode automatizar tarefas repetitivas de codificação e análise que hoje consomem horas do seu dia.",
  body: [
    "A OpenAI apresentou nesta quinta-feira o GPT-5, seu modelo de linguagem mais avançado, durante evento em São Francisco transmitido para todo o mundo. O modelo representa o que Sam Altman chamou de 'o maior salto desde o GPT-3' e inaugura uma nova era de agentes autônomos de IA.",
    "Diferente dos modelos anteriores, o GPT-5 não se limita a responder perguntas. Ele é capaz de planejar, executar e corrigir tarefas complexas de forma autônoma, operando por horas sem necessidade de supervisão humana. Nos testes internos, o modelo conseguiu desenvolver um aplicativo web funcional do zero, debugar uma base de código de 50 mil linhas e produzir um relatório de pesquisa acadêmica de 20 páginas.",
    "\"Estamos vendo pela primeira vez um modelo que realmente pensa como um engenheiro sênior\", declarou Altman durante a apresentação. \"Ele não apenas escreve código — ele planeja a arquitetura, testa, refatora e documenta.\"",
    "Os benchmarks divulgados são impressionantes: o GPT-5 obteve 96,2% no HumanEval (vs. 87% do GPT-4), 94,8% no MATH-500 e 89,3% no novo benchmark ARC-AGI, projetado especificamente para testar raciocínio abstrato.",
    "Para o mercado brasileiro, o impacto pode ser significativo. Empresas como Nubank, iFood e VTEX já estão na lista de espera do beta empresarial. A API será disponibilizada em abril de 2026 com preço inicial de US$ 0,08 por milhão de tokens — 40% mais barato que o GPT-4 Turbo.",
    "Especialistas alertam, porém, que a adoção em massa de agentes autônomos levanta questões importantes sobre responsabilidade, supervisão e impacto no mercado de trabalho. O professor Yoshua Bengio, da Universidade de Montreal, pediu cautela: \"Precisamos de frameworks robustos de governança antes de dar autonomia real a esses sistemas.\"",
    "A OpenAI anunciou também novas ferramentas de segurança, incluindo um sistema de monitoramento em tempo real que permite interromper o agente a qualquer momento e um log detalhado de todas as decisões tomadas pelo modelo durante suas sessões autônomas.",
    "O lançamento do GPT-5 intensifica a corrida pela inteligência artificial geral (AGI) entre as big techs. Google, Anthropic e Meta devem responder com seus próprios modelos avançados nos próximos meses.",
  ],
  suggestedQuestions: [
    "O que causou este desenvolvimento?",
    "Como isso me afeta diretamente?",
    "Quais empresas serão impactadas?",
    "Qual a perspectiva de longo prazo?",
  ],
  relatedNews: [
    { id: "ai002", title: "Anthropic lança Claude 4 com janela de contexto de 2 milhões de tokens", source: "VentureBeat", timeAgo: "há 8h" },
    { id: "ai003", title: "IA da DeepSeek ultrapassa modelos ocidentais em benchmark de matemática avançada", source: "MIT Technology Review", timeAgo: "há 12h" },
    { id: "t001", title: "Apple lança chips M4 Ultra com desempenho 3x superior ao M3 em tarefas de IA", source: "The Verge", timeAgo: "há 1h" },
    { id: "t003", title: "Microsoft integra Copilot diretamente no Windows 12 como assistente nativo", source: "Windows Central", timeAgo: "há 9h" },
  ],
};

export const categories = [
  { id: "all", label: "Todas", color: undefined },
  { id: "tech", label: "Tecnologia", color: "#3b82f6" },
  { id: "business", label: "Negócios", color: "#8b5cf6" },
  { id: "geopolitics", label: "Geopolítica", color: "#ef4444" },
  { id: "economy", label: "Economia", color: "#22c55e" },
  { id: "ai", label: "IA", color: "#F97316" },
  { id: "startups", label: "Startups", color: "#F97316" },
  { id: "crypto", label: "Cripto", color: "#eab308" },
  { id: "science", label: "Ciência", color: "#06b6d4" },
];

export const onboardingTopics = [
  { id: "tech", label: "Tecnologia", icon: "Cpu", color: "#3b82f6" },
  { id: "business", label: "Negócios", icon: "Briefcase", color: "#8b5cf6" },
  { id: "geopolitics", label: "Geopolítica", icon: "Globe", color: "#ef4444" },
  { id: "economy", label: "Economia", icon: "TrendingUp", color: "#22c55e" },
  { id: "science", label: "Ciência", icon: "FlaskConical", color: "#06b6d4" },
  { id: "startups", label: "Startups", icon: "Rocket", color: "#F97316" },
  { id: "crypto", label: "Cripto & Web3", icon: "Bitcoin", color: "#eab308" },
  { id: "health", label: "Saúde", icon: "Heart", color: "#ec4899" },
  { id: "sports", label: "Esportes", icon: "Trophy", color: "#84cc16" },
  { id: "culture", label: "Cultura", icon: "Music", color: "#a78bfa" },
  { id: "climate", label: "Meio Ambiente", icon: "Leaf", color: "#10b981" },
  { id: "ai", label: "Inteligência Artificial", icon: "Brain", color: "#F97316" },
];

export const brStates = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins",
];
