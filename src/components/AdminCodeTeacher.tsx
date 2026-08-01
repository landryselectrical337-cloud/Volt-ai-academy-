import React, { useState } from "react";
import { AdminCodeLesson, AdminChatMessage } from "../types";
import { 
  Code, 
  Terminal, 
  Sparkles, 
  Lock, 
  Unlock, 
  Play, 
  Send, 
  Loader2, 
  BookOpen, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle,
  Copy,
  RotateCcw
} from "lucide-react";

export const SAMPLE_ADMIN_LESSONS: AdminCodeLesson[] = [
  {
    id: "lesson-1",
    title: "Lesson 1: Functions = Relays & Contactors",
    category: "Coding Concepts for Electricians",
    electricalAnalogy: "A software function is like a 24V control relay: it receives a low-voltage trigger (arguments), processes the circuit logic, and energizes the output motor load (return value).",
    codeSnippet: `// Electrical Ohm's Law Calculator Function
function calculateVoltage(currentAmps: number, resistanceOhms: number): number {
  const voltage = currentAmps * resistanceOhms;
  return voltage;
}

// Triggering the function like closing a relay contactor
const voltage = calculateVoltage(10, 24);
console.log(\`Calculated Voltage: \${voltage} Volts\`);`,
    explanation: "Notice how `currentAmps` and `resistanceOhms` are parameters passed into the function, just like wiring inputs into a terminal strip. The `return` keyword sends the calculated result to whoever triggered the relay.",
    challengePrompt: "Try editing the function to calculate Power in Watts using P = V × I!",
    solutionCode: `function calculatePowerWatts(voltageVolts: number, currentAmps: number): number {
  return voltageVolts * currentAmps;
}`,
  },
  {
    id: "lesson-2",
    title: "Lesson 2: If/Else = Circuit Breaker Overload Protection",
    category: "Coding Concepts for Electricians",
    electricalAnalogy: "An `if` statement evaluates whether a condition is true or false, exactly like a thermal-magnetic breaker checking if circuit current exceeds the 80% continuous load threshold.",
    codeSnippet: `function checkCircuitSafety(measuredAmps: number, breakerRating: number): string {
  const maxSafeContinuousLoad = breakerRating * 0.8; // 80% NEC Rule
  
  if (measuredAmps > maxSafeContinuousLoad) {
    return "WARNING: Circuit overloaded! Continuous load exceeds 80% NEC rating.";
  } else {
    return "SAFE: Circuit within code limits.";
  }
}

console.log(checkCircuitSafety(18, 20));`,
    explanation: "The `if` condition checks if `measuredAmps > maxSafeContinuousLoad`. If TRUE, the warning branch executes. If FALSE, the safe branch executes.",
    challengePrompt: "Add an extra check for GFCI protection if the outlet is in a kitchen or bathroom!",
    solutionCode: `if (isWetLocation && !hasGfci) {
  return "DANGER: GFCI protection required by NEC 210.8!";
}`,
  },
  {
    id: "lesson-3",
    title: "Lesson 3: React State = Live Electrical Panel Voltage",
    category: "React & UI Basics",
    electricalAnalogy: "React State is like the active voltage on a main busbar. Whenever the voltage changes, every connected fixture (UI Component) automatically brightens, dims, or updates instantly without manual rewiring.",
    codeSnippet: `// Example of React useState hook in an Electrician App
import { useState } from "react";

function VoltageMonitor() {
  const [panelVoltage, setPanelVoltage] = useState(120);

  return (
    <div>
      <h3>Live Panel Voltage: {panelVoltage}V</h3>
      <button onClick={() => setPanelVoltage(240)}>Switch to 240V</button>
    </div>
  );
}`,
    explanation: "`useState(120)` sets the initial voltage state to 120V. When `setPanelVoltage(240)` is called, React re-renders the component to show 240V on the screen automatically.",
    challengePrompt: "How would you create a state variable to track if the main breaker is ON or OFF?",
    solutionCode: `const [isMainBreakerOn, setIsMainBreakerOn] = useState(true);`,
  },
  {
    id: "lesson-4",
    title: "Lesson 4: Empowering Youth & Apprentices with Code",
    category: "Building Trade Apps",
    electricalAnalogy: "Teaching young electricians basic coding combines physical job-site mastery with digital problem solving, making them high-earning tech-forward contractors.",
    codeSnippet: `// Simple apprentice quiz score engine
const apprenticeScores = [
  { name: "Jake", necScore: 95 },
  { name: "Tyler", necScore: 88 },
];

const topPerformers = apprenticeScores.filter(apprentice => apprentice.necScore >= 90);
console.log("Top Apprentices:", topPerformers);`,
    explanation: "By combining code logic with trade education, you empower the younger generation to build custom estimation software, solar calculators, and smart job-site tools.",
    challengePrompt: "Create an array of electrical tool items and filter out tools that require calibration!",
    solutionCode: `const tools = [{ name: "Torque Wrench", needsCalib: true }, { name: "Pliers", needsCalib: false }];`,
  }
];

export const AdminCodeTeacher: React.FC = () => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState(false);

  const [activeLesson, setActiveLesson] = useState<AdminCodeLesson>(SAMPLE_ADMIN_LESSONS[0]);
  const [activeTab, setActiveTab] = useState<"lessons" | "playground" | "ai-coach">("lessons");

  // Code Playground State
  const [userCode, setUserCode] = useState<string>(SAMPLE_ADMIN_LESSONS[0].codeSnippet);
  const [codeConsoleOutput, setCodeConsoleOutput] = useState<string>("");

  // AI Chat Coach State
  const [chatMessages, setChatMessages] = useState<AdminChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai_code_teacher",
      text: "Welcome Admin & Trade Educator! I am your AI Interactive Code Teacher. Ask me any programming question, request a custom coding exercise for your apprentices, or ask how web code connects to electrical engineering!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [userInputQuestion, setUserInputQuestion] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "admin" || passcode === "1234" || passcode === "admin123" || passcode === "") {
      setIsAdminUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleRunCode = () => {
    let logs: string[] = [];
    const originalConsoleLog = console.log;

    // Intercept console.log for live playground execution
    console.log = (...args: any[]) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));
      originalConsoleLog(...args);
    };

    try {
      // Evaluate JavaScript safely in client sandbox
      const runnableCode = userCode.replace(/export |import .*;|const \[.*\] = useState\(.*\);/g, "");
      // eslint-disable-next-line no-new-func
      const resultFn = new Function(runnableCode);
      const returnedVal = resultFn();

      if (returnedVal !== undefined) {
        logs.push(`Return Value: ${JSON.stringify(returnedVal)}`);
      }

      setCodeConsoleOutput(logs.length > 0 ? logs.join("\n") : "Code executed successfully with no console output.");
    } catch (err: any) {
      setCodeConsoleOutput(`Runtime Error: ${err.message}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  const handleSendAiQuestion = async (promptOverride?: string) => {
    const questionText = promptOverride || userInputQuestion;
    if (!questionText.trim()) return;

    const userMsg: AdminChatMessage = {
      id: `user-${Date.now()}`,
      sender: "admin",
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setUserInputQuestion("");
    setIsAiThinking(true);

    try {
      const res = await fetch("/api/ai/code-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questionText,
          currentTopic: activeLesson.title,
          userCodeSnippet: userCode,
        }),
      });

      const data = await res.json();
      if (res.ok && data.explanation) {
        const aiMsg: AdminChatMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai_code_teacher",
          text: `${data.explanation}\n\n💡 **Electrical Analogy:** ${data.electricalAnalogy || ""}`,
          codeSnippet: data.codeSnippet,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setChatMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || "Failed to reach AI Code Coach");
      }
    } catch (err: any) {
      const fallbackMsg: AdminChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai_code_teacher",
        text: `Here is a quick lesson: Software logic mirrors electrical control circuits! Functions act as relays, variables hold circuit values, and conditional loops monitor continuous loads.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAiThinking(false);
    }
  };

  if (!isAdminUnlocked) {
    return (
      <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl text-center">
        <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Admin & Teacher Restricted Access</h3>
          <p className="text-xs text-slate-400 mt-1">
            This module is designed for Master Electricians, Instructors, and Admin to learn interactive AI coding & empower young apprentices.
          </p>
        </div>

        <form onSubmit={handleUnlockAdmin} className="space-y-3">
          <input
            type="password"
            placeholder="Enter Admin Passcode (Default: admin)"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 text-center"
          />
          {passError && <p className="text-xs text-rose-400">Incorrect passcode. Try 'admin' or leave blank.</p>}
          <button
            type="submit"
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
          >
            <Unlock className="w-4 h-4" />
            <span>UNLOCK ADMIN CODE TEACHER</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-2">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Admin AI Interactive Code Teacher & Trade Educator Studio</h2>
          </div>
          <p className="text-xs text-slate-300">
            Learn software engineering using intuitive electrical trade analogies. Empower the next generation of tech-savvy electricians!
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab("lessons")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "lessons" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Curated Trade Lessons
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "playground" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Live JS/TS Playground
          </button>
          <button
            onClick={() => setActiveTab("ai-coach")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "ai-coach" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Ask AI Code Mentor
          </button>
        </div>
      </div>

      {/* TAB 1: CURATED TRADE CODE LESSONS */}
      {activeTab === "lessons" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left List of Lessons (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Electrician-to-Code Lessons</span>
            <div className="space-y-2.5">
              {SAMPLE_ADMIN_LESSONS.map((les) => {
                const isSelected = activeLesson.id === les.id;
                return (
                  <button
                    key={les.id}
                    onClick={() => {
                      setActiveLesson(les);
                      setUserCode(les.codeSnippet);
                      setCodeConsoleOutput("");
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/50 text-white shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                    }`}
                  >
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                      {les.category}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">{les.title}</h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Lesson Detail & Explanation (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{activeLesson.category}</span>
                <h3 className="text-lg font-bold text-white">{activeLesson.title}</h3>
              </div>

              {/* Electrical Metaphor Card */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl space-y-1 text-xs">
                <div className="flex items-center space-x-2 font-bold text-amber-400">
                  <Zap className="w-4 h-4" />
                  <span>Trade Electrical Analogy:</span>
                </div>
                <p className="text-amber-100 leading-relaxed">{activeLesson.electricalAnalogy}</p>
              </div>

              {/* Code Snippet Display */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Code Example:</span>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto">
                  {activeLesson.codeSnippet}
                </pre>
              </div>

              {/* Explanation */}
              <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-white">How it Works:</span>
                <p>{activeLesson.explanation}</p>
              </div>

              {/* Interactive Challenge Box */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-blue-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>Interactive Teacher Practice Challenge:</span>
                </div>
                <p className="text-xs text-slate-300">{activeLesson.challengePrompt}</p>
                <button
                  onClick={() => {
                    setActiveTab("playground");
                    setUserCode(activeLesson.codeSnippet);
                  }}
                  className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Try in Live Playground</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE JS/TS PLAYGROUND */}
      {activeTab === "playground" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Interactive JavaScript Code Sandbox</span>
              </div>
              <button
                onClick={handleRunCode}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>RUN CODE</span>
              </button>
            </div>

            <textarea
              rows={12}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-300 focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          {/* Console Output (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Console Terminal Output</h4>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 whitespace-pre-wrap min-h-[260px]">
              {codeConsoleOutput || "Click 'RUN CODE' to execute your TypeScript snippet."}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ASK AI CODE MENTOR CHAT */}
      {activeTab === "ai-coach" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl max-w-4xl mx-auto">
          <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">AI Interactive Code Teacher & Trade Mentor</h3>
          </div>

          {/* Messages Stream */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col space-y-1 ${
                  msg.sender === "admin" ? "items-end" : "items-start"
                }`}
              >
                <span className="text-[10px] text-slate-500">
                  {msg.sender === "admin" ? "Master Electrician / Admin" : "AI Code Teacher"} • {msg.timestamp}
                </span>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed max-w-2xl whitespace-pre-wrap ${
                    msg.sender === "admin"
                      ? "bg-amber-500 text-slate-950 font-medium"
                      : "bg-slate-950 border border-slate-800 text-slate-200"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.codeSnippet && (
                    <pre className="mt-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono overflow-x-auto text-[11px]">
                      {msg.codeSnippet}
                    </pre>
                  )}
                </div>
              </div>
            ))}

            {isAiThinking && (
              <div className="flex items-center space-x-2 text-xs text-amber-400 italic">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI Teacher is generating code explanation...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendAiQuestion();
            }}
            className="flex items-center space-x-2 pt-2 border-t border-slate-800"
          >
            <input
              type="text"
              placeholder="Ask any coding question (e.g., 'How do I teach apprentices about JSON data using electrical wire color codes?')"
              value={userInputQuestion}
              onChange={(e) => setUserInputQuestion(e.target.value)}
              disabled={isAiThinking}
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={isAiThinking || !userInputQuestion.trim()}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Ask Teacher</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
