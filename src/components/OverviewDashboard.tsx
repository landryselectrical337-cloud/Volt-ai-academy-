import React, { useState } from "react";
import { ActiveTab, UserProgress } from "../types";
import { 
  Zap, 
  BookOpen, 
  Calculator, 
  Cpu, 
  MessageSquare, 
  Tv, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  ShieldAlert, 
  TrendingUp, 
  Award,
  ArrowRight,
  Radio,
  Layers,
  Smile,
  Coins,
  GraduationCap
} from "lucide-react";

interface OverviewDashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  setActiveTab,
  userProgress,
  setUserProgress,
}) => {
  const [dailyQuizAnswer, setDailyQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const dailyQuestion = {
    question: "Under NEC 210.8(A), which residential location DOES NOT require GFCI protection for 125V, 15A/20A receptacles?",
    options: [
      "A) Outdoor porch receptacles",
      "B) Bathrooms and kitchens near sinks",
      "C) Dedicated single receptacle for a freezer in a living room",
      "D) Unfinished basements and crawl spaces"
    ],
    correctIndex: 2,
    explanation: "Receptacles in living room spaces generally do not require GFCI unless within 6 ft of a sink or liquid source, whereas outdoors, bathrooms, kitchens, basements, and crawl spaces mandate GFCI protection."
  };

  const handleQuizSubmit = (index: number) => {
    setDailyQuizAnswer(index);
    setQuizSubmitted(true);
    if (index === dailyQuestion.correctIndex && !userProgress.passedQuizzes.includes("daily-1")) {
      setUserProgress((prev) => ({
        ...prev,
        xp: prev.xp + 50,
        passedQuizzes: [...prev.passedQuizzes, "daily-1"],
      }));
    }
  };

  const quickLaunchPillars = [
    {
      id: "nec-code" as ActiveTab,
      title: "NEC 2026 AI Code Master",
      desc: "Instant article lookups, GFCI/AFCI rules, and grounding citations with AI Master Inspector.",
      icon: <BookOpen className="w-6 h-6 text-amber-400" />,
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
      buttonText: "Ask NEC AI Consultant",
    },
    {
      id: "podcast-handsfree" as ActiveTab,
      title: "Drive-Time Radio & Hands-Free Podcast",
      desc: "Hands-free voice lessons for driving. Listens to your spoken voice answers to earn Volt Coins!",
      icon: <Radio className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
      buttonText: "Launch Hands-Free Audio",
    },
    {
      id: "simulator" as ActiveTab,
      title: "Interactive Panel & Circuit Simulator",
      desc: "Wire switches, 240V breakers, subpanels & run live diagnostic short/open-neutral tests.",
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
      buttonText: "Launch Circuit Simulator",
    },
    {
      id: "low-voltage-pcb" as ActiveTab,
      title: "Low Voltage Trades & Computer PCB Boards",
      desc: "Master NEC 725/760, HVAC 24V thermostats, Cat6 POE, diodes, relays & circuit board troubleshooting.",
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
      buttonText: "Learn Low Vol & PCB",
    },
    {
      id: "sales-roleplay" as ActiveTab,
      title: "AI Customer Sales & Pitch Roleplay",
      desc: "Simulate homeowner pitches for 200A upgrades & EV chargers. Practice handling price objections.",
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
      buttonText: "Practice Sales Pitch",
    },
    {
      id: "trade-humor" as ActiveTab,
      title: "Electrician Humor, Motivation & Faith",
      desc: "Enjoy trade jokes, craftsmanship motivation, and biblical business principles for contractors.",
      icon: <Smile className="w-6 h-6 text-amber-300" />,
      color: "from-amber-400/20 to-amber-500/10 border-amber-400/30",
      buttonText: "View Jokes & Principles",
    },
    {
      id: "academy-slides" as ActiveTab,
      title: "Video & Slide Presentation Studio",
      desc: "Watch trade lessons, present slide decks to your crew, or create custom training decks.",
      icon: <Tv className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
      buttonText: "Watch & Present Lessons",
    },
    {
      id: "volt-books" as ActiveTab,
      title: "Volt Books AI: Accountant & Legal CFO",
      desc: "Calculate break-even hourly rates, generate quote agreements with legal contract disclaimers.",
      icon: <DollarSign className="w-6 h-6 text-yellow-400" />,
      color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
      buttonText: "Open Financial CFO",
    },
    {
      id: "future-tech" as ActiveTab,
      title: "Future Electrical Tech & AI Tools",
      desc: "Prepare for EV smart load centers, Solar BESS microgrids, and AI estimating software.",
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
      buttonText: "Explore Future Tech",
    },
    {
      id: "admin-code-teacher" as ActiveTab,
      title: "Admin AI Code Coach & Youth Educator",
      desc: "Admin-only interactive AI coding teacher. Learn basic TypeScript & React using electrical trade analogies to empower young apprentices.",
      icon: <GraduationCap className="w-6 h-6 text-amber-400" />,
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
      buttonText: "Launch Admin Code Teacher",
    },
  ];

  return (
    <div className="space-y-8 py-2">
      {/* Hero Welcome & Pathway Status */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Trade & Business Engine</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-amber-400">{userProgress.name}</span>!
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Grow from an entry-level apprentice to a licensed master electrician and a highly profitable electrical contractor business owner.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("nec-code")}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all duration-150 flex items-center space-x-2 shadow-lg shadow-amber-500/25"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start NEC Code Query</span>
              </button>
              <button
                onClick={() => setActiveTab("sales-roleplay")}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-all duration-150 flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Practice Customer Pitch</span>
              </button>
            </div>
          </div>

          {/* Tier Advancement Roadmap Card */}
          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Career Tier Advancement</span>
              <span className="text-xs font-bold text-amber-400">Tier {userProgress.tier} / 4</span>
            </div>

            <div className="space-y-2">
              {[
                { level: 1, title: "Apprentice - Fundamentals & Safety", xpNeeded: 0 },
                { level: 2, title: "Journeyman - NEC Code & Wiring", xpNeeded: 500 },
                { level: 3, title: "Master Electrician - Calculations", xpNeeded: 1000 },
                { level: 4, title: "Contractor - Business & Sales Owner", xpNeeded: 1500 },
              ].map((tier) => {
                const isCurrent = userProgress.tier === tier.level;
                const isPassed = userProgress.tier > tier.level;
                return (
                  <div
                    key={tier.level}
                    className={`flex items-center justify-between text-xs p-2 rounded-lg border ${
                      isCurrent
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold"
                        : isPassed
                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                        : "bg-slate-900/40 border-slate-800 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                      )}
                      <span>{tier.title}</span>
                    </div>
                    {isPassed && <span className="text-[10px] uppercase font-bold text-emerald-400">Unlocked</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Daily NEC & Safety Code Challenge */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Daily NEC Code & Safety Knowledge Check</h3>
          </div>
          <span className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2.5 py-1 rounded-full font-semibold">
            +50 XP Reward
          </span>
        </div>

        <p className="text-sm text-slate-200 font-medium">{dailyQuestion.question}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dailyQuestion.options.map((opt, idx) => {
            const isSelected = dailyQuizAnswer === idx;
            const isCorrect = idx === dailyQuestion.correctIndex;
            let btnClass = "bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-slate-600";

            if (quizSubmitted) {
              if (isCorrect) {
                btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
              } else if (isSelected) {
                btnClass = "bg-rose-500/20 border-rose-500 text-rose-300";
              } else {
                btnClass = "bg-slate-800/40 border-slate-800 text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => handleQuizSubmit(idx)}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all duration-150 flex items-center justify-between ${btnClass}`}
              >
                <span>{opt}</span>
                {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-2 shrink-0" />}
              </button>
            );
          })}
        </div>

        {quizSubmitted && (
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
            dailyQuizAnswer === dailyQuestion.correctIndex
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}>
            <p className="font-bold mb-1">
              {dailyQuizAnswer === dailyQuestion.correctIndex ? "Correct! +50 XP Awarded." : "Incorrect."}
            </p>
            <p className="text-slate-300">{dailyQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* 6 Core Academy Launch Pillars Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-tight">Interactive Training & Business Modules</h3>
          <span className="text-xs text-slate-400">Select any module to begin learning</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickLaunchPillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`bg-gradient-to-br ${pillar.color} bg-slate-900 rounded-2xl border p-5 flex flex-col justify-between hover:border-slate-600 transition-all duration-200 shadow-lg group hover:-translate-y-1`}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shadow-md">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-800/80 mt-4">
                <button
                  onClick={() => setActiveTab(pillar.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700/80 transition-all duration-150 flex items-center justify-center space-x-2"
                >
                  <span>{pillar.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
