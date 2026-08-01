import React from "react";
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
  Award,
  ShieldAlert,
  Radio,
  Layers,
  Smile,
  Coins,
  GraduationCap,
  Smartphone
} from "lucide-react";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userProgress: UserProgress;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, userProgress }) => {
  const getTierBadgeColor = (tier: number) => {
    switch (tier) {
      case 1:
        return "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400";
      case 2:
        return "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-400";
      case 3:
        return "bg-purple-500/10 text-purple-600 border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-400";
      case 4:
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/30";
    }
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "overview", label: "Dashboard", icon: <Zap className="w-4 h-4" /> },
    { id: "nec-code", label: "NEC AI Master", icon: <BookOpen className="w-4 h-4" />, badge: "2026 Code" },
    { id: "podcast-handsfree", label: "Hands-Free Podcast", icon: <Radio className="w-4 h-4" />, badge: "Auto Drive" },
    { id: "calculators", label: "Trade Calculators", icon: <Calculator className="w-4 h-4" /> },
    { id: "simulator", label: "Panel Simulator", icon: <Cpu className="w-4 h-4" />, badge: "Interactive" },
    { id: "low-voltage-pcb", label: "Low Voltage & PCB", icon: <Layers className="w-4 h-4" /> },
    { id: "sales-roleplay", label: "Sales AI Roleplay", icon: <MessageSquare className="w-4 h-4" />, badge: "Interactive" },
    { id: "academy-slides", label: "Video & Slide Decks", icon: <Tv className="w-4 h-4" /> },
    { id: "trade-humor", label: "Jokes & Faith", icon: <Smile className="w-4 h-4" /> },
    { id: "volt-books", label: "Volt Books AI", icon: <DollarSign className="w-4 h-4" />, badge: "CFO & Legal" },
    { id: "future-tech", label: "Future Tech & AI", icon: <Sparkles className="w-4 h-4" /> },
    { id: "admin-code-teacher", label: "Admin AI Code Coach", icon: <GraduationCap className="w-4 h-4" />, badge: "Admin Only" },
    { id: "certificate", label: "Certificate", icon: <ShieldAlert className="w-4 h-4" />, badge: "Official" },
    { id: "export-android", label: "Android APK / aab", icon: <Smartphone className="w-4 h-4" />, badge: "Publish" },
  ];

  const xpForNextTier = userProgress.tier * 500;
  const progressPercent = Math.min(100, Math.round((userProgress.xp / xpForNextTier) * 100));

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-xl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40">
              <Zap className="w-6 h-6 fill-slate-950 stroke-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-sans">VoltPro AI</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 font-medium">
                  Electrician & Contractor Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Master Technical Skills • NEC Code • AI Sales Roleplay • Contractor Business Mastery
              </p>
            </div>
          </div>

          {/* User Tier, Progression & Volt Coins */}
          <div className="flex items-center space-x-4 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 shadow-inner">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${getTierBadgeColor(userProgress.tier)}`}>
                    Tier {userProgress.tier}: {userProgress.tierTitle}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300 mt-1">
                  <span>{userProgress.xp} XP</span>
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-[10px]">{progressPercent}%</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-700" />

            {/* Volt Coins Display */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-amber-400/10 border border-amber-400/30 rounded-lg text-amber-400 font-black text-xs">
              <Coins className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{userProgress.coins || 150} Coins</span>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-700" />

            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-slate-400 font-medium">Mock Business Rev</span>
              <span className="text-sm font-bold text-emerald-400">${userProgress.mockRevenue.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 mt-4 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800 pt-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                id={`nav-tab-${item.id}`}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    isActive ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-amber-400 border border-amber-400/20"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

