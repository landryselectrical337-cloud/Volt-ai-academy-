export type ActiveTab = 
  | "overview"
  | "nec-code"
  | "calculators"
  | "simulator"
  | "sales-roleplay"
  | "academy-slides"
  | "podcast-handsfree"
  | "low-voltage-pcb"
  | "trade-humor"
  | "volt-books"
  | "future-tech"
  | "admin-code-teacher"
  | "certificate"
  | "export-android";

export interface AdminCodeLesson {
  id: string;
  title: string;
  category: "Coding Concepts for Electricians" | "React & UI Basics" | "Node & Server Logic" | "Building Trade Apps";
  electricalAnalogy: string;
  codeSnippet: string;
  explanation: string;
  challengePrompt: string;
  solutionCode: string;
}

export interface AdminChatMessage {
  id: string;
  sender: "admin" | "ai_code_teacher";
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

export type TierLevel = 1 | 2 | 3 | 4;

export interface BadgeAward {
  id: string;
  name: string;
  iconName: string; // Lucide icon name or emoji
  category: "Safety" | "Code" | "Sales" | "Electronics" | "Faith & Business" | "Mastery";
  description: string;
  unlocked: boolean;
  dateEarned?: string;
  coinReward: number;
}

export interface UserProgress {
  name: string;
  tier: TierLevel;
  tierTitle: string; // e.g., "Apprentice - Year 1", "Journeyman Electrician", "Master Electrician", "Electrical Contractor & Owner"
  xp: number;
  coins: number;
  completedLessons: string[];
  passedQuizzes: string[];
  safetyBadges: string[];
  badges: BadgeAward[];
  simulationsCompleted: number;
  roleplaysCompleted: number;
  podcastsCompleted: number;
  mockRevenue: number;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  category: "Drive-Time NEC" | "Sales & Pitching" | "Low Voltage & PCB" | "Faith & Business" | "Job Site Safety";
  durationMinutes: number;
  speaker: string;
  audioSummary: string;
  transcript: string[];
  interactiveQuestion: {
    prompt: string;
    expectedKeywords: string[];
    sampleAnswer: string;
  };
}

export interface TradeJokeQuote {
  id: string;
  category: "Joke" | "Motivational Quote" | "Christian Principle";
  title: string;
  content: string;
  sourceOrScripture?: string;
  practicalApplication?: string;
}

export interface NecArticle {
  id: string;
  articleNumber: string;
  title: string;
  category: "General" | "Wiring & Protection" | "Wiring Methods" | "Equipment" | "Special Occupancies" | "Calculations";
  summary: string;
  commonRules: string[];
  keySections: { code: string; title: string; description: string }[];
}

export interface SalesScenario {
  id: string;
  title: string;
  description: string;
  category: "Residential Upgrade" | "EV Charger" | "Commercial" | "Emergency Generator" | "Smart Home";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedJobValue: number;
  customerPersona: {
    name: string;
    role: string;
    personality: string;
    primaryObjection: string;
    avatarUrl?: string;
  };
  keyCodesToMention: string[]; // e.g. ["NEC 230.79", "NEC 210.8"]
}

export interface RoleplayMessage {
  sender: "user" | "customer" | "ai_coach";
  text: string;
  timestamp: string;
  score?: number;
  feedback?: {
    strengths: string[];
    improvements: string[];
    necSafetyTip?: string;
  };
}

export interface SlideContent {
  slideNumber: number;
  title: string;
  bullets: string[];
  keyTakeaway: string;
  speakerNotes?: string;
  diagramType?: "wiring" | "panel" | "financial" | "sales";
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonDeck {
  id: string;
  title: string;
  category: "NEC Code" | "Safety & OSHA" | "Sales & Pitching" | "Business Mastery" | "Future Tech";
  tierLevel: TierLevel;
  durationMinutes: number;
  summary: string;
  videoUrl?: string; // e.g. YouTube embed or mp4 link
  slides: SlideContent[];
  quiz: QuizQuestion[];
  isCustom?: boolean;
}

export interface QuoteItem {
  id: string;
  description: string;
  category: "Labor" | "Materials" | "Permits" | "Subcontractor" | "Equipment";
  quantity: number;
  unitCost: number;
  markupPercent: number;
}

export interface ContractorMetrics {
  hourlyLaborRate: number;
  monthlyOverhead: number; // Van payment, insurance, licensing, shop rent, software
  workingHoursPerMonth: number;
  billableUtilizationPercent: number; // e.g. 65% billable hours
  targetProfitMarginPercent: number; // e.g. 25%
}
