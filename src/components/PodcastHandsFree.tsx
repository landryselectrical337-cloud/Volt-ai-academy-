import React, { useState, useEffect, useRef } from "react";
import { UserProgress, PodcastEpisode } from "../types";
import { 
  Radio, 
  Play, 
  Pause, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Coins, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  Car, 
  Headphones, 
  RotateCcw,
  SkipForward,
  Zap
} from "lucide-react";

interface PodcastHandsFreeProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "ep-nec-drive",
    title: "Drive-Time NEC Code Mastery: GFCI & Grounding Rules",
    category: "Drive-Time NEC",
    durationMinutes: 12,
    speaker: "Master Inspector Marcus Vance",
    audioSummary: "Essential 2026 NEC Article 210.8 and Article 250 grounding rules explained while driving between job sites.",
    transcript: [
      "Welcome to VoltPro Drive-Time Radio, episode 101. Today we are breaking down NEC 210.8 GFCI protection changes for 2026.",
      "Remember: All 120V to 250V receptacles in kitchens, bathrooms, basements, outdoors, and garages must have GFCI protection.",
      "The biggest field error apprentices make is bonding neutral and ground in subpanels! Neutral and ground MUST stay isolated in all subpanels to prevent circulating parallel ground current.",
      "Let's test your knowledge hands-free! Here is your quick pop-quiz..."
    ],
    interactiveQuestion: {
      prompt: "Quick Hands-Free Check: Should the neutral wire and ground wire be bonded together inside a garage subpanel?",
      expectedKeywords: ["no", "never", "separate", "isolated", "float"],
      sampleAnswer: "No! Neutrals must float and remain isolated in subpanels under NEC 250.24.",
    },
  },
  {
    id: "ep-lowvol-pcb",
    title: "Low Voltage 24V Control Wiring & Computer PCB Fundamentals",
    category: "Low Voltage & PCB",
    durationMinutes: 15,
    speaker: "Tech Specialist Sarah Lin",
    audioSummary: "Master Class 2 HVAC 24V control circuits, Power Over Ethernet (PoE), and troubleshooting computer circuit boards & relays.",
    transcript: [
      "Hey tradesmen! In this episode we cover low voltage Article 725 and computer board diagnostics.",
      "Class 2 power-limited circuits operate under 30V and 100VA. Thermostats, doorbells, and PoE LED lighting fall under this rule.",
      "When inspecting a blown PCB board on a rooftop AC unit or generator controller, always test the 24V transformer coil resistance and check for shorted diodes.",
      "Pop-Quiz: What is the standard AC voltage supplied by a residential HVAC control transformer to the thermostat?"
    ],
    interactiveQuestion: {
      prompt: "Hands-Free Quiz: What is the typical AC control voltage for HVAC thermostat relays?",
      expectedKeywords: ["24", "24v", "24 volts", "twenty four"],
      sampleAnswer: "24 VAC is the standard control voltage for residential thermostats and contactor coils.",
    },
  },
  {
    id: "ep-sales-5k",
    title: "Closing $5,000 Service Panel Upgrades Hands-Free",
    category: "Sales & Pitching",
    durationMinutes: 18,
    speaker: "Contractor Coach Dave Miller",
    audioSummary: "How to overcome homeowner price objections when pitching 200A main service upgrades and EV wall chargers.",
    transcript: [
      "Electricians often undersell themselves because they focus on price instead of home safety and future power needs.",
      "When a homeowner says '$3,800 is too expensive', educate them on NEC code compliance, fire hazard reduction, and EV charger readiness.",
      "Frame the panel upgrade as a 30-year home infrastructure investment that increases resale value.",
      "Pop-Quiz: Name two key homeowner benefits to mention when pitching a 200A service panel upgrade."
    ],
    interactiveQuestion: {
      prompt: "Hands-Free Check: What is one major benefit of upgrading a 100A panel to 200A?",
      expectedKeywords: ["safety", "ev", "capacity", "value", "fire", "code"],
      sampleAnswer: "Prevents breaker tripping, adds capacity for EV chargers & AC, and increases home safety & property value.",
    },
  },
  {
    id: "ep-faith-integrity",
    title: "Faith, Integrity & Proverbs Business Principles for Contractors",
    category: "Faith & Business",
    durationMinutes: 14,
    speaker: "Brother Thomas, Master Contractor",
    audioSummary: "Applying Proverbs wisdom on honest measurements, customer stewardship, and Christian leadership on the job site.",
    transcript: [
      "Proverbs 11:1 reminds us: 'A false balance is an abomination to the Lord, but a just weight is His delight.'",
      "As Christian electrical contractors, fair pricing and truthful estimates build a godly reputation that outlasts any marketing campaign.",
      "When you work as unto the Lord (Colossians 3:23), your craftsmanship becomes a living testimony of integrity and excellence.",
      "Pop-Quiz: What scripture principle encourages contractors to do honest, top-quality work regardless of who is watching?"
    ],
    interactiveQuestion: {
      prompt: "Hands-Free Check: According to Colossians 3:23, how should a Christian tradesman approach their work on the job site?",
      expectedKeywords: ["lord", "heart", "god", "excellence", "integrity"],
      sampleAnswer: "Work with all your heart, as working for the Lord and not for human masters.",
    },
  }
];

export const PodcastHandsFree: React.FC<PodcastHandsFreeProps> = ({
  userProgress,
  setUserProgress,
}) => {
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(PODCAST_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [handsFreeAutoMode, setHandsFreeAutoMode] = useState(true);
  const [speechMuted, setSpeechMuted] = useState(false);

  // Hands-free Voice Interaction state
  const [isListeningForVoice, setIsListeningForVoice] = useState(false);
  const [voiceInputText, setVoiceInputText] = useState("");
  const [evaluatingResponse, setEvaluatingResponse] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Speak current line using SpeechSynthesis
  const speakLine = (text: string) => {
    if (!synthRef.current || speechMuted) return;

    synthRef.current.cancel(); // Stop prior speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (isPlaying && currentLineIndex < activeEpisode.transcript.length - 1) {
        setCurrentLineIndex((prev) => prev + 1);
      } else if (currentLineIndex === activeEpisode.transcript.length - 1) {
        // Reached end -> prompt question
        setIsPlaying(false);
        if (handsFreeAutoMode) {
          speakLine(activeEpisode.interactiveQuestion.prompt);
        }
      }
    };

    synthRef.current.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (synthRef.current) synthRef.current.cancel();
    } else {
      setIsPlaying(true);
      speakLine(activeEpisode.transcript[currentLineIndex] || activeEpisode.transcript[0]);
    }
  };

  const handleSelectEpisode = (ep: PodcastEpisode) => {
    if (synthRef.current) synthRef.current.cancel();
    setActiveEpisode(ep);
    setCurrentLineIndex(0);
    setIsPlaying(false);
    setVoiceFeedback(null);
    setVoiceInputText("");
  };

  // Simulate or execute Voice Reply
  const handleVoiceSubmit = async (spokenTextOverride?: string) => {
    const textToEvaluate = spokenTextOverride || voiceInputText;
    if (!textToEvaluate.trim()) return;

    setEvaluatingResponse(true);
    setVoiceInputText(textToEvaluate);

    try {
      const res = await fetch("/api/ai/podcast-handsfree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episodeTitle: activeEpisode.title,
          userVoiceTranscript: textToEvaluate,
          questionPrompt: activeEpisode.interactiveQuestion.prompt,
        }),
      });

      const data = await res.json();
      if (res.ok && data.spokenFeedback) {
        setVoiceFeedback(data.spokenFeedback);
        speakLine(data.spokenFeedback);

        const coinsToAdd = data.coinsEarned || 25;
        const xpToAdd = data.xpEarned || 50;

        setUserProgress((prev) => ({
          ...prev,
          xp: prev.xp + xpToAdd,
          coins: prev.coins + coinsToAdd,
          podcastsCompleted: prev.podcastsCompleted + 1,
        }));
      } else {
        // Fallback evaluation
        const lower = textToEvaluate.toLowerCase();
        const matches = activeEpisode.interactiveQuestion.expectedKeywords.some((kw) => lower.includes(kw));
        const fb = matches
          ? "Great answer! You demonstrated solid field knowledge. You earned +25 Volt Coins!"
          : `Good effort! The standard answer is: ${activeEpisode.interactiveQuestion.sampleAnswer}`;
        setVoiceFeedback(fb);
        speakLine(fb);

        setUserProgress((prev) => ({
          ...prev,
          xp: prev.xp + 50,
          coins: prev.coins + 25,
          podcastsCompleted: prev.podcastsCompleted + 1,
        }));
      }
    } catch (err) {
      console.error("Handsfree evaluation error:", err);
    } finally {
      setEvaluatingResponse(false);
      setIsListeningForVoice(false);
    }
  };

  const handleSimulateVoiceMic = () => {
    setIsListeningForVoice(true);
    // Auto-populate voice simulation for quick hands-free testing
    setTimeout(() => {
      const sampleSpoken = activeEpisode.interactiveQuestion.sampleAnswer;
      handleVoiceSubmit(sampleSpoken);
    }, 1500);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
            <h2 className="text-xl font-bold text-white">VoltPro Drive-Time Radio & Hands-Free Podcast Studio</h2>
          </div>
          <p className="text-xs text-slate-300">
            Listen to electrician lessons while driving or working hands-free. Speaks out loud via AI Speech Synthesis and accepts hands-free voice replies!
          </p>
        </div>

        {/* Hands-Free Mode Pill */}
        <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800 shrink-0">
          <Car className="w-5 h-5 text-amber-400" />
          <div className="text-xs">
            <div className="text-slate-400">Hands-Free Auto Mode</div>
            <button
              onClick={() => setHandsFreeAutoMode(!handsFreeAutoMode)}
              className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                handsFreeAutoMode ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-slate-800 text-slate-400"
              }`}
            >
              {handsFreeAutoMode ? "ENABLED (Drive Safe)" : "DISABLED"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Podcast Episodes Selector vs Active Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Episodes List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Drive-Time Episodes</span>
          <div className="space-y-2.5">
            {PODCAST_EPISODES.map((ep) => {
              const isSelected = activeEpisode.id === ep.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => handleSelectEpisode(ep)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-amber-500/15 border-amber-500/50 text-white shadow-lg"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                      {ep.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{ep.durationMinutes} mins</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{ep.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{ep.audioSummary}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Audio Player & Hands-Free Microphone Studio (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Audio Player Card */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  NOW PLAYING • {activeEpisode.speaker}
                </span>
                <h3 className="text-lg font-black text-white">{activeEpisode.title}</h3>
              </div>

              <button
                onClick={() => setSpeechMuted(!speechMuted)}
                className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-300 border border-slate-800"
                title={speechMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {speechMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
              </button>
            </div>

            {/* Audio Waveform Visualization Simulation */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex items-center justify-center space-x-1.5 h-20">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    isPlaying
                      ? "bg-amber-400 animate-pulse"
                      : "bg-slate-700"
                  }`}
                  style={{
                    height: isPlaying ? `${Math.floor(Math.random() * 40 + 15)}px` : "12px",
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>

            {/* Current Transcript Line Display */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Live Host Audio Line ({currentLineIndex + 1}/{activeEpisode.transcript.length}):</span>
              <p className="text-sm font-medium text-amber-200 leading-relaxed italic">
                "{activeEpisode.transcript[currentLineIndex] || activeEpisode.transcript[0]}"
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentLineIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentLineIndex === 0}
                className="px-3.5 py-2 bg-slate-900 text-slate-300 disabled:opacity-40 rounded-xl border border-slate-800 text-xs font-semibold flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Prev Line</span>
              </button>

              <button
                onClick={handlePlayPause}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950" />}
                <span>{isPlaying ? "PAUSE PODCAST" : "PLAY AUDIO"}</span>
              </button>

              <button
                onClick={() => setCurrentLineIndex((prev) => Math.min(activeEpisode.transcript.length - 1, prev + 1))}
                disabled={currentLineIndex === activeEpisode.transcript.length - 1}
                className="px-3.5 py-2 bg-slate-900 text-slate-300 disabled:opacity-40 rounded-xl border border-slate-800 text-xs font-semibold flex items-center space-x-1"
              >
                <span>Next Line</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hands-Free Voice Response Studio */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Mic className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Hands-Free Interactive Voice Check</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                +25 Volt Coins
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Podcast Host Question:</span>
              <p className="text-xs font-bold text-white">{activeEpisode.interactiveQuestion.prompt}</p>
            </div>

            {/* Voice Mic Trigger & Hands-Free Reply */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleSimulateVoiceMic}
                disabled={isListeningForVoice || evaluatingResponse}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
                  isListeningForVoice
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
                }`}
              >
                {evaluatingResponse ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
                <span>{isListeningForVoice ? "Listening to Your Voice..." : "SPEAK HANDS-FREE ANSWER"}</span>
              </button>

              <span className="text-[11px] text-slate-500">or type answer below:</span>
            </div>

            {/* Manual Text Fallback Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVoiceSubmit();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Type spoken response (e.g., 'No, neutrals must remain floating in subpanels')"
                value={voiceInputText}
                onChange={(e) => setVoiceInputText(e.target.value)}
                disabled={evaluatingResponse}
                className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={evaluatingResponse || !voiceInputText.trim()}
                className="px-4 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Submit
              </button>
            </form>

            {/* Voice Feedback Display */}
            {voiceFeedback && (
              <div className="bg-slate-950 border border-emerald-500/40 p-4 rounded-xl text-xs text-emerald-300 font-medium space-y-2">
                <div className="flex items-center space-x-2 font-bold text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Radio Host Feedback:</span>
                </div>
                <p className="leading-relaxed">{voiceFeedback}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
