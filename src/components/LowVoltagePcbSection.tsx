import React, { useState } from "react";
import { 
  Cpu, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  Flame, 
  Radio, 
  Wifi, 
  Power,
  RotateCcw
} from "lucide-react";

export const LowVoltagePcbSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"low-vol-rules" | "pcb-components" | "pcb-simulator">("low-vol-rules");

  // Low Voltage Voltage-Drop Calculator State
  const [circuitType, setCircuitType] = useState<"24vac_hvac" | "poe_cat6">("24vac_hvac");
  const [wireGauge, setWireGauge] = useState<number>(18); // 18 AWG standard thermostat wire
  const [distanceFeet, setDistanceFeet] = useState<number>(150);
  const [loadAmps, setLoadAmps] = useState<number>(1.5); // Thermostat contactor coil current

  // PCB Simulator State
  const [boardPowerOn, setBoardPowerOn] = useState(true);
  const [relayCoilState, setRelayCoilState] = useState<"energized" | "deenergized">("deenergized");
  const [diodeStatus, setDiodeStatus] = useState<"ok" | "shorted" | "open">("ok");
  const [boardFuseBlown, setBoardFuseBlown] = useState(false);
  const [diagnosticLog, setDiagnosticLog] = useState<string | null>(null);

  // Math for 24V / POE Voltage Drop
  const resistancePer1000Ft = wireGauge === 18 ? 6.51 : wireGauge === 22 ? 16.14 : wireGauge === 24 ? 25.67 : 2.57; // 18, 22, 24, 14 AWG
  const roundTripDistance = distanceFeet * 2;
  const totalResistance = (resistancePer1000Ft * roundTripDistance) / 1000;
  const voltageDropVolts = totalResistance * loadAmps;
  const sourceVoltage = circuitType === "24vac_hvac" ? 24 : 54; // 24VAC or 54V POE+
  const voltageAtLoad = sourceVoltage - voltageDropVolts;
  const dropPercent = (voltageDropVolts / sourceVoltage) * 100;

  const runPcbDiagnostic = () => {
    if (!boardPowerOn) {
      setDiagnosticLog("POWER OFF: 0.0V DC detected across board power rails.");
      return;
    }

    if (boardFuseBlown) {
      setDiagnosticLog("CRITICAL PCB FAULT: 3A Board Fuse BLOWN! 0V supplied to micro-controller & relay coils. Replace fuse & check 24V short.");
      return;
    }

    if (diodeStatus === "shorted") {
      setDiagnosticLog("DIODE SHORT CIRCUIT: Flyback protection diode shorted! High current drawing through relay coil circuit. Board Fuse will blow upon relay trigger.");
      setBoardFuseBlown(true);
      return;
    }

    if (diodeStatus === "open") {
      setDiagnosticLog("WARNING: Open Flyback Diode! High voltage inductive spike (>100V) detected when relay coil de-energizes. Risk of burning driver transistor.");
      return;
    }

    if (relayCoilState === "energized") {
      setDiagnosticLog("NORMAL OPERATION: 24V DC applied to Relay Coil. Normally Open (NO) contacts CLOSED. High-voltage 120V motor load energized!");
    } else {
      setDiagnosticLog("STANDBY: Relay Coil de-energized. Normally Open (NO) contacts open. Motor load idle.");
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Low Voltage Trades & Computer Circuit Board (PCB) Electronics</h2>
          </div>
          <p className="text-xs text-slate-300">
            Master NEC Article 725/760, 24V HVAC controls, Cat6 POE, and computer PCB electronics (relays, diodes, transistors, PLCs).
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveSubTab("low-vol-rules")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "low-vol-rules" ? "bg-blue-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            NEC 725 & Low Voltage
          </button>
          <button
            onClick={() => setActiveSubTab("pcb-components")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "pcb-components" ? "bg-blue-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            PCB Electronics
          </button>
          <button
            onClick={() => setActiveSubTab("pcb-simulator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "pcb-simulator" ? "bg-blue-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            PCB Diagnostic Simulator
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Low Voltage Trade Rules (NEC 725, 760, POE, HVAC 24V) */}
      {activeSubTab === "low-vol-rules" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Low Voltage Rules Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* NEC Article 725 Class 1, 2, 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white">NEC Article 725: Class 1, Class 2 & Class 3 Circuits</h3>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400">Class 2 Circuits (Power-Limited):</span>
                  <p>Considered safe from electrical shock and fire hazard under normal conditions (limited to 30V AC/DC, max 100VA). Used for thermostats, doorbell chimes, security sensors, and POE lighting.</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400">Class 3 Circuits:</span>
                  <p>Operates higher voltages (30V - 100V). Higher shock potential requires stricter conductor insulation ratings (CL3, CL3R riser, CL3P plenum).</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-rose-400">NEC 725.136 Separation Rule:</span>
                  <p>Class 2/3 low voltage cables MUST NOT be placed in the same raceway, outlet box, or junction box with Class 1 or 120V/240V power conductors unless separated by a physical barrier!</p>
                </div>
              </div>
            </div>

            {/* HVAC 24V Control & Cat6 Ethernet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs shadow-xl">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold border-b border-slate-800 pb-2">
                  <Flame className="w-4 h-4" />
                  <span>HVAC 24VAC Color Codes</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  <li><strong className="text-rose-400">R:</strong> 24VAC Power Feed from Transformer</li>
                  <li><strong className="text-blue-400">C:</strong> Common Return Wire</li>
                  <li><strong className="text-yellow-400">Y:</strong> Compressor Cooling Contactor</li>
                  <li><strong className="text-white">W:</strong> Heating Relay / Gas Valve</li>
                  <li><strong className="text-emerald-400">G:</strong> Indoor Blower Fan Relay</li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs shadow-xl">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
                  <Wifi className="w-4 h-4" />
                  <span>Structured Cabling & POE</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  <li><strong>T568B Standard:</strong> Orange/White, Orange, Green/White, Blue, Blue/White, Green, Brown/White, Brown.</li>
                  <li><strong>PoE Type 4 (802.3bt):</strong> Delivers up to 90 Watts over Cat6A for PTZ cameras & smart fixtures.</li>
                  <li><strong>NEC 725.144:</strong> Bundle heating ampacity adjustment for PoE cables.</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Low Voltage Voltage Drop Calculator (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Calculator className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Low Voltage Cable Voltage Drop Calculator</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Circuit Application</label>
                  <select
                    value={circuitType}
                    onChange={(e) => setCircuitType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  >
                    <option value="24vac_hvac">24VAC Thermostat & Contactor Circuit</option>
                    <option value="poe_cat6">54V DC Power Over Ethernet (PoE+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Wire Gauge (AWG)</label>
                  <select
                    value={wireGauge}
                    onChange={(e) => setWireGauge(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  >
                    <option value={18}>18 AWG (Standard Thermostat Cable)</option>
                    <option value={22}>22 AWG (Cat6 Pair)</option>
                    <option value={24}>24 AWG (Cat5e Pair)</option>
                    <option value={14}>14 AWG (Heavy Low Vol Feed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">One-Way Cable Run Length (Feet)</label>
                  <input
                    type="number"
                    value={distanceFeet}
                    onChange={(e) => setDistanceFeet(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Load Current (Amps)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={loadAmps}
                    onChange={(e) => setLoadAmps(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              {/* Voltage Drop Result Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Total Cable Resistance:</span>
                  <span className="font-bold text-amber-400">{totalResistance.toFixed(2)} Ω</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Voltage Drop (Volts):</span>
                  <span className={`font-bold ${dropPercent > 5 ? "text-rose-400" : "text-emerald-400"}`}>
                    {voltageDropVolts.toFixed(2)} V ({dropPercent.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-white">Voltage Available at Load:</span>
                  <span className="text-lg font-black text-blue-400">{voltageAtLoad.toFixed(2)} V</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Computer Circuit Board & PCB Electronics Fundamentals */}
      {activeSubTab === "pcb-components" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-amber-400 font-bold border-b border-slate-800 pb-2 text-sm">
              <Zap className="w-4 h-4" />
              <span>Resistors & Capacitors</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Resistors</strong> limit current flow and drop voltage across PCB nodes. 
              <strong>Capacitors</strong> store electrical charge, smooth out DC ripple from rectifiers, and provide initial starting phase torque for AC single-phase motors.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-blue-400 font-bold border-b border-slate-800 pb-2 text-sm">
              <Activity className="w-4 h-4" />
              <span>Diodes & Flyback Rectifiers</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Diodes</strong> allow current in ONE direction only. <strong>Bridge Rectifiers</strong> convert 24VAC to smooth 24VDC. 
              <strong>Flyback Diodes</strong> across relay coils absorb destructive back-EMF voltage spikes when coils switch off.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold border-b border-slate-800 pb-2 text-sm">
              <Cpu className="w-4 h-4" />
              <span>Transistors, Relays & PLCs</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Microcontrollers (5V/3.3V logic) trigger <strong>NPN Transistors or MOSFETs</strong>, which energize 24V <strong>Relay Coils</strong> to switch heavy 120V/240V motor loads.
            </p>
          </div>

        </div>
      )}

      {/* SUB-TAB 3: Interactive PCB Diagnostic Simulator */}
      {activeSubTab === "pcb-simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* PCB Control Panel (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white">Interactive Rooftop Unit (RTU) PCB Controller Board</span>
              </div>
              <button
                onClick={() => setBoardPowerOn(!boardPowerOn)}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  boardPowerOn ? "bg-emerald-500 text-slate-950" : "bg-rose-500/20 text-rose-300 border border-rose-500"
                }`}
              >
                {boardPowerOn ? "24V ON" : "BOARD OFF"}
              </button>
            </div>

            {/* Circuit Components Toggle */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-400">Microcontroller Output: Relay Coil Trigger</div>
                  <div className="text-[10px] text-slate-400">5V Logic to MOSFET Driver Gate</div>
                </div>
                <button
                  onClick={() => setRelayCoilState(relayCoilState === "energized" ? "deenergized" : "energized")}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
                >
                  Toggle Relay Coil ({relayCoilState})
                </button>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-400">Flyback Diode Status</div>
                  <div className="text-[10px] text-slate-400">1N4007 Protection Diode across Relay Coil</div>
                </div>
                <select
                  value={diodeStatus}
                  onChange={(e) => setDiodeStatus(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-white rounded-lg p-1.5"
                >
                  <option value="ok">Diode OK</option>
                  <option value="shorted">Diode SHORTED (0 Ω)</option>
                  <option value="open">Diode OPEN (No Back-EMF Protection)</option>
                </select>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-400">3A Board Fuse</div>
                  <div className="text-[10px] text-slate-400">Fast-acting Blade Fuse for 24VAC Secondary</div>
                </div>
                <button
                  onClick={() => setBoardFuseBlown(!boardFuseBlown)}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    boardFuseBlown ? "bg-rose-500/20 border border-rose-500 text-rose-300" : "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                  }`}
                >
                  {boardFuseBlown ? "FUSE BLOWN" : "FUSE GOOD"}
                </button>
              </div>
            </div>

            <button
              onClick={runPcbDiagnostic}
              className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>RUN LIVE PCB DIAGNOSTIC CHECK</span>
            </button>
          </div>

          {/* Diagnostic Log Output (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">PCB Diagnostic Telemetry Output</h4>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap min-h-[220px]">
              {diagnosticLog || "Click 'RUN LIVE PCB DIAGNOSTIC CHECK' to test board relay, diode, and fuse states."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
