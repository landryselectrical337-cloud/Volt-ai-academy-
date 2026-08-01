import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Eye, 
  Sparkles, 
  Scale, 
  Briefcase,
  Building2,
  Copy,
  Check
} from "lucide-react";

export const BusinessLegalPrivacyCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"contractor-laws" | "customer-privacy" | "generator">("contractor-laws");

  // Custom Legal & Privacy Form State
  const [companyName, setCompanyName] = useState("VoltPro Electrical Services LLC");
  const [licenseNumber, setLicenseNumber] = useState("EC-13009482");
  const [stateJurisdiction, setStateJurisdiction] = useState("Texas / National Standard");
  const [copied, setCopied] = useState(false);

  const generatedContractClause = `
================================================================================
${companyName.toUpperCase()} — CONTRACTOR LEGAL DISCLAIMERS & PRIVACY NOTICE
State License #: ${licenseNumber} | Jurisdiction: ${stateJurisdiction}
================================================================================

1. VISUAL INSPECTION & CONCEALED WIRING DISCLAIMER
This proposal covers visible, accessible electrical work only. Under NEC Article 110.12, any pre-existing code violations, ungrounded knob-and-tube, aluminum wiring, overloaded subpanels, or dry-rot discovered behind walls/ceilings during work execution shall require a written Change Order.

2. PERMITS, INSPECTIONS & UTILITY RECONNECTS
${companyName} shall file all required municipal electrical permits. Municipal inspection scheduling and utility company power disconnect/reconnect timelines are beyond contractor control.

3. MECHANIC'S LIEN RIGHT NOTICE
Notice to Owner: Failure to pay agreed invoice amounts upon project completion gives contractor the legal right to file a Mechanic's Lien against the real property pursuant to state law.

4. CUSTOMER PRIVACY & DATA SAFEGUARDS
Customer personal data (name, phone, address, property photos, and panel load telemetry) collected by ${companyName} is stored securely in encrypted databases. Data is used exclusively for project estimation, permit filing, and warranty service. Photos are archived for insurance records and will never be sold to third parties.

5. 3-DAY RIGHT OF RESCISSION (RESIDENTIAL PROJECTS)
Homeowners have the legal right to cancel home improvement contracts over $25 within three (3) business days of signing without penalty under federal and state consumer protection laws.
================================================================================
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContractClause);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Electrical Business Visual Laws & Customer Privacy Compliance</h2>
          </div>
          <p className="text-xs text-slate-300">
            Official contractor liability disclaimers, NEC code compliance laws, customer data privacy rules & printable legal disclosures.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab("contractor-laws")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "contractor-laws" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Contractor Trade Laws
          </button>
          <button
            onClick={() => setActiveTab("customer-privacy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "customer-privacy" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Customer Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("generator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "generator" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Printable Disclosure
          </button>
        </div>
      </div>

      {/* TAB 1: CONTRACTOR TRADE LAWS & NEC COMPLIANCE */}
      {activeTab === "contractor-laws" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-amber-400 font-bold border-b border-slate-800 pb-2 text-sm">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Concealed Hazards & NEC Article 110.12</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Visual Inspection Scope:</strong> Electrical quotes cover visible surface conditions. If hidden aluminum wiring, missing grounds, knob-and-tube, or damaged joists are uncovered during wall cuts, contractor law requires halting work and issuing a formal Change Order under NEC 110.12 (Mechanical Execution of Work).
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold border-b border-slate-800 pb-2 text-sm">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Municipal Permits & Utility Disconnects</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Permit Responsibility:</strong> Electrical main panel swaps and subpanel installs require municipal permits and AHJ (Authority Having Jurisdiction) sign-offs. Utility disconnect delays by power suppliers are legally exempted from contractor liability.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-blue-400 font-bold border-b border-slate-800 pb-2 text-sm">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span>Mechanic's Lien Rights & Payment Terms</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Lien Protection:</strong> State contracting statutes entitle licensed electricians to file a Mechanic's Lien against real property if final invoice payments are defaulted, protecting material suppliers and labor wages.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-rose-400 font-bold border-b border-slate-800 pb-2 text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>3-Day Consumer Right of Rescission</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>FTC Cooling-Off Rule:</strong> Residential door-to-door or in-home contracts exceeding $25 grant homeowners 3 business days to cancel without penalty, except in emergency repair situations.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMER DATA PRIVACY POLICY */}
      {activeTab === "customer-privacy" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl max-w-4xl mx-auto">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Business Customer Data Privacy & AI Safeguards Policy</h3>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              CCPA & State Privacy Compliant
            </span>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-amber-400">1. Customer Address & Contact Data Confidentiality</h4>
              <p>All homeowner names, phone numbers, email addresses, and residential service locations are strictly confidential. We never sell, rent, or trade customer contact lists to third-party marketers.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-amber-400">2. Job Site Photos & Inspection Archive Rights</h4>
              <p>Pre-existing panel photos and finished work images are archived strictly for insurance verification, warranty records, and municipal inspection filings. Highlighting photos for marketing requires explicit homeowner opt-in.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-amber-400">3. AI Data Processing & Zero-Training Guarantee</h4>
              <p>AI estimation and code assistance queries processed by VoltPro AI use encrypted server endpoints. Personally identifiable customer information (PII) is scrubbed prior to model inference to guarantee client data privacy.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-amber-400">4. Customer Deletion & Access Rights</h4>
              <p>Customers may request a copy of their service records or request complete deletion of personal data upon completion of warranty hold periods by emailing our compliance officer.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRINTABLE LEGAL & PRIVACY DISCLOSURE GENERATOR */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Customize Company Legal Header</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Electrical Contracting Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">State Contractor License Number</label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">State / Jurisdiction</label>
                <input
                  type="text"
                  value={stateJurisdiction}
                  onChange={(e) => setStateJurisdiction(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center space-x-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY LEGAL DISCLAIMS"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 space-y-3 shadow-2xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Print-Ready Customer Contract Attachment</h4>
            <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-[11px] text-amber-200 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto min-h-[320px]">
              {generatedContractClause}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
