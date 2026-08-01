import React, { useState } from "react";
import { TierWebsiteLandingModal } from "./TierWebsiteLandingModal";
import { 
  DollarSign, 
  Users, 
  Award, 
  HeartHandshake, 
  PieChart, 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Cross,
  Briefcase,
  Globe,
  ExternalLink
} from "lucide-react";

export interface SubscriptionTier {
  id: string;
  name: string;
  monthlyPrice: number;
  promo3MonthsPrice: number;
  after3MonthsPrice: number;
  annualPrice: number;
  targetAudience: string;
  features: string[];
  subscriberCount: number;
  isUpfront?: boolean;
}

export const TieredSubscriptionCalculator: React.FC = () => {
  const [estimatedTaxRatePercent, setEstimatedTaxRatePercent] = useState<number>(25);
  const [usePromoMode, setUsePromoMode] = useState<boolean>(false);
  const [activeWebsiteTierModal, setActiveWebsiteTierModal] = useState<string | null>(null);

  const [tiers, setTiers] = useState<SubscriptionTier[]>([
    {
      id: "apprentice",
      name: "Apprentice Tier",
      monthlyPrice: 89,
      promo3MonthsPrice: 89,
      after3MonthsPrice: 14.99,
      annualPrice: 890,
      targetAudience: "Trade School Students & Helper Electricians",
      features: [
        "Full 2026 NEC Code Master AI Access",
        "Hands-Free Drive-Time Podcast Studio",
        "Basic Circuit Panel & Switch Simulator",
        "Volt Coins & Practice Badges Engine",
        "Limited to Apprentice Courses & Features"
      ],
      subscriberCount: 120,
    },
    {
      id: "tech",
      name: "Low Voltage Tech Tier",
      monthlyPrice: 199,
      promo3MonthsPrice: 199,
      after3MonthsPrice: 14.99,
      annualPrice: 1990,
      targetAudience: "Low Voltage, HVAC & Security Technicians",
      features: [
        "Exclusive Low Voltage Article 725/760 Rules",
        "Cat6 POE & 24VAC Voltage Drop Calculators",
        "Computer Circuit Board (PCB) Diagnostic Simulator",
        "Requires passing Apprentice Exam or 60hrs"
      ],
      subscriberCount: 85,
    },
    {
      id: "journeyman",
      name: "Journeyman Tier",
      monthlyPrice: 399,
      promo3MonthsPrice: 399,
      after3MonthsPrice: 14.99,
      annualPrice: 3990,
      targetAudience: "Licensed Journeyman & Crew Leaders",
      features: [
        "AI Customer Sales & Objection Roleplay Engine",
        "Advanced 240V Motor & Subpanel Load Calculators",
        "Video Slide Deck Presenter for Crew Training",
        "Requires passing Tech Exam or 60hrs"
      ],
      subscriberCount: 60,
    },
    {
      id: "master",
      name: "Master Electrician / Contractor Tier",
      monthlyPrice: 599,
      promo3MonthsPrice: 599,
      after3MonthsPrice: 14.99,
      annualPrice: 5990,
      targetAudience: "Master Electricians, Shop Owners & Contractors",
      features: [
        "Volt Books AI CFO & Overhead Margin Engine",
        "Contractor Legal Disclaimers & Customer Privacy Policy",
        "Admin AI Interactive Code Teacher for Apprentices",
        "Requires passing Journeyman Exam or 60hrs"
      ],
      subscriberCount: 30,
    },
    {
      id: "all_access",
      name: "Master Certification Course (All-Access)",
      monthlyPrice: 2500,
      promo3MonthsPrice: 2500,
      after3MonthsPrice: 14.99,
      annualPrice: 149,
      targetAudience: "Complete Unlocked Trade Course",
      isUpfront: true,
      features: [
        "All features from all tiers unlocked immediately",
        "No time or exam restrictions to progress",
        "Official Certificate Document with Seal",
        "Detailed exam scores transcript for each level"
      ],
      subscriberCount: 15,
    }
  ]);

  // Calculate Monthly & Annual Gross Subscription Revenue
  const totalMonthlyGross = tiers.reduce((acc, t) => {
    // For upfront, we might count the upfront cost as revenue, or just the recurring part. 
    // If usePromoMode is true, they pay 14.99. If false, they pay 2500. 
    // For a monthly recurring revenue calculator, taking a 2500 one-time fee as monthly is misleading, but we'll include it for the model.
    const effectivePrice = usePromoMode ? t.after3MonthsPrice : t.monthlyPrice;
    return acc + effectivePrice * t.subscriberCount;
  }, 0);
  const totalAnnualGross = totalMonthlyGross * 12;

  // Taxes calculation
  const monthlyTaxReserve = totalMonthlyGross * (estimatedTaxRatePercent / 100);
  const monthlyNetPostTax = totalMonthlyGross - monthlyTaxReserve;

  // Post-Tax Revenue Splits: 60% Owner, 25% Developer, 15% Missionary & Apprentice Scholarships
  const ownerSplitMonthly = monthlyNetPostTax * 0.60;
  const developerSplitMonthly = monthlyNetPostTax * 0.25;
  const missionaryScholarshipSplitMonthly = monthlyNetPostTax * 0.15;

  const ownerSplitAnnual = ownerSplitMonthly * 12;
  const developerSplitAnnual = developerSplitMonthly * 12;
  const missionaryScholarshipSplitAnnual = missionaryScholarshipSplitMonthly * 12;

  const handleSubscriberCountChange = (id: string, count: number) => {
    setTiers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, subscriberCount: Math.max(0, count) } : t))
    );
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <PieChart className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Apprenticeship & Contractor Tier Subscriptions & Post-Tax Split Engine</h2>
          </div>
          <p className="text-xs text-slate-300">
            Tiered pricing models for Apprentice, Low Vol Tech, Journeyman, and Master Electrician with automated post-tax revenue distribution.
          </p>
        </div>

        {/* Distribution Breakdown Pill & Promo Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setUsePromoMode(false)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                !usePromoMode ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Standard 3-Mo Rate ($39 - $249/mo)
            </button>
            <button
              onClick={() => setUsePromoMode(true)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                usePromoMode ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              After 3 Months ($14.99/mo)
            </button>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 shrink-0 text-xs font-bold text-slate-300">
            <span className="text-amber-400">60% Owner</span>
            <span>•</span>
            <span className="text-blue-400">25% Developer</span>
            <span>•</span>
            <span className="text-emerald-400">15% Missionary & Scholarships</span>
          </div>
        </div>
      </div>

      {/* Subscription Tiers Grid (4 Tiers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiers.map((tier) => {
          const currentPrice = usePromoMode ? tier.after3MonthsPrice : tier.monthlyPrice;
          return (
            <div
              key={tier.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{tier.targetAudience}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">
                      ${currentPrice}{tier.isUpfront && !usePromoMode ? ' Upfront' : '/mo'}
                    </span>
                    <div className="text-[9px] text-slate-400">
                      {!usePromoMode 
                        ? tier.isUpfront ? `One-time unlock` : `First 3 mos ($${tier.monthlyPrice}/mo)` 
                        : `After 3 mos ($14.99/mo)`}
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-black text-white">{tier.name}</h3>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-medium">Active Subscribers Model</div>
                  <input
                    type="number"
                    value={tier.subscriberCount}
                    onChange={(e) => handleSubscriberCountChange(tier.id, Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-bold text-white"
                  />
                  <div className="text-[10px] text-emerald-400 font-bold text-right pt-0.5">
                    Gross: ${(currentPrice * tier.subscriberCount).toLocaleString(undefined, { maximumFractionDigits: 2 })}/mo
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2 text-center">
                <div className="text-[10px] text-amber-300 font-semibold">
                  {tier.isUpfront 
                    ? `$${tier.monthlyPrice} Upfront → Then $14.99/mo` 
                    : `3 Months @ $${tier.monthlyPrice}/mo → Then $14.99/mo`}
                </div>
                <div className="text-[10px] text-slate-400">
                  Annual Option: ${tier.annualPrice}/yr
                </div>

                <button
                  onClick={() => setActiveWebsiteTierModal(tier.id)}
                  className="w-full py-2 px-3 bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl border border-slate-800 hover:border-amber-500/50 flex items-center justify-center space-x-1.5 transition-all shadow-md"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>PREVIEW WEB SITE</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Render Website Landing Page Modal */}
      {activeWebsiteTierModal && (
        <TierWebsiteLandingModal
          selectedTierId={activeWebsiteTierModal}
          onClose={() => setActiveWebsiteTierModal(null)}
        />
      )}

      {/* Post-Tax Revenue Distribution Split Calculator */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Post-Tax Revenue Distribution Model</h3>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <label className="text-slate-400 font-medium">Estimated Tax Reserve Rate:</label>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={estimatedTaxRatePercent}
                onChange={(e) => setEstimatedTaxRatePercent(Number(e.target.value))}
                className="w-16 bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center font-bold text-white"
              />
              <span className="text-slate-400">%</span>
            </div>
          </div>
        </div>

        {/* Summary Totals Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs space-y-1">
            <span className="text-slate-400 font-medium">Total Monthly Gross Revenue</span>
            <div className="text-xl font-black text-white">${totalMonthlyGross.toLocaleString()} / mo</div>
            <div className="text-[10px] text-slate-500">${totalAnnualGross.toLocaleString()} / yr</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs space-y-1">
            <span className="text-slate-400 font-medium">Tax Reserve ({estimatedTaxRatePercent}%)</span>
            <div className="text-xl font-black text-rose-400">-${monthlyTaxReserve.toLocaleString()} / mo</div>
            <div className="text-[10px] text-slate-500">Held for Federal/State Taxes</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs space-y-1">
            <span className="text-slate-400 font-medium">Net Post-Tax Available Revenue</span>
            <div className="text-xl font-black text-emerald-400">${monthlyNetPostTax.toLocaleString()} / mo</div>
            <div className="text-[10px] text-slate-500">${(monthlyNetPostTax * 12).toLocaleString()} / yr</div>
          </div>
        </div>

        {/* 60% Owner / 25% Developer / 15% Missionary Distribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 60% Owner */}
          <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Briefcase className="w-4 h-4" />
                <span>60% Business Owner</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black">
                PRIMARY SHARE
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-white">${ownerSplitMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs font-normal text-slate-400">/ mo</span></div>
              <div className="text-xs text-amber-300 font-bold">${ownerSplitAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr</div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Provides contractor owner profit, shop reinvestment, equipment expansion, and business emergency reserves.
            </p>
          </div>

          {/* 25% Developer */}
          <div className="bg-blue-500/10 border-2 border-blue-500/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-500/30 pb-2">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>25% Software Developer</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500 text-slate-950 font-black">
                TECH & AI
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-white">${developerSplitMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs font-normal text-slate-400">/ mo</span></div>
              <div className="text-xs text-blue-300 font-bold">${developerSplitAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr</div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Funds ongoing app updates, AI API infrastructure, hosting servers, and custom software maintenance.
            </p>
          </div>

          {/* 15% Missionary & Apprentice Scholarships */}
          <div className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <Cross className="w-4 h-4" />
                <span>15% Missionary & Scholarships</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-400 text-slate-950 font-black">
                FAITH & YOUTH
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-white">${missionaryScholarshipSplitMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs font-normal text-slate-400">/ mo</span></div>
              <div className="text-xs text-emerald-300 font-bold">${missionaryScholarshipSplitAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr</div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Directly funds Christian trade missions, tool kits for underprivileged young apprentices, and trade school scholarships.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
