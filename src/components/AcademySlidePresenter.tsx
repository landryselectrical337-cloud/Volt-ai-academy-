import React, { useState } from "react";
import { INITIAL_LESSON_DECKS } from "../data/initialData";
import { LessonDeck, UserProgress } from "../types";
import { 
  Tv, 
  Play, 
  PlusCircle, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Award
} from "lucide-react";

interface AcademyProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const AcademySlidePresenter: React.FC<AcademyProps> = ({
  userProgress,
  setUserProgress,
}) => {
  const [decks, setDecks] = useState<LessonDeck[]>(INITIAL_LESSON_DECKS);
  const [activeDeck, setActiveDeck] = useState<LessonDeck>(INITIAL_LESSON_DECKS[0]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // New Lesson Generator AI Form
  const [customTopic, setCustomTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);

  // Quiz State
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentSlide = activeDeck.slides[currentSlideIndex] || activeDeck.slides[0];

  const handleGenerateCustomDeck = async () => {
    if (!customTopic.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: customTopic,
          tierLevel: userProgress.tier,
        }),
      });

      const data = await res.json();
      if (res.ok && data.slides) {
        const newDeck: LessonDeck = {
          id: `custom-${Date.now()}`,
          title: data.title || customTopic,
          category: data.category || "Business Mastery",
          tierLevel: userProgress.tier,
          durationMinutes: 15,
          summary: data.summary || "Custom AI Generated Training Deck",
          slides: data.slides,
          quiz: data.quiz || [],
          isCustom: true,
        };

        setDecks((prev) => [newDeck, ...prev]);
        setActiveDeck(newDeck);
        setCurrentSlideIndex(0);
        setCustomTopic("");
        setShowGeneratorModal(false);
      }
    } catch (err) {
      console.error("Failed to generate lesson deck:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuizAnswer = (qIdx: number, aIdx: number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [qIdx]: aIdx }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    activeDeck.quiz.forEach((q, idx) => {
      if (selectedQuizAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount > 0) {
      setUserProgress((prev) => ({
        ...prev,
        xp: prev.xp + correctCount * 50,
      }));
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Tv className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Video & Interactive Presentation Studio</h2>
          </div>
          <p className="text-xs text-slate-300">
            Present trade slide decks to your apprentices, watch video lessons, or generate custom AI presentation decks.
          </p>
        </div>

        <button
          onClick={() => setShowGeneratorModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center space-x-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Create AI Slide Deck</span>
        </button>
      </div>

      {/* Main Grid: Decks Selector vs Active Slide Presenter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Decks Catalog (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lesson Decks Catalog</span>
          <div className="space-y-2.5">
            {decks.map((deck) => {
              const isSelected = activeDeck.id === deck.id;
              return (
                <button
                  key={deck.id}
                  onClick={() => {
                    setActiveDeck(deck);
                    setCurrentSlideIndex(0);
                    setQuizSubmitted(false);
                    setSelectedQuizAnswers({});
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-purple-500/15 border-purple-500/50 text-white shadow-lg"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                      {deck.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{deck.durationMinutes} mins</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{deck.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{deck.summary}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Slide Deck Presenter (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Slide Deck Canvas Stage */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative min-h-[380px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  {activeDeck.category} • Tier {activeDeck.tierLevel}
                </span>
                <h3 className="text-lg font-extrabold text-white">{activeDeck.title}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                Slide {currentSlideIndex + 1} / {activeDeck.slides.length}
              </span>
            </div>

            {/* Slide Body */}
            <div className="space-y-4 my-auto py-2">
              <h4 className="text-xl font-bold text-amber-300">{currentSlide.title}</h4>
              <ul className="space-y-2.5">
                {currentSlide.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs md:text-sm text-slate-200 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium">
                <span className="font-bold">Key Takeaway: </span>
                {currentSlide.keyTakeaway}
              </div>
            </div>

            {/* Instructor Speaker Notes */}
            {currentSlide.speakerNotes && (
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span className="font-bold text-amber-400">Instructor Speaker Notes: </span>
                {currentSlide.speakerNotes}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Slide</span>
              </button>

              <button
                disabled={currentSlideIndex === activeDeck.slides.length - 1}
                onClick={() => setCurrentSlideIndex((prev) => Math.min(activeDeck.slides.length - 1, prev + 1))}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 text-xs font-bold rounded-xl flex items-center space-x-1 shadow-md shadow-amber-500/20"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Crew Knowledge Check Quiz */}
          {activeDeck.quiz.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">Crew Knowledge Check Quiz</h3>
                <span className="text-xs text-amber-400 font-bold">+50 XP Per Correct Answer</span>
              </div>

              <div className="space-y-4">
                {activeDeck.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-white">{qIdx + 1}. {q.question}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, aIdx) => {
                        const isSelected = selectedQuizAnswers[qIdx] === aIdx;
                        const isCorrect = aIdx === q.correctIndex;
                        let btnClass = "bg-slate-900 border-slate-800 text-slate-300";

                        if (quizSubmitted) {
                          if (isCorrect) btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                          else if (isSelected) btnClass = "bg-rose-500/20 border-rose-500 text-rose-300";
                        } else if (isSelected) {
                          btnClass = "bg-purple-500/20 border-purple-500 text-purple-300 font-bold";
                        }

                        return (
                          <button
                            key={aIdx}
                            onClick={() => handleQuizAnswer(qIdx, aIdx)}
                            disabled={quizSubmitted}
                            className={`p-2.5 rounded-lg border text-xs text-left transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  Submit Crew Quiz & Claim XP
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center">
                  Quiz Submitted! XP Added to Your Profile.
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* AI Slide Deck Generator Modal */}
      {showGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Generate Custom Lesson Deck</h3>
              <button onClick={() => setShowGeneratorModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300">
              Enter any electrical topic, business setup subject, or equipment training (e.g., "Generac Transfer Switches", "Subcontractor Contracts").
            </p>

            <input
              type="text"
              placeholder="e.g., EV Charger Sizing & Load Calculation"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                disabled={isGenerating || !customTopic.trim()}
                onClick={handleGenerateCustomDeck}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center space-x-2"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Generate Deck</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
