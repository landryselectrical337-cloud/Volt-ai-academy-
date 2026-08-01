import React, { useState } from "react";
import { TradeJokeQuote } from "../types";
import { 
  Smile, 
  Sparkles, 
  BookOpen, 
  Cross, 
  Send, 
  Loader2, 
  Heart, 
  RefreshCw, 
  Award, 
  Lightbulb,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

export const INITIAL_JOKES_QUOTES: TradeJokeQuote[] = [
  {
    id: "joke-1",
    category: "Joke",
    title: "Why Electricians are Great at Parties",
    content: "Why are electricians always invited to parties? Because they really know how to wire a room and light up the crowd!",
    sourceOrScripture: "Electrical Humor 101",
  },
  {
    id: "joke-2",
    category: "Joke",
    title: "The Apprentice & Ground Rod",
    content: "An apprentice was told to go buy a 'wire stretcher' and a 'left-handed conduit bender'. He came back 3 hours later with a box of donuts and said: 'Supply house was out, so I got these to energize the crew instead!'",
    sourceOrScripture: "Job Site Apprentice Pranks",
  },
  {
    id: "quote-1",
    category: "Motivational Quote",
    title: "Pride in Craftsmanship",
    content: "True electrical craftsmanship is doing clean, neat, code-compliant work inside a wall where no customer will ever see it. Real masters build for safety and integrity.",
    sourceOrScripture: "NEC Article 110.12 Workmanlike Manner",
  },
  {
    id: "christian-1",
    category: "Christian Principle",
    title: "Honest Measurements & Fair Pricing",
    content: "A false balance is an abomination to the Lord, but a just weight is His delight.",
    sourceOrScripture: "Proverbs 11:1",
    practicalApplication: "Never pad material estimates or bill for hours not worked. Godly contractors build long-term multi-generational businesses through unbending financial honesty.",
  },
  {
    id: "christian-2",
    category: "Christian Principle",
    title: "Craftsmanship as Service to the Lord",
    content: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    sourceOrScripture: "Colossians 3:23",
    practicalApplication: "Treat every residential panel wiring job or commercial conduit run as if you are building it for the Lord Himself. Excellence in trade is a living witness.",
  },
  {
    id: "christian-3",
    category: "Christian Principle",
    title: "Counting the Cost Before Building",
    content: "For which of you, intending to build a tower, does not sit down first and count the cost, whether he has enough to finish it?",
    sourceOrScripture: "Luke 14:28",
    practicalApplication: "Prudent contractors calculate overhead, material costs, and break-even labor rates before quoting, avoiding financial collapse and honoring commitments to clients.",
  }
];

export const TradeQuotesJokes: React.FC = () => {
  const [items, setItems] = useState<TradeJokeQuote[]>(INITIAL_JOKES_QUOTES);
  const [includeChristianPrinciples, setIncludeChristianPrinciples] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"All" | "Joke" | "Motivational Quote" | "Christian Principle">("All");

  const [loadingAi, setLoadingAi] = useState(false);

  const handleGenerateAiItem = async (mode: "joke" | "quote" | "christian") => {
    setLoadingAi(true);
    try {
      const res = await fetch("/api/ai/jokes-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          includeChristianPrinciples,
        }),
      });

      const data = await res.json();
      if (res.ok && data.content) {
        const newItem: TradeJokeQuote = {
          id: `ai-${Date.now()}`,
          category: data.category || (mode === "christian" ? "Christian Principle" : mode === "quote" ? "Motivational Quote" : "Joke"),
          title: data.title || "AI Trade Insight",
          content: data.content,
          sourceOrScripture: data.sourceOrScripture,
          practicalApplication: data.practicalApplication,
        };

        setItems((prev) => [newItem, ...prev]);
      }
    } catch (err) {
      console.error("Error generating AI joke/quote:", err);
    } finally {
      setLoadingAi(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (!includeChristianPrinciples && item.category === "Christian Principle") return false;
    if (activeFilter === "All") return true;
    return item.category === activeFilter;
  });

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Smile className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Trade Humor, Motivation & Christian Principles</h2>
          </div>
          <p className="text-xs text-slate-300">
            Enjoy daily electrician jokes, craftsmanship motivation, and biblical wisdom for ethical contractor leadership.
          </p>
        </div>

        {/* Toggle Christian Principles */}
        <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800 shrink-0">
          <Cross className="w-4 h-4 text-amber-400" />
          <div className="text-xs">
            <div className="text-slate-400">Christian Principles Option</div>
            <button
              onClick={() => setIncludeChristianPrinciples(!includeChristianPrinciples)}
              className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                includeChristianPrinciples ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-slate-800 text-slate-400"
              }`}
            >
              {includeChristianPrinciples ? "TOGGLE ON (Biblical Faith)" : "TOGGLE OFF"}
            </button>
          </div>
        </div>
      </div>

      {/* AI Generators & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(["All", "Joke", "Motivational Quote", "Christian Principle"] as const).map((cat) => {
            if (!includeChristianPrinciples && cat === "Christian Principle") return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === cat
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* AI Generator Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            disabled={loadingAi}
            onClick={() => handleGenerateAiItem("joke")}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5"
          >
            {loadingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
            <span>New AI Joke</span>
          </button>

          {includeChristianPrinciples && (
            <button
              disabled={loadingAi}
              onClick={() => handleGenerateAiItem("christian")}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1.5"
            >
              <Cross className="w-3.5 h-3.5" />
              <span>Biblical Principle</span>
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isChristian = item.category === "Christian Principle";
          const isJoke = item.category === "Joke";

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-5 space-y-3 border shadow-xl flex flex-col justify-between transition-all ${
                isChristian
                  ? "bg-amber-500/10 border-amber-500/40 text-slate-100"
                  : isJoke
                  ? "bg-slate-900 border-slate-800 text-slate-100"
                  : "bg-slate-900 border-slate-800 text-slate-100"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    isChristian
                      ? "bg-amber-400 text-slate-950 font-black"
                      : "bg-slate-800 text-amber-400 border border-amber-400/20"
                  }`}>
                    {item.category}
                  </span>
                  {item.sourceOrScripture && (
                    <span className="text-[10px] text-slate-400 italic font-medium">
                      {item.sourceOrScripture}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white">{item.title}</h3>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {item.practicalApplication && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-amber-200 leading-relaxed space-y-1">
                  <span className="font-bold text-amber-400 uppercase text-[10px]">Contractor Job Site Application:</span>
                  <p>{item.practicalApplication}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
