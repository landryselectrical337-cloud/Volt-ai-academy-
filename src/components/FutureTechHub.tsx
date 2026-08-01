import React from "react";
import { Sparkles, Cpu, BatteryCharging, Sun, Zap, CheckCircle, ArrowRight } from "lucide-react";

export const FutureTechHub: React.FC = () => {
  const techModules = [
    {
      title: "EV Smart Load Management & V2G",
      icon: <BatteryCharging className="w-6 h-6 text-emerald-400" />,
      desc: "Bidirectional charging allows electric vehicles to power homes during grid power outages under NEC 705 and NEC 625.",
      keySkills: ["Dynamic Load Management (DLM)", "NEC 625.42 Load Limits", "OCS EV Charger Networking"],
    },
    {
      title: "Solar PV + BESS Battery Microgrids",
      icon: <Sun className="w-6 h-6 text-amber-400" />,
      desc: "Grid-tied solar with whole-home battery backup (Tesla Powerwall 3, Enphase IQ5P) requiring rapid shutdown under NEC 690.12.",
      keySkills: ["NEC 706 Battery Storage Systems", "Rapid Shutdown Compliance", "Automatic Transfer Switches"],
    },
    {
      title: "Smart Load Center Panels (SPAN / Lumin)",
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      desc: "Replacing traditional breaker panels with solid-state digital panels allowing app-controlled circuit shedding and remote diagnostics.",
      keySkills: ["Digital Breaker Programming", "Smart Load Shedding Rules", "Real-Time Power Telemetry"],
    },
    {
      title: "AI Bidding & Infrared Diagnostics",
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      desc: "Using AI computer vision to read electrical blueprints, estimate materials in minutes, and FLIR thermal imaging to spot hotspots.",
      keySkills: ["AI Blueprint Takeoffs", "FLIR Thermal Hotspot Inspections", "Predictive Maintenance"],
    },
  ];

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Future Electrical Technology & AI Prep Hub</h2>
          </div>
          <p className="text-xs text-slate-300">
            Prepare your electrical trade career and business for smart grid automation, EV microgrids, and AI estimating tools.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs px-3 py-1.5 rounded-xl font-semibold">
          <Zap className="w-4 h-4" />
          <span>Next-Gen Electrical Contractor</span>
        </div>
      </div>

      {/* Tech Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techModules.map((mod, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-slate-700 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-md">
                {mod.icon}
              </div>
              <h3 className="text-base font-bold text-white">{mod.title}</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{mod.desc}</p>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Key Future Competencies:</span>
              <div className="space-y-1.5">
                {mod.keySkills.map((sk, sIdx) => (
                  <div key={sIdx} className="flex items-center space-x-2 text-xs text-slate-200">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
