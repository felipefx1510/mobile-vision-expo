export interface Task {
  id: string;
  time: string;
  subject: string;
  topic: string;
  duration: string;
  done: boolean;
}

export interface Exam {
  id: string;
  title: string;
  subtitle: string;
  questions: number;
  duration: string;
  level: string;
  progress: number;
  category: 'ENEM' | 'Matéria' | 'Sprint';
}

export interface Question {
  id: number;
  area: string;
  subject: string;
  topic: string;
  text: string;
  source: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctLetter: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

export interface LessonDetail {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  duration: string;
  videoPlaceholder: string;
  summary: string;
  topics: { id: string; label: string; completed: boolean }[];
  keyTakeaways: string[];
}

export const todayTasks: Task[] = [
  { id: '1', time: '08:30', subject: 'Matemática', topic: 'Funções do 2º grau', duration: '45 min', done: true },
  { id: '2', time: '14:00', subject: 'Linguagens', topic: 'Interpretação textual', duration: '35 min', done: false },
  { id: '3', time: '19:00', subject: 'Biologia', topic: 'Ecologia e ciclos', duration: '40 min', done: false },
];

export const subjectProgress = [
  { name: 'Matemática', progress: 72, color: '#A6FF00' },
  { name: 'Linguagens', progress: 58, color: '#B7D7FF' },
  { name: 'Natureza', progress: 64, color: '#FFD7A8' },
  { name: 'Humanas', progress: 81, color: '#D8C8FF' },
];

export const mockExams: Exam[] = [
  { id: 'enem-1', title: 'Simulado ENEM #08', subtitle: 'Prova completa', questions: 90, duration: '3h', level: 'Intermediário', progress: 0, category: 'ENEM' },
  { id: 'math-1', title: 'Sprint de Matemática', subtitle: 'Funções e geometria', questions: 25, duration: '45 min', level: 'Difícil', progress: 40, category: 'Sprint' },
  { id: 'human-1', title: 'Humanas em foco', subtitle: 'História e geografia', questions: 30, duration: '50 min', level: 'Intermediário', progress: 0, category: 'Matéria' },
];

export const mockExamQuestions: Question[] = [
  {
    id: 1,
    area: 'Matemática e suas Tecnologias',
    subject: 'Matemática',
    topic: 'Funções Quadráticas (2º Grau)',
    source: 'ENEM Adaptado',
    text: 'Um projétil é lançado verticalmente a partir do solo. Sua trajetória pode ser modelada pela função h(t) = -5t² + 40t, onde h é a altura em metros e t é o tempo em segundos após o lançamento. Qual é a altura máxima atingida pelo projétil?',
    options: [
      { letter: 'A', text: '40 metros' },
      { letter: 'B', text: '60 metros' },
      { letter: 'C', text: '80 metros' },
      { letter: 'D', text: '100 metros' },
      { letter: 'E', text: '120 metros' },
    ],
    correctLetter: 'C',
    explanation: 'O tempo do vértice é dado por tv = -b / (2a) = -40 / (2 * -5) = 4s. Substituindo na função: h(4) = -5(16) + 40(4) = -80 + 160 = 80 metros.',
  },
  {
    id: 2,
    area: 'Linguagens, Códigos e suas Tecnologias',
    subject: 'Língua Portuguesa',
    topic: 'Funções da Linguagem',
    source: 'ENEM Adaptado',
    text: 'Em uma campanha de conscientização sobre o uso racional da água, o anúncio destaca: "Feche a torneira enquanto escova os dentes. O futuro do planeta depende da sua atitude hoje!". Qual função da linguagem predomina no texto?',
    options: [
      { letter: 'A', text: 'Função Emotiva ou Expressiva' },
      { letter: 'B', text: 'Função Conativa ou Apelativa' },
      { letter: 'C', text: 'Função Referencial ou Denotativa' },
      { letter: 'D', text: 'Função Metalinguística' },
      { letter: 'E', text: 'Função Fática' },
    ],
    correctLetter: 'B',
    explanation: 'A função conativa (apelativa) busca influenciar e persuadir o comportamento do receptor, evidenciada pelo uso de verbos no imperativo ("Feche", "depende da sua atitude").',
  },
  {
    id: 3,
    area: 'Ciências da Natureza e suas Tecnologias',
    subject: 'Biologia',
    topic: 'Ecologia - Níveis Tróficos',
    source: 'ENEM Adaptado',
    text: 'Em um ecossistema aquático poluído por metais pesados não biodegradáveis (como mercúrio), qual grupo de organismos apresentará a maior concentração desse poluente em seus tecidos?',
    options: [
      { letter: 'A', text: 'Fitoplâncton (produtores primários)' },
      { letter: 'B', text: 'Zooplâncton (consumidores primários)' },
      { letter: 'C', text: 'Peixes herbívoros (consumidores secundários)' },
      { letter: 'D', text: 'Grandes peixes carnívoros (topo de cadeia)' },
      { letter: 'E', text: 'Bactérias decompositoras de fundo' },
    ],
    correctLetter: 'D',
    explanation: 'Devido ao fenômeno da bioacumulação e biomagnificação trófica, compostos não biodegradáveis acumulam-se progressivamente ao longo dos níveis tróficos, atingindo sua maior concentração nos predadores de topo.',
  },
  {
    id: 4,
    area: 'Ciências Humanas e suas Tecnologias',
    subject: 'História',
    topic: 'Democracia Ateniense',
    source: 'ENEM Adaptado',
    text: 'Na Atenas clássica do século V a.C., o princípio da isegoria garantia a todos os cidadãos o direito de palavra na Eclésia (assembleia popular). No entanto, esse sistema possuía limites severos de participação, pois exclui:',
    options: [
      { letter: 'A', text: 'Apenas os estrangeiros (metecos)' },
      { letter: 'B', text: 'Mulheres, escravizados e estrangeiros residentes' },
      { letter: 'C', text: 'Homens livres nascidos fora da área urbana' },
      { letter: 'D', text: 'Soldados que não haviam combatido nas Guerras Médicas' },
      { letter: 'E', text: 'Proprietários de pequenas parcelas de terra' },
    ],
    correctLetter: 'B',
    explanation: 'A cidadania ateniense era altamente restritiva: apenas homens adultos livres, com mais de 18 ou 20 anos, filhos de pai e mãe atenienses tinham plenos direitos políticos. Mulheres, escravizados e metecos eram expressamente excluídos.',
  },
];

export const mockLessons: Record<string, LessonDetail> = {
  '1': {
    id: '1',
    title: 'Funções do 2º Grau: Vértice, Zeros e Aplicações no ENEM',
    subject: 'Matemática',
    teacher: 'Prof. Carlos Mendes',
    duration: '45 min',
    videoPlaceholder: 'Duração: 42:15 • Resolução de 8 questões modelo',
    summary: 'Aprenda a encontrar raízes pela fórmula de Bhaskara, interpretar o sinal do discriminante (delta), determinar coordenadas do vértice e resolver problemas práticos de máximos e mínimos.',
    topics: [
      { id: 't1', label: 'Definição e forma geral ax² + bx + c = 0', completed: true },
      { id: 't2', label: 'Cálculo do discriminante Δ e estudo dos zeros da função', completed: true },
      { id: 't3', label: 'Coordenadas do vértice: Xv e Yv para máximos e mínimos', completed: false },
      { id: 't4', label: 'Interpretação gráfica da parábola e concavidade', completed: false },
      { id: 't5', label: 'Modelagem de problemas reais frequentes no ENEM', completed: false },
    ],
    keyTakeaways: [
      'Se a > 0, concavidade para cima (possui ponto de mínimo: Yv = -Δ / 4a).',
      'Se a < 0, concavidade para baixo (possui ponto de máximo: Yv = -Δ / 4a).',
      'O tempo ou quantidade correspondente ao valor ótimo é sempre o Xv = -b / 2a.',
    ],
  },
};
