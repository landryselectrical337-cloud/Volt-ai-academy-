import React, { useState } from "react";
import { 
  Cpu, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Power, 
  RotateCcw,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";

interface CircuitBreaker {
  id: string;
  label: string;
  ratingAmps: number;
  poles: 1 | 2;
  type: "Standard" | "GFCI" | "AFCI" | "Main";
  isTripped: boolean;
  wireGauge: string;
  connectedLoad: string;
  hasFault: boolean;
  faultType?: "short_circuit" | "open_neutral" | "reverse_polarity" | "overload" | "subpanel_bonded";
}

export const CircuitPanelSimulator: React.FC = () => {
  const [mainBreakerOn, setMainBreakerOn] = useState(true);
  const [subpanelNeutralIsolated, setSubpanelNeutralIsolated] = useState(true); // Default correct NEC state
  const [lotoVerified, setLotoVerified] = useState(false);

  const [breakers, setBreakers] = useState<CircuitBreaker[]>([
    {
      id: "brk-1",
      label: "Breaker 1: Bedroom AFCI",
      ratingAmps: 15,
      poles: 1,
      type: "AFCI",
      isTripped: false,
      wireGauge: "14 AWG",
      connectedLoad: "Bedroom Receptacles & Lights (4A load)",
      hasFault: false,
    },
    {
      id: "brk-2",
      label: "Breaker 2: Kitchen GFCI",
      ratingAmps: 20,
      poles: 1,
      type: "GFCI",
      isTripped: false,
      wireGauge: "12 AWG",
      connectedLoad: "Kitchen Countertop Receptacles (12A load)",
      hasFault: false,
    },
    {
      id: "brk-3",
      label: "Breaker 3: 3-Way Hallway Lighting",
      ratingAmps: 15,
      poles: 1,
      type: "Standard",
      isTripped: false,
      wireGauge: "14 AWG",
      connectedLoad: "Hallway 3-Way Switches & Lighting",
      hasFault: false,
    },
    {
      id: "brk-4",
      label: "Breaker 4 & 6: 240V AC Unit",
      ratingAmps: 30,
      poles: 2,
      type: "Standard",
      isTripped: false,
      wireGauge: "10 AWG",
      connectedLoad: "Central AC Compressor (22A load)",
      hasFault: false,
    },
    {
      id: "brk-5",
      label: "Breaker 5 & 7: 60A Workshop Subpanel Feed",
      ratingAmps: 60,
      poles: 2,
      type: "Standard",
      isTripped: false,
      wireGauge: "6 AWG THHN",
      connectedLoad: "Garage Subpanel Feed",
      hasFault: false,
    },
  ]);

  const [activeFaultScenario, setActiveFaultScenario] = useState<string>("none");
  const [diagnosticReport, setDiagnosticReport] = useState<string | null>(null);

  const toggleBreaker = (id: string) => {
    setBreakers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isTripped: !b.isTripped } : b))
    );
  };

  const applyFaultScenario = (scenario: string) => {
    setActiveFaultScenario(scenario);
    setDiagnosticReport(null);

    setBreakers((prev) =>
      prev.map((b) => {
        if (scenario === "short_circuit" && b.id === "brk-1") {
          return { ...b, hasFault: true, faultType: "short_circuit" };
        }
        if (scenario === "open_neutral" && b.id === "brk-2") {
          return { ...b, hasFault: true, faultType: "open_neutral" };
        }
        if (scenario === "overload" && b.id === "brk-3") {
          return { ...b, hasFault: true, faultType: "overload" };
        }
        return { ...b, hasFault: false, faultType: undefined };
      })
    );

    if (scenario === "subpanel_bonded") {
      setSubpanelNeutralIsolated(false); // Non-compliant subpanel neutral bonded
    } else {
      setSubpanelNeutralIsolated(true);
    }
  };

  const runDiagnosticCheck = () => {
    if (!mainBreakerOn) {
      setDiagnosticReport("PANEL IS DE-ENERGIZED: Main Breaker is OFF. No voltage output across busbars.");
      return;
    }

    const faultsFound: string[] = [];

    if (!subpanelNeutralIsolated) {
      faultsFound.push(
        "CRITICAL NEC VIOLATION (250.24): Workshop Subpanel neutral bus is BONDED to ground! Neutral current is flowing through metallic subpanel enclosure and ground wire. Float the subpanel neutral immediately!"
      );
    }

    breakers.forEach((b) => {
      if (!b.isTripped) {
        if (b.hasFault && b.faultType === "short_circuit") {
          faultsFound.push(
            `SHORT CIRCUIT DETECTED on ${b.label}: Hot phase wire contacting Ground/Neutral. High fault current triggered thermal-magnetic trip!`
          );
          toggleBreaker(b.id); // Auto-trip
        } else if (b.hasFault && b.faultType === "open_neutral") {
          faultsFound.push(
            `OPEN NEUTRAL DETECTED on ${b.label}: Receptacle voltage floating. Connected 120V devices operating improperly or receiving zero return path.`
          );
        } else if (b.hasFault && b.faultType === "overload") {
          faultsFound.push(
            `CIRCUIT OVERLOAD on ${b.label}: Connected load exceeds 15A rating on 14 AWG conductor. Risk of wire overheating!`
          );
        }
      }
    });

    if (faultsFound.length === 0) {
      setDiagnosticReport(
        "ALL CIRCUITS NORMAL & NEC COMPLIANT! System operating at nominal 120V/240V with proper grounding, bonding isolation, and AFCI/GFCI protection."
      );
    } else {
      setDiagnosticReport(faultsFound.join("\n\n"));
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Interactive 200A Electrical Panel & Circuit Simulator</h2>
          </div>
          <p className="text-xs text-slate-300">
            Simulate 120V/240V branch wiring, GFCI/AFCI breakers, subpanels, ground bonding, and test fault diagnostics.
          </p>
        </div>

        <button
          onClick={runDiagnosticCheck}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-150 flex items-center space-x-2 shrink-0"
        >
          <Activity className="w-4 h-4" />
          <span>RUN LIVE DIAGNOSTIC CHECK</span>
        </button>
      </div>

      {/* Main Grid: Virtual Panel Enclosure vs Fault Simulator & NFPA 70E Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: 200A Panel Enclosure Visualization (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">200A Main Service Panel Enclosure (Square D NEMA 1)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${mainBreakerOn ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
              <span className="text-[11px] font-bold text-slate-300">{mainBreakerOn ? "ENERGIZED (240V)" : "DE-ENERGIZED"}</span>
            </div>
          </div>

          {/* Main Disconnect Breaker */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-400">200A MAIN SERVICE DISCONNECT</div>
              <div className="text-[10px] text-slate-400">NEC 230.70 • Phase A & Phase B Busbar Feed</div>
            </div>
            <button
              onClick={() => setMainBreakerOn(!mainBreakerOn)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                mainBreakerOn
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-rose-500/20 border border-rose-500 text-rose-300"
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{mainBreakerOn ? "MAIN ON" : "MAIN TRIPPED / OFF"}</span>
            </button>
          </div>

          {/* Busbars & Neutral Ground Bars */}
          <div className="grid grid-cols-2 gap-3 text-[10px]">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-300">Neutral Busbar:</span>
              <span className="text-slate-400 ml-1">Main Service Bonded to Ground Rod</span>
            </div>
            <div className={`p-2.5 rounded-lg border ${
              subpanelNeutralIsolated
                ? "bg-slate-900 border-slate-800 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/40 text-rose-300 font-bold"
            }`}>
              <span>Subpanel Neutral Status: </span>
              <span>{subpanelNeutralIsolated ? "FLOATING (NEC Compliant)" : "ILLEGALLY BONDED!"}</span>
            </div>
          </div>

          {/* Branch Breaker Slots List */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Branch Circuit Breakers</span>
            <div className="space-y-2">
              {breakers.map((b) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    b.isTripped || !mainBreakerOn
                      ? "bg-slate-900/60 border-slate-800 text-slate-400 opacity-75"
                      : b.hasFault
                      ? "bg-rose-500/10 border-rose-500/40 text-white"
                      : "bg-slate-900 border-slate-800 text-slate-100"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-amber-400">{b.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {b.poles === 2 ? "2-Pole 240V" : "1-Pole 120V"}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        {b.wireGauge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{b.connectedLoad}</div>
                  </div>

                  <button
                    onClick={() => toggleBreaker(b.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      b.isTripped
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                        : "bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
                    }`}
                  >
                    {b.isTripped ? "TRIPPED" : "CLOSED (ON)"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Fault Injection & Safety Protocol Drill (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Fault Injector Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Diagnostic Fault Simulator</h3>
            </div>

            <p className="text-xs text-slate-300">
              Inject common field wiring defects to see how NEC protection devices respond during diagnostic testing:
            </p>

            <div className="space-y-2">
              {[
                { id: "none", label: "No Faults (Normal Operation)" },
                { id: "short_circuit", label: "Hot-to-Ground Short Circuit on Brk 1" },
                { id: "open_neutral", label: "Open Neutral Floating Circuit on Brk 2" },
                { id: "subpanel_bonded", label: "Subpanel Neutral Illegal Bond Violation" },
                { id: "overload", label: "Overloaded Branch Circuit on Brk 3" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => applyFaultScenario(s.id)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    activeFaultScenario === s.id
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Diagnostic Output Card */}
          {diagnosticReport && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Diagnostic Analysis Output</h4>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                {diagnosticReport}
              </div>
            </div>
          )}

          {/* NFPA 70E Arc Flash Safety Check */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">NFPA 70E & OSHA Safety Drill</h3>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lotoVerified}
                  onChange={(e) => setLotoVerified(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400"
                />
                <span>Lockout/Tagout (LOTO) padlocked & test meter verified (3-Point Live-Dead-Live)</span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
