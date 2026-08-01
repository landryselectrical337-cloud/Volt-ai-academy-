import React, { useState } from "react";
import { 
  calculateVoltageDrop, 
  calculateBoxFill, 
  calculateResidentialService,
  VoltageDropInput,
  BoxFillItem,
  ResidentialLoadInput
} from "../utils/calculators";
import { Calculator, Zap, Box, Home, AlertTriangle, CheckCircle } from "lucide-react";

export const CalculatorsEngine: React.FC = () => {
  const [activeCalcTab, setActiveCalcTab] = useState<"voltage-drop" | "box-fill" | "service-load" | "ampacity">("voltage-drop");

  // Voltage Drop Inputs
  const [vdInput, setVdInput] = useState<VoltageDropInput>({
    phase: "1-phase",
    voltage: 120,
    current: 16, // 80% continuous load on 20A circuit
    distanceFt: 125,
    wireMaterial: "copper",
    wireSizeAWG: "12",
  });

  // Box Fill Inputs
  const [boxInput, setBoxInput] = useState<BoxFillItem>({
    conductors14AWG: 0,
    conductors12AWG: 6, // e.g. 2 power feeds + 1 switch leg
    conductors10AWG: 0,
    conductors8AWG: 0,
    receptaclesSwitchesCount: 2, // 2 yokes
    internalClampsCount: 1,
    supportFittingsCount: 0,
    groundingConductorsCount: 1,
  });

  // Service Load Inputs
  const [loadInput, setLoadInput] = useState<ResidentialLoadInput>({
    squareFeet: 2400,
    smallApplianceCircuits: 2,
    laundryCircuits: 1,
    rangeCooktopWattage: 12000,
    dryerWattage: 5000,
    waterHeaterWattage: 4500,
    acHeatWattage: 7200,
    evChargerWattage: 9600,
  });

  const vdResult = calculateVoltageDrop(vdInput);
  const boxResult = calculateBoxFill(boxInput);
  const loadResult = calculateResidentialService(loadInput);

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Electrical Trade & Sizing Calculators</h2>
          </div>
          <p className="text-xs text-slate-300">
            Instant NEC-compliant calculations for Voltage Drop, Box Fill Volume, Residential Service Loads, and Ampacities.
          </p>
        </div>

        {/* Calc Selector Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none">
          {[
            { id: "voltage-drop", label: "Voltage Drop", icon: <Zap className="w-3.5 h-3.5" /> },
            { id: "box-fill", label: "Box Fill (314.16)", icon: <Box className="w-3.5 h-3.5" /> },
            { id: "service-load", label: "Service Load (220.82)", icon: <Home className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCalcTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCalcTab === tab.id
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white hover:bg-slate-850"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator 1: Voltage Drop */}
      {activeCalcTab === "voltage-drop" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Voltage Drop Inputs</h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">System Phase</label>
                <select
                  value={vdInput.phase}
                  onChange={(e) => setVdInput({ ...vdInput, phase: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="1-phase">1-Phase (2 Wire)</option>
                  <option value="3-phase">3-Phase (3 Wire)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Nominal Voltage (V)</label>
                <select
                  value={vdInput.voltage}
                  onChange={(e) => setVdInput({ ...vdInput, voltage: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value={120}>120V</option>
                  <option value={208}>208V</option>
                  <option value={240}>240V</option>
                  <option value={277}>277V</option>
                  <option value={480}>480V</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Load Current (Amps)</label>
                <input
                  type="number"
                  value={vdInput.current}
                  onChange={(e) => setVdInput({ ...vdInput, current: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">One-Way Length (Feet)</label>
                <input
                  type="number"
                  value={vdInput.distanceFt}
                  onChange={(e) => setVdInput({ ...vdInput, distanceFt: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Wire Material</label>
                <select
                  value={vdInput.wireMaterial}
                  onChange={(e) => setVdInput({ ...vdInput, wireMaterial: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="copper">Copper (K = 12.9)</option>
                  <option value="aluminum">Aluminum (K = 21.2)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Conductor Gauge (AWG/kcmil)</label>
                <select
                  value={vdInput.wireSizeAWG}
                  onChange={(e) => setVdInput({ ...vdInput, wireSizeAWG: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {["14", "12", "10", "8", "6", "4", "3", "2", "1", "1/0", "2/0", "3/0", "4/0", "250", "350", "500"].map((s) => (
                    <option key={s} value={s}>{s} AWG/kcmil</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">Calculation Output</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                  vdResult.isNecCompliant 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                }`}>
                  {vdResult.isNecCompliant ? "NEC Compliant (≤3%)" : "Exceeds 3% VD Limit"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Voltage Drop</div>
                  <div className="text-xl font-black text-amber-400">{vdResult.dropVolts} Volts</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Percent Drop</div>
                  <div className={`text-xl font-black ${vdResult.isNecCompliant ? "text-emerald-400" : "text-rose-400"}`}>
                    {vdResult.dropPercent}%
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 col-span-2">
                  <div className="text-[11px] text-slate-400">Voltage at End of Load</div>
                  <div className="text-2xl font-bold text-white">{vdResult.remainingVolts} Volts</div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              vdResult.isNecCompliant 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-300"
            }`}>
              <div className="flex items-center space-x-2 font-bold mb-1">
                {vdResult.isNecCompliant ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>Master Electrician Recommendation</span>
              </div>
              <p>{vdResult.recommendation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 2: Box Fill */}
      {activeCalcTab === "box-fill" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Box Fill Inputs (NEC 314.16)</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">#14 AWG Conductors</label>
                <input
                  type="number"
                  value={boxInput.conductors14AWG}
                  onChange={(e) => setBoxInput({ ...boxInput, conductors14AWG: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">#12 AWG Conductors</label>
                <input
                  type="number"
                  value={boxInput.conductors12AWG}
                  onChange={(e) => setBoxInput({ ...boxInput, conductors12AWG: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Switches & Receptacles (Yokes)</label>
                <input
                  type="number"
                  value={boxInput.receptaclesSwitchesCount}
                  onChange={(e) => setBoxInput({ ...boxInput, receptaclesSwitchesCount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Internal Clamps</label>
                <input
                  type="number"
                  value={boxInput.internalClampsCount}
                  onChange={(e) => setBoxInput({ ...boxInput, internalClampsCount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-400 font-medium mb-1">Grounding Conductors (All Ground Wires Combined)</label>
                <select
                  value={boxInput.groundingConductorsCount}
                  onChange={(e) => setBoxInput({ ...boxInput, groundingConductorsCount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value={1}>1 or more ground wires present (Counts as 1 allowance)</option>
                  <option value={0}>0 ground wires</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Volume Required</h3>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center space-y-1">
                <div className="text-xs text-slate-400">Total Cubic Inches Required</div>
                <div className="text-3xl font-black text-amber-400">{boxResult.totalRequiredVolumeCuIn} cu. in.</div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span>Conductor Volume:</span>
                  <span className="font-bold">{boxResult.conductorVolume} cu. in.</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span>Switch/Receptacle Yokes Volume:</span>
                  <span className="font-bold">{boxResult.deviceVolume} cu. in.</span>
                </div>
                <div className="flex justify-between">
                  <span>Internal Clamps & Grounds:</span>
                  <span className="font-bold">{boxResult.clampVolume + boxResult.groundVolume} cu. in.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              <div className="font-bold mb-1">Recommended Box Enclosure:</div>
              <p className="text-white font-semibold">{boxResult.recommendedBox}</p>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 3: Residential Service Load */}
      {activeCalcTab === "service-load" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Service Load Inputs (NEC 220.82)</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Dwelling Area (Sq Ft)</label>
                <input
                  type="number"
                  value={loadInput.squareFeet}
                  onChange={(e) => setLoadInput({ ...loadInput, squareFeet: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">EV Charger Load (Watts)</label>
                <input
                  type="number"
                  value={loadInput.evChargerWattage}
                  onChange={(e) => setLoadInput({ ...loadInput, evChargerWattage: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Electric Range/Cooktop (W)</label>
                <input
                  type="number"
                  value={loadInput.rangeCooktopWattage}
                  onChange={(e) => setLoadInput({ ...loadInput, rangeCooktopWattage: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Electric Clothes Dryer (W)</label>
                <input
                  type="number"
                  value={loadInput.dryerWattage}
                  onChange={(e) => setLoadInput({ ...loadInput, dryerWattage: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-400 font-medium mb-1">HVAC AC / Electric Heat Load (Watts)</label>
                <input
                  type="number"
                  value={loadInput.acHeatWattage}
                  onChange={(e) => setLoadInput({ ...loadInput, acHeatWattage: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Service Sizing Result</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Total Calculated Load</div>
                  <div className="text-xl font-bold text-white">{loadResult.totalServiceVA} VA</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Calculated Amperage</div>
                  <div className="text-2xl font-black text-amber-400">{loadResult.totalServiceAmps} Amps</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
              <div className="font-bold">Recommended Service Main Panel Size:</div>
              <p className="text-lg font-black text-white">{loadResult.recommendedServiceAmps} Amp Main Service Panel</p>
              <p className="text-[10px] text-slate-400">{loadResult.necCitation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
