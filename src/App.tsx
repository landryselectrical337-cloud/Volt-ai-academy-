import React, { useState } from "react";
import { ActiveTab, UserProgress } from "./types";
import { Header } from "./components/Header";
import { OverviewDashboard } from "./components/OverviewDashboard";
import { NecCodeExplorer } from "./components/NecCodeExplorer";
import { CalculatorsEngine } from "./components/CalculatorsEngine";
import { CircuitPanelSimulator } from "./components/CircuitPanelSimulator";
import { SalesRoleplayEngine } from "./components/SalesRoleplayEngine";
import { AcademySlidePresenter } from "./components/AcademySlidePresenter";
import { PodcastHandsFree } from "./components/PodcastHandsFree";
import { LowVoltagePcbSection } from "./components/LowVoltagePcbSection";
import { TradeQuotesJokes } from "./components/TradeQuotesJokes";
import { VoltBooksAccountant } from "./components/VoltBooksAccountant";
import { FutureTechHub } from "./components/FutureTechHub";
import { AdminCodeTeacher } from "./components/AdminCodeTeacher";
import { CertificateGenerator } from "./components/CertificateGenerator";
import { PlayStoreExportGuide } from "./components/PlayStoreExportGuide";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  const [userProgress, setUserProgress] = useState<UserProgress>({
    name: "Alex Rivera",
    tier: 1,
    tierTitle: "Apprentice Electrician",
    xp: 250,
    coins: 150,
    completedLessons: ["deck-nec-fundamentals"],
    passedQuizzes: [],
    safetyBadges: ["OSHA-10", "NFPA-70E-Basic"],
    badges: [
      {
        id: "badge-1",
        name: "OSHA-10 Safety Certification",
        iconName: "ShieldCheck",
        category: "Safety",
        description: "Completed fundamental job site safety and LOTO protocol training.",
        unlocked: true,
        dateEarned: "2026-07-20",
        coinReward: 50,
      },
      {
        id: "badge-2",
        name: "Proverbs Contractor Shield",
        iconName: "Cross",
        category: "Faith & Business",
        description: "Committed to unbending financial honesty, fair quotes, and Christian stewardship.",
        unlocked: true,
        dateEarned: "2026-07-22",
        coinReward: 100,
      },
      {
        id: "badge-3",
        name: "Hands-Free Radio Operator",
        iconName: "Radio",
        category: "Mastery",
        description: "Completed drive-time interactive audio podcast quizzes while commuting.",
        unlocked: false,
        coinReward: 75,
      }
    ],
    simulationsCompleted: 3,
    roleplaysCompleted: 1,
    podcastsCompleted: 0,
    mockRevenue: 3800,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProgress={userProgress}
      />

      {/* Main App Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "overview" && (
          <OverviewDashboard
            setActiveTab={setActiveTab}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === "nec-code" && <NecCodeExplorer />}

        {activeTab === "podcast-handsfree" && (
          <PodcastHandsFree
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === "calculators" && <CalculatorsEngine />}

        {activeTab === "simulator" && <CircuitPanelSimulator />}

        {activeTab === "low-voltage-pcb" && <LowVoltagePcbSection />}

        {activeTab === "sales-roleplay" && (
          <SalesRoleplayEngine
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === "academy-slides" && (
          <AcademySlidePresenter
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === "trade-humor" && <TradeQuotesJokes />}

        {activeTab === "volt-books" && <VoltBooksAccountant />}

        {activeTab === "future-tech" && <FutureTechHub />}

        {activeTab === "admin-code-teacher" && <AdminCodeTeacher />}

        {activeTab === "certificate" && (
          <CertificateGenerator
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {activeTab === "export-android" && <PlayStoreExportGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 VoltPro AI Master Electrician Academy & Business Engine. Powered by Gemini 3.6 Flash AI.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">NEC 2026 Reference</span>
            <span>•</span>
            <span className="text-slate-400">NFPA 70E Arc Flash Safety</span>
            <span>•</span>
            <span className="text-slate-400">Contractor Legal Shield</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
