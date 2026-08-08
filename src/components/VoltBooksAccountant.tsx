import React, { useState } from "react";
import { ContractorMetrics } from "../types";
import { BusinessLegalPrivacyCenter } from "./BusinessLegalPrivacyCenter";
import { TieredSubscriptionCalculator } from "./TieredSubscriptionCalculator";
import { 
  DollarSign, 
  Calculator, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Loader2, 
  TrendingUp, 
  Briefcase,
  AlertCircle,
  Scale
} from "lucide-react";

export const VoltBooksAccountant: React.FC = () => {
  const [metrics, setMetrics] = useState<ContractorMetrics>({
    hourlyLaborRate: 45, // Desired tech wage
    monthlyOverhead: 5500, // Van payment, fuel, insurance, software, licensing, shop
    workingHoursPerMonth: 160,
    billableUtilizationPercent: 65, // 65% of time is billable
    targetProfitMarginPercent: 20, // 20% net profit
  });

  const [quoteCustomerName, setQuoteCustomerName] = useState("John Miller");
  const [quoteJobScope, setQuoteJobScope] = useState("100A to 200A Main Panel Upgrade with Whole-Home Surge Protector");
  const [quoteLaborHours, setQuoteLaborHours] = useState(12);
  const [quoteMaterialsCost, setQuoteMaterialsCost] = useState(1400);
  const [quoteFundsReceived, setQuoteFundsReceived] = useState(0);

  // AI Accountant State
  const [accountantQuery, setAccountantQuery] = useState("");
  const [accountantLoading, setAccountantLoading] = useState(false);
  const [accountantAdvice, setAccountantAdvice] = useState<string | null>(
    "Hello Owner! I am Volt Books AI, your electrical contractor CFO & bookkeeper. Ask me about calculating your hourly break-even rate, tax deductions for work trucks & tools, W2 vs 1099 helpers, or generating custom legal disclaimers for your estimates."
  );

  // Math for Hourly Rate
  const billableHours = (metrics.workingHoursPerMonth * metrics.billableUtilizationPercent) / 100;
  const overheadPerBillableHour = billableHours > 0 ? metrics.monthlyOverhead / billableHours : 0;
  const breakEvenRate = metrics.hourlyLaborRate + overheadPerBillableHour;
  const targetBillablePricePerHour = breakEvenRate / (1 - metrics.targetProfitMarginPercent / 100);

  // Quote Math
  const estimatedLaborCost = quoteLaborHours * targetBillablePricePerHour;
  const materialsWithMarkup = quoteMaterialsCost * 1.3; // 30% materials markup
  const totalQuotePrice = estimatedLaborCost + materialsWithMarkup;
  const fundsReceivable = Math.max(totalQuotePrice - quoteFundsReceived, 0);

  const handleQueryAccountant = async (customQ?: string) => {
    const q = customQ || accountantQuery;
    if (!q.trim() || accountantLoading) return;

    setAccountantLoading(true);
    try {
      const res = await fetch("/api/ai/accountant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "financial_advice",
          metrics,
          query: q,
        }),
      });

      const data = await res.json();
      if (res.ok && data.advice) {
        setAccountantAdvice(data.advice);
      } else {
        setAccountantAdvice(`Error: ${data.error || "Failed to reach Volt Books AI"}`);
      }
    } catch (err: any) {
      setAccountantAdvice(`Failed to query accountant: ${err.message}`);
    } finally {
      setAccountantLoading(false);
      if (!customQ) setAccountantQuery("");
    }
  };

  const sampleAccountantQuestions = [
    "What business expenses can I deduct for my electrical work van and tools on Schedule C?",
    "Generate standard legal contract disclaimers for concealed drywall electrical hazards and permit fees.",
    "Should I hire my first apprentice as a W2 employee or 1099 subcontractor?",
    "How do I setup a privacy policy notice for storing customer residential address & photo records?"
  ];

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Volt Books AI: Live Accountant & Legal CFO</h2>
          </div>
          <p className="text-xs text-slate-300">
            Contractor financial management, break-even hourly rate calculator, quote builder with legal disclaimers & privacy compliance.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs px-3 py-1.5 rounded-xl font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>CPA & Legal Contractor Shield</span>
        </div>
      </div>

      {/* Main Grid: Break-even Calculator vs Quote Builder & AI Accountant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Contractor Hourly Rate & Financial Break-Even (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Calculator className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Break-Even Hourly Price Calculator</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Desired Tech Hourly Wage ($/hr)</label>
                <input
                  type="number"
                  value={metrics.hourlyLaborRate}
                  onChange={(e) => setMetrics({ ...metrics, hourlyLaborRate: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Monthly Business Overhead ($)</label>
                <p className="text-[10px] text-slate-500 mb-1">(Truck payment, fuel, general liability, licensing, shop rent)</p>
                <input
                  type="number"
                  value={metrics.monthlyOverhead}
                  onChange={(e) => setMetrics({ ...metrics, monthlyOverhead: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Billable Utilization (%)</label>
                <p className="text-[10px] text-slate-500 mb-1">(Avg % of paid time spent on active job sites)</p>
                <input
                  type="number"
                  value={metrics.billableUtilizationPercent}
                  onChange={(e) => setMetrics({ ...metrics, billableUtilizationPercent: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Target Net Profit Margin (%)</label>
                <input
                  type="number"
                  value={metrics.targetProfitMarginPercent}
                  onChange={(e) => setMetrics({ ...metrics, targetProfitMarginPercent: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            {/* Calculated Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Overhead Burden per Billable Hr:</span>
                <span className="font-bold text-amber-400">${overheadPerBillableHour.toFixed(2)} / hr</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Zero-Profit Break-Even Rate:</span>
                <span className="font-bold text-rose-400">${breakEvenRate.toFixed(2)} / hr</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-white">Recommended Billable Quote Price:</span>
                <span className="text-xl font-black text-emerald-400">${targetBillablePricePerHour.toFixed(2)} / hr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quote Generator & AI Accountant Consultation (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Quote & Legal Disclaimer Builder */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Estimate & Legal Disclaimer Generator</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Auto Legal Clauses
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={quoteCustomerName}
                  onChange={(e) => setQuoteCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Estimated Labor Hours</label>
                <input
                  type="number"
                  value={quoteLaborHours}
                  onChange={(e) => setQuoteLaborHours(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Funds Received ($)</label>
                <input
                  type="number"
                  min={0}
                  value={quoteFundsReceived}
                  onChange={(e) => setQuoteFundsReceived(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-400 mb-1">Scope of Electrical Work</label>
                <input
                  type="text"
                  value={quoteJobScope}
                  onChange={(e) => setQuoteJobScope(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            {/* Total Estimate Calculation Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Labor ({quoteLaborHours} hrs @ ${targetBillablePricePerHour.toFixed(0)}/hr):</span>
                <span className="font-bold text-white">${estimatedLaborCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Materials (30% markup):</span>
                <span className="font-bold text-white">${materialsWithMarkup.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-white text-sm">TOTAL ESTIMATE PRICE:</span>
                <span className="text-2xl font-black text-amber-400">${totalQuotePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-800 pt-2">
                <span className="font-bold text-slate-200 text-sm">FUNDS RECEIVABLE BALANCE:</span>
                <span className="text-xl font-black text-emerald-400">${fundsReceivable.toFixed(2)}</span>
              </div>

              {/* Legal Disclaimer Box */}
              <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400 leading-relaxed space-y-1">
                <span className="font-bold text-amber-400 uppercase">Protective Legal Disclaimer & Privacy Notice:</span>
                <p>
                  1. <strong>Concealed Conditions:</strong> Price covers visible scope. Hidden wiring violations, dry-rot, or hazardous materials behind drywall require written change orders under NEC 110.12.
                  2. <strong>Utility & Permits:</strong> Municipal permit and utility disconnect/reconnect fees are billed at cost.
                  3. <strong>Privacy Compliance:</strong> Customer contact & property records are stored securely under state privacy laws.
                </p>
              </div>
            </div>
          </div>

          {/* Volt Books AI Accountant Consultation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-bold text-white">Ask Volt Books AI Accountant & CFO</h3>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">Frequent Bookkeeping Questions:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleAccountantQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQueryAccountant(q)}
                    disabled={accountantLoading}
                    className="text-[10px] bg-slate-950 hover:bg-slate-850 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors text-left"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 min-h-[120px] max-h-[260px] overflow-y-auto leading-relaxed whitespace-pre-wrap">
              {accountantLoading ? (
                <div className="flex items-center justify-center space-x-2 py-6 text-yellow-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Computing financial & legal contractor advice...</span>
                </div>
              ) : (
                accountantAdvice
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQueryAccountant();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask tax deductions, truck depreciation, or contract liability questions..."
                value={accountantQuery}
                onChange={(e) => setAccountantQuery(e.target.value)}
                disabled={accountantLoading}
                className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
              />
              <button
                type="submit"
                disabled={accountantLoading || !accountantQuery.trim()}
                className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5 shrink-0"
              >
                {accountantLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Ask CFO</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Tiered Subscription & Revenue Split Model */}
      <div className="pt-4 border-t border-slate-800">
        <TieredSubscriptionCalculator />
      </div>

      {/* Business Visual Laws & Privacy Policy Compliance Center */}
      <div className="pt-4 border-t border-slate-800">
        <BusinessLegalPrivacyCenter />
      </div>
    </div>
  );
};
