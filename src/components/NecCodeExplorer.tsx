import React, { useState } from "react";
import { INITIAL_NEC_ARTICLES } from "../data/initialData";
import { NecArticle } from "../types";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Send, 
  Loader2, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  CheckCircle,
  ExternalLink
} from "lucide-react";

export const NecCodeExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<NecArticle | null>(INITIAL_NEC_ARTICLES[1]); // Default to NEC 210

  // Gemini AI Consultant Chat State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(
    "Ask me any NEC Code question, installation query, or field safety issue! I will cite exact NEC articles (210.8, 250.64, 310.16) and give practical master electrician field advice."
  );

  const categories = ["All", "General", "Wiring & Protection", "Wiring Methods", "Equipment", "Special Occupancies", "Calculations"];

  const filteredArticles = INITIAL_NEC_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch =
      art.articleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAskGemini = async (queryText?: string) => {
    const promptToSend = queryText || aiPrompt;
    if (!promptToSend.trim()) return;

    setAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch("/api/ai/nec-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: promptToSend,
          topic: selectedArticle ? `NEC Article ${selectedArticle.articleNumber} - ${selectedArticle.title}` : "NEC Code",
        }),
      });

      const data = await res.json();
      if (res.ok && data.response) {
        setAiResponse(data.response);
      } else {
        setAiResponse(`Error: ${data.error || "Failed to query NEC AI Consultant"}`);
      }
    } catch (err: any) {
      setAiResponse(`Failed to reach NEC AI Consultant: ${err.message}`);
    } finally {
      setAiLoading(false);
      if (!queryText) setAiPrompt("");
    }
  };

  const sampleQuestions = [
    "Can I run NM-B (Romex) cable inside PVC conduit in an outdoor wet location?",
    "How do I bond neutral and ground in a 200A residential subpanel vs main panel?",
    "What is the allowable ampacity for 10 AWG copper THHN at 75°C terminals under Table 310.16?",
    "Where is GFCI protection required in a commercial kitchen under NEC 210.8(B)?",
    "What is the maximum distance between Romex cable staples under NEC 334.30?"
  ];

  return (
    <div className="space-y-6 py-2">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">NEC 2026 Codebook & AI Master Consultant</h2>
          </div>
          <p className="text-xs text-slate-300">
            Interactive NFPA 70 reference library paired with AI-powered code consultation and exact section citations.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1.5 rounded-xl font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>NFPA 70 / OSHA Compliant Guidance</span>
        </div>
      </div>

      {/* Main Grid: Codebook Library vs AI Master Consultant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Searchable NEC Code Reference Library (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search Article, e.g. 210, GFCI, Grounding..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Article List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredArticles.map((art) => {
                const isSelected = selectedArticle?.id === art.id;
                return (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-150 ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/50 text-white shadow-md"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-400">NEC Article {art.articleNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{art.category}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-100">{art.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{art.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Article Details & Gemini AI Consultant Chat (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Selected Article Card */}
          {selectedArticle && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Article {selectedArticle.articleNumber}
                    </span>
                    <span className="text-xs text-slate-400">{selectedArticle.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedArticle.title}</h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{selectedArticle.summary}</p>

              {/* Key Sections Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Key Code Sections</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedArticle.keySections.map((sec, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-amber-300">NEC {sec.code}: {sec.title}</div>
                      <div className="text-[11px] text-slate-300 leading-snug">{sec.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Master Inspector Consultation Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Master Inspector Code Consultant</h3>
                  <p className="text-[11px] text-slate-400">Ask any code interpretation, installation safety rule, or formula</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                Gemini 3.6 Flash
              </span>
            </div>

            {/* Quick Sample Question Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400">Sample Field Queries:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskGemini(q)}
                    disabled={aiLoading}
                    className="text-[10px] bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors text-left"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {/* AI Response Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 min-h-[140px] leading-relaxed overflow-y-auto max-h-[300px]">
              {aiLoading ? (
                <div className="flex items-center justify-center space-x-2 py-8 text-amber-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-semibold text-xs">Consulting NEC Codebook & AI Inspector...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{aiResponse}</div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskGemini();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about NEC 2026 codes, box fill, conductor ampacity, or safety rules..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                disabled={aiLoading}
                className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={aiLoading || !aiPrompt.trim()}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition-all duration-150 flex items-center space-x-1.5 shrink-0"
              >
                {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Consult</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
