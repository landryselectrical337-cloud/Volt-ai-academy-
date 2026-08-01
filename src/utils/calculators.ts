// Electrical Engineering Calculators based on NEC Rules

export interface VoltageDropInput {
  phase: "1-phase" | "3-phase";
  voltage: number; // e.g. 120, 240, 208, 480
  current: number; // Amps
  distanceFt: number; // One-way distance in feet
  wireMaterial: "copper" | "aluminum";
  wireSizeAWG: string; // e.g. "14", "12", "10", "8", "6", "4", "2", "1/0", "2/0", "3/0", "4/0", "250", "350", "500"
}

// Circular Mil Area table (NEC Ch 9 Table 8)
const CIRCULAR_MILS: Record<string, number> = {
  "14": 4110,
  "12": 6530,
  "10": 10380,
  "8": 16510,
  "6": 26240,
  "4": 41740,
  "3": 52620,
  "2": 66360,
  "1": 83690,
  "1/0": 105600,
  "2/0": 133100,
  "3/0": 167800,
  "4/0": 211600,
  "250": 250000,
  "350": 350000,
  "500": 500000,
};

export function calculateVoltageDrop(input: VoltageDropInput) {
  const k = input.wireMaterial === "copper" ? 12.9 : 21.2; // Resistivity constant
  const cm = CIRCULAR_MILS[input.wireSizeAWG] || 6530;
  const factor = input.phase === "3-phase" ? Math.sqrt(3) : 2;

  const dropVolts = (factor * k * input.current * input.distanceFt) / cm;
  const dropPercent = (dropVolts / input.voltage) * 100;
  const remainingVolts = input.voltage - dropVolts;
  const isNecCompliant = dropPercent <= 3.0; // NEC 210.19(A) 3% recommendation

  return {
    dropVolts: Number(dropVolts.toFixed(2)),
    dropPercent: Number(dropPercent.toFixed(2)),
    remainingVolts: Number(remainingVolts.toFixed(2)),
    isNecCompliant,
    recommendation: isNecCompliant
      ? "NEC Compliant (≤ 3% voltage drop)."
      : "Exceeds NEC 3% recommendation! Increase wire size to reduce voltage drop.",
  };
}

// Box Fill Calculator (NEC 314.16(B))
export interface BoxFillItem {
  conductors14AWG: number;
  conductors12AWG: number;
  conductors10AWG: number;
  conductors8AWG: number;
  receptaclesSwitchesCount: number; // Each yoke counts as double largest conductor connected
  internalClampsCount: number; // All clamps count as 1 of largest conductor
  supportFittingsCount: number;
  groundingConductorsCount: number; // All grounds together count as 1 of largest conductor
}

export function calculateBoxFill(items: BoxFillItem) {
  // Volume per conductor AWG (cu. in.) from NEC Table 314.16(B)
  const vol14 = 2.0;
  const vol12 = 2.25;
  const vol10 = 2.5;
  const vol8 = 3.0;

  // Find largest wire size present for device/clamp/ground allowances
  let largestVol = vol14;
  if (items.conductors8AWG > 0) largestVol = vol8;
  else if (items.conductors10AWG > 0) largestVol = vol10;
  else if (items.conductors12AWG > 0) largestVol = vol12;

  const conductorVolume =
    items.conductors14AWG * vol14 +
    items.conductors12AWG * vol12 +
    items.conductors10AWG * vol10 +
    items.conductors8AWG * vol8;

  const clampVolume = items.internalClampsCount > 0 ? largestVol : 0;
  const deviceVolume = items.receptaclesSwitchesCount * 2 * largestVol;
  const groundVolume = items.groundingConductorsCount > 0 ? largestVol : 0;
  const supportVolume = items.supportFittingsCount > 0 ? largestVol : 0;

  const totalRequiredVolumeCuIn =
    conductorVolume + clampVolume + deviceVolume + groundVolume + supportVolume;

  // Common gang box sizes
  let recommendedBox = '4" x 2-1/8" Single Gang Deep (22.5 cu. in.)';
  if (totalRequiredVolumeCuIn > 30.3) {
    recommendedBox = '4" Square 2-1/8" Deep with 2-Gang Mud Ring (>42 cu. in.)';
  } else if (totalRequiredVolumeCuIn > 22.5) {
    recommendedBox = '4" x 4" x 2-1/8" Square Box with Mud Ring (30.3 cu. in.)';
  } else if (totalRequiredVolumeCuIn > 18) {
    recommendedBox = '4" x 2-1/8" Deep Plastic or Metallic Hand Handy Box (22.5 cu. in.)';
  } else {
    recommendedBox = 'Standard 18 cu. in. Single-Gang Box';
  }

  return {
    conductorVolume: Number(conductorVolume.toFixed(2)),
    deviceVolume: Number(deviceVolume.toFixed(2)),
    clampVolume: Number(clampVolume.toFixed(2)),
    groundVolume: Number(groundVolume.toFixed(2)),
    totalRequiredVolumeCuIn: Number(totalRequiredVolumeCuIn.toFixed(2)),
    recommendedBox,
  };
}

// Residential Service Load Calculation (NEC Article 220.82 Optional Method)
export interface ResidentialLoadInput {
  squareFeet: number;
  smallApplianceCircuits: number; // 1,500 VA each (min 2)
  laundryCircuits: number; // 1,500 VA each (min 1)
  rangeCooktopWattage: number; // e.g. 12000
  dryerWattage: number; // e.g. 5000
  waterHeaterWattage: number; // e.g. 4500
  acHeatWattage: number; // Largest of AC or Heating unit
  evChargerWattage: number; // e.g. 9600 for 40A charging
}

export function calculateResidentialService(input: ResidentialLoadInput) {
  const generalLightingVA = input.squareFeet * 3; // 3 VA per sq ft (NEC 220.12)
  const smallApplianceVA = input.smallApplianceCircuits * 1500;
  const laundryVA = input.laundryCircuits * 1500;

  const generalSubtotalVA = generalLightingVA + smallApplianceVA + laundryVA;
  const appliancesVA =
    input.rangeCooktopWattage +
    input.dryerWattage +
    input.waterHeaterWattage +
    input.evChargerWattage;

  const totalGeneralAppliancesVA = generalSubtotalVA + appliancesVA;

  // NEC 220.82 Optional Calculation: First 10,000 VA at 100%, remaining at 40%
  const first10k = Math.min(totalGeneralAppliancesVA, 10000);
  const remainingAt40 = Math.max(0, totalGeneralAppliancesVA - 10000) * 0.4;
  const calculatedGeneralLoadVA = first10k + remainingAt40;

  // Add largest of HVAC load at 100%
  const totalServiceVA = calculatedGeneralLoadVA + input.acHeatWattage;
  const totalServiceAmps = totalServiceVA / 240;

  let recommendedServiceAmps = 100;
  if (totalServiceAmps > 200) recommendedServiceAmps = 300;
  else if (totalServiceAmps > 150) recommendedServiceAmps = 200;
  else if (totalServiceAmps > 100) recommendedServiceAmps = 150;

  return {
    generalLightingVA,
    smallApplianceVA,
    appliancesVA,
    totalGeneralAppliancesVA,
    calculatedGeneralLoadVA: Number(calculatedGeneralLoadVA.toFixed(0)),
    totalServiceVA: Number(totalServiceVA.toFixed(0)),
    totalServiceAmps: Number(totalServiceAmps.toFixed(1)),
    recommendedServiceAmps,
    necCitation: "NEC Article 220.82 (Optional Calculation Method for Dwelling Units)",
  };
}
