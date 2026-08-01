import React, { useState } from "react";
import { INITIAL_SALES_SCENARIOS } from "../data/initialData";
import { SalesScenario, RoleplayMessage, UserProgress } from "../types";
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  DollarSign, 
  Award, 
  CheckCircle, 
  TrendingUp, 
  User, 
  Sparkles,
  RefreshCw,
  AlertCircle
} from "lucide-react";

interface SalesRoleplayProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const SalesRoleplayEngine: React.FC<SalesRoleplayProps> = ({
  userProgress,
  setUserProgress,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<SalesScenario>(INITIAL_SALES_SCENARIOS[0]);
  const [userSpeechInput, setUserSpeechInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<RoleplayMessage[]>([
    {
      sender: "customer",
      text: `Hello there! I'm ${selectedScenario.customerPersona.name}. My handyman told me I could just split a breaker to add my EV charger, but my friend said I need a 200A panel upgrade. Why does your estimate say $3,800? That sounds really expensive!`,
      timestamp: "Just now",
    },
  ]);

  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [dealStatus, setDealStatus] = useState<string>("hesitant");
  const [lastFeedback, setLastFeedback] = useState<{
    strengths: string[];
    improvements: string[];
    necSafetyTip?: string;
  } | null>(null);

  const handleSelectScenario = (scen: SalesScenario) => {
    setSelectedScenario(scen);
    setMessages([
      {
        sender: "customer",
        text: `Hi electrician! I'm ${scen.customerPersona.name}. ${scen.customerPersona.primaryObjection}`,
        timestamp: "Just now",
      },
    ]);
    setCurrentScore(null);
    setDealStatus("hesitant");
    setLastFeedback(null);
  };

  const handleSendPitch = async () => {
    if (!userSpeechInput.trim() || loading) return;

    const userText = userSpeechInput;
    setUserSpeechInput("");

    const newHistory = [
      ...messages,
      { sender: "user" as const, text: userText, timestamp: "Just now" },
    ];
    setMessages(newHistory);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/sales-roleplay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: selectedScenario,
          customerPersona: selectedScenario.customerPersona,
          history: newHistory,
          userResponse: userText,
        }),
      });

      const data = await res.json();
      if (res.ok && data.customerReply) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "customer",
            text: data.customerReply,
            timestamp: "Just now",
          },
        ]);

        if (data.score) setCurrentScore(data.score);
        if (data.dealStatus) setDealStatus(data.dealStatus);
        if (data.feedback) setLastFeedback(data.feedback);

        if (data.dealStatus === "closed_won") {
          setUserProgress((prev) => ({
            ...prev,
            xp: prev.xp + 150,
            roleplaysCompleted: prev.roleplaysCompleted + 1,
            mockRevenue: prev.mockRevenue + selectedScenario.estimatedJobValue,
          }));
        }
      }
    } catch (err: any) {
      console.error("Failed to run sales roleplay:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">AI Customer Sales & Negotiation Roleplay</h2>
          </div>
          <p className="text-xs text-slate-300">
            Practice pitching electrical panel upgrades, EV chargers & generator hookups to realistic homeowner AI personas.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <div className="text-slate-400">Total Deals Closed</div>
            <div className="font-bold text-emerald-400">${userProgress.mockRevenue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Scenario Selector vs Roleplay Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Scenarios List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Roleplay Scenario</span>
          <div className="space-y-2.5">
            {INITIAL_SALES_SCENARIOS.map((scen) => {
              const isSelected = selectedScenario.id === scen.id;
              return (
                <button
                  key={scen.id}
                  onClick={() => handleSelectScenario(scen)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-emerald-500/15 border-emerald-500/50 text-white shadow-lg"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-400">${scen.estimatedJobValue.toLocaleString()} Job</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">{scen.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{scen.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{scen.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: AI Customer Chat & Live Feedback Engine (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Active Persona Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{selectedScenario.customerPersona.name}</h3>
                <p className="text-[11px] text-slate-400">{selectedScenario.customerPersona.personality}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {currentScore !== null && (
                <div className="text-center px-3 py-1 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Pitch Score</div>
                  <div className="text-sm font-black text-amber-400">{currentScore} / 100</div>
                </div>
              )}
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase border ${
                dealStatus === "closed_won"
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              }`}>
                {dealStatus.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 min-h-[260px] max-h-[360px] overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
                  }`}
                >
                  <div className="font-bold mb-1 text-[10px] opacity-75">
                    {msg.sender === "user" ? "You (Electrician)" : selectedScenario.customerPersona.name}
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-emerald-400 text-xs py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI Customer is formulating response & objection...</span>
              </div>
            )}
          </div>

          {/* AI Feedback Coach Box */}
          {lastFeedback && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2 shadow-lg">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Sales Coach Feedback:</span>
              </div>

              {lastFeedback.strengths.length > 0 && (
                <div className="text-emerald-400">
                  <span className="font-bold">Strengths: </span>
                  {lastFeedback.strengths.join(" • ")}
                </div>
              )}

              {lastFeedback.improvements.length > 0 && (
                <div className="text-amber-300">
                  <span className="font-bold">Suggested Pitch Improvement: </span>
                  {lastFeedback.improvements.join(" • ")}
                </div>
              )}

              {lastFeedback.necSafetyTip && (
                <div className="text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400">NEC Citation Tip to Close Sale: </span>
                  {lastFeedback.necSafetyTip}
                </div>
              )}
            </div>
          )}

          {/* Pitch Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPitch();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Type your professional pitch (e.g., 'Arthur, I understand $3,800 is a significant investment. Here is why safety and NEC code require 200A service...')"
              value={userSpeechInput}
              onChange={(e) => setUserSpeechInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={loading || !userSpeechInput.trim()}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition-all duration-150 flex items-center space-x-1.5 shrink-0 shadow-lg shadow-emerald-500/20"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Pitch Customer</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
