import React, { useState } from "react";
import { 
  Globe, 
  X, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Cross, 
  ArrowRight, 
  Star, 
  CreditCard,
  Building,
  Wrench,
  BookOpen,
  Cpu
} from "lucide-react";

interface Props {
  selectedTierId: string;
  onClose: () => void;
}

export const TierWebsiteLandingModal: React.FC<Props> = ({ selectedTierId, onClose }) => {
  const [activeTierId, setActiveTierId] = useState<string>(selectedTierId || "apprentice");
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const websitePagesData: Record<string, {
    subdomain: string;
    title: string;
    badge: string;
    heroHeadline: string;
    heroSubheadline: string;
    promoRate: string;
    after3MonthsRate: string;
    annualRate: string;
    targetAudience: string;
    accentClasses: {
      text: string;
      bg: string;
      shadow: string;
    };
    keyFeatures: { title: string; desc: string; icon: React.ReactNode }[];
    testimonials: { quote: string; author: string; role: string }[];
  }> = {
    apprentice: {
      subdomain: "apprentice.voltpro.com",
      title: "VoltPro Apprentice Academy Web Portal",
      badge: "ELECTRICAL TRADE SCHOOL & HELPER PORTAL",
      heroHeadline: "Pass Your Journeyman Exam & Master the 2026 NEC Code On The Job Site",
      heroSubheadline: "Hands-free drive-time podcasts, AI code tutor, circuit panel simulator & Volt Coin rewards designed for apprentice electricians.",
      promoRate: "$89/mo",
      after3MonthsRate: "$14.99/mo",
      annualRate: "$890/year",
      targetAudience: "Apprentices, Helpers & Electrical Trade School Students",
      accentClasses: { text: "text-amber-400", bg: "bg-amber-500", shadow: "shadow-amber-500/20" },
      keyFeatures: [
        {
          title: "2026 NEC Code Master AI",
          desc: "Instant answers for conduit fill, wire ampacity tables, box sizing, and grounding Article 250 rules.",
          icon: <BookOpen className="w-5 h-5 text-amber-400" />
        },
        {
          title: "Drive-Time Podcast Studio",
          desc: "Hands-free audio lessons generated on demand while driving to jobsites or class.",
          icon: <Zap className="w-5 h-5 text-amber-400" />
        },
        {
          title: "Circuit Panel & Switch Simulator",
          desc: "Interactive 3-way, 4-way, GFCI, and subpanel wiring sandbox directly in your browser.",
          icon: <Wrench className="w-5 h-5 text-amber-400" />
        },
        {
          title: "Volt Coins & Badges Engine",
          desc: "Earn gamified trade skill badges and redeem Volt Coins for tools and exam practice tests.",
          icon: <Award className="w-5 h-5 text-amber-400" />
        }
      ],
      testimonials: [
        {
          quote: "The drive-time audio podcasts helped me memorize Article 250 grounding rules on my 45-minute commute. Passed my exam on attempt #1!",
          author: "Marcus Vance",
          role: "Year 3 Apprentice, Local 48"
        }
      ]
    },
    tech: {
      subdomain: "lowvol.voltpro.com",
      title: "VoltPro Low-Voltage & Controls Portal",
      badge: "LOW-VOLTAGE, SECURITY & HVAC TECH HUB",
      heroHeadline: "Master Article 725/760 Rules, POE Networks & Circuit Diagnostics",
      heroSubheadline: "Automated voltage drop for 24VAC/48VDC POE, computer circuit board PCB diagnostics, and fire alarm code rules.",
      promoRate: "$199/mo",
      after3MonthsRate: "$14.99/mo",
      annualRate: "$1,990/year",
      targetAudience: "Low-Voltage, Security, Fire Alarm & HVAC Techs",
      accentClasses: { text: "text-cyan-400", bg: "bg-cyan-500", shadow: "shadow-cyan-500/20" },
      keyFeatures: [
        {
          title: "NEC Article 725 & 760 Rules",
          desc: "Class 1, Class 2, Class 3 power-limited wiring guidelines and cable tray separation rules.",
          icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />
        },
        {
          title: "Cat6 POE & 24VAC Drop Engine",
          desc: "Calculate line loss and terminal voltage for long access control and camera runs.",
          icon: <Zap className="w-5 h-5 text-cyan-400" />
        },
        {
          title: "Computer PCB Diagnostic Simulator",
          desc: "Troubleshoot resistors, relays, transistors, and control boards under simulated load.",
          icon: <Cpu className="w-5 h-5 text-cyan-400" />
        },
        {
          title: "Progression Locked",
          desc: "Requires passing Apprentice Exam or 60 hours in-app.",
          icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />
        }
      ],
      testimonials: [
        {
          quote: "We troubleshoot 24VAC HVAC controls and POE cameras daily. Having instant voltage drop math on phone saves hours on site.",
          author: "David Miller",
          role: "Senior Low-Voltage Lead"
        }
      ]
    },
    journeyman: {
      subdomain: "journeyman.voltpro.com",
      title: "VoltPro Journeyman & Crew Leader Portal",
      badge: "LICENSED JOURNEYMAN & CREW LEAD HUB",
      heroHeadline: "Lead Crew Jobsites with Confidence, Close Homeowner Upsells & Calculate Motor Loads",
      heroSubheadline: "AI Customer Sales & Objection Roleplay Engine, 240V/480V 3-Phase motor calculators, and video slide deck generators for crew training.",
      promoRate: "$399/mo",
      after3MonthsRate: "$14.99/mo",
      annualRate: "$3,990/year",
      targetAudience: "Licensed Journeyman Electricians & Jobsite Foremen",
      accentClasses: { text: "text-blue-400", bg: "bg-blue-500", shadow: "shadow-blue-500/20" },
      keyFeatures: [
        {
          title: "AI Customer Sales & Objection Roleplay",
          desc: "Practice handling homeowner panel upgrade objections, EV charger sales, and surge protection upsells.",
          icon: <Sparkles className="w-5 h-5 text-blue-400" />
        },
        {
          title: "240V/480V 3-Phase Motor Engine",
          desc: "Calculate FLA, breaker sizing, conductor sizing (NEC 430), and overload heater settings.",
          icon: <Wrench className="w-5 h-5 text-blue-400" />
        },
        {
          title: "Video Slide Deck Presenter",
          desc: "Auto-generate professional safety training slides for Monday morning safety toolbox talks.",
          icon: <Building className="w-5 h-5 text-blue-400" />
        },
        {
          title: "Progression Locked",
          desc: "Requires passing Tech Exam or 60 hours in-app.",
          icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />
        }
      ],
      testimonials: [
        {
          quote: "The AI sales roleplay engine helped me present $2,500 panel surge upgrades to homeowners without feeling pushy. My commission doubled!",
          author: "Tyler Ross",
          role: "Lead Journeyman Wireman"
        }
      ]
    },
    master: {
      subdomain: "master.voltpro.com",
      title: "VoltPro Master Electrician & Contractor Portal",
      badge: "MASTER ELECTRICIAN & SHOP OWNER HEADQUARTERS",
      heroHeadline: "Scale Your Electrical Contracting Business with AI CFO, Legal Disclaimers & Apprentice Coaching",
      heroSubheadline: "Volt Books AI Overhead Margin Engine, official contractor legal liability disclaimers, customer privacy compliance, and apprentice code teacher.",
      promoRate: "$599/mo",
      after3MonthsRate: "$14.99/mo",
      annualRate: "$5,990/year",
      targetAudience: "Master Electricians, Electrical Contractors & Shop Owners",
      accentClasses: { text: "text-emerald-400", bg: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
      keyFeatures: [
        {
          title: "Volt Books AI CFO & Margin Engine",
          desc: "Real-time break-even billable hourly rate calculation ($145/hr+), job costing, and tax reserves.",
          icon: <CreditCard className="w-5 h-5 text-emerald-400" />
        },
        {
          title: "Contractor Legal & Privacy Center",
          desc: "Print-ready liability disclaimers for concealed wiring, mechanic's lien notices, and CCPA privacy clauses.",
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
        },
        {
          title: "Admin AI Apprentice Code Teacher",
          desc: "Set up automated homework quizzes and track NEC learning progress for all your shop's apprentices.",
          icon: <BookOpen className="w-5 h-5 text-emerald-400" />
        },
        {
          title: "Progression Locked",
          desc: "Requires passing Journeyman Exam or 60 hours in-app.",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        }
      ],
      testimonials: [
        {
          quote: "Volt Books showed me my true break-even rate was $138/hr instead of $95. Re-priced our jobs and made $42k extra profit this quarter alone.",
          author: "Jason Lee, Master Electrician",
          role: "Owner, VoltPro Electrical Services LLC"
        }
      ]
    },
    all_access: {
      subdomain: "academy.voltpro.com",
      title: "VoltPro Master Certification Course",
      badge: "COMPLETE UNLOCKED TRADE COURSE",
      heroHeadline: "Earn Your Complete VoltPro Master Certification Without Wait Times",
      heroSubheadline: "Instantly unlock every feature, course, simulator, and AI tool. Receive a printable certificate with an official seal and detailed exam transcripts.",
      promoRate: "$2,500 upfront",
      after3MonthsRate: "$14.99/mo",
      annualRate: "$149/year (app access only)",
      targetAudience: "All Tradesmen",
      accentClasses: { text: "text-purple-400", bg: "bg-purple-500", shadow: "shadow-purple-500/20" },
      keyFeatures: [
        {
          title: "All Courses & Simulators Unlocked",
          desc: "Instant access to Apprentice, Tech, Journeyman, and Master content without progression locks.",
          icon: <Globe className="w-5 h-5 text-purple-400" />
        },
        {
          title: "Official Certificate Document",
          desc: "Printable and verifiable certificate document with the VoltPro official seal upon course completion.",
          icon: <Award className="w-5 h-5 text-purple-400" />
        },
        {
          title: "Detailed Exam Transcripts",
          desc: "Receive comprehensive score reports for every level and diagnostic test in the platform.",
          icon: <BookOpen className="w-5 h-5 text-purple-400" />
        },
        {
          title: "Lifetime App Access at Base Rate",
          desc: "Keep all software and calculators permanently for just $14.99/mo after the initial course cost.",
          icon: <CheckCircle2 className="w-5 h-5 text-purple-400" />
        }
      ],
      testimonials: [
        {
          quote: "I bought the all-access certification course and powered through everything. Having the printable certificate on my wall gives my clients huge confidence.",
          author: "Michael Henderson",
          role: "Licensed Independent Contractor"
        }
      ]
    }
  };

  const page = websitePagesData[activeTierId] || websitePagesData.apprentice;

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            
            <div className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 flex items-center space-x-2 text-xs text-amber-300 font-mono">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>https://{page.subdomain}</span>
            </div>
          </div>

          {/* Tier Switcher Tabs */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto text-[11px] font-bold">
            <button
              onClick={() => { setActiveTierId("apprentice"); setIsSubmitted(false); }}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                activeTierId === "apprentice" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Apprentice Site
            </button>
            <button
              onClick={() => { setActiveTierId("tech"); setIsSubmitted(false); }}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                activeTierId === "tech" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Low Vol Tech Site
            </button>
            <button
              onClick={() => { setActiveTierId("journeyman"); setIsSubmitted(false); }}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                activeTierId === "journeyman" ? "bg-blue-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Journeyman Site
            </button>
            <button
              onClick={() => { setActiveTierId("master"); setIsSubmitted(false); }}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                activeTierId === "master" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Master Contractor Site
            </button>
            <button
              onClick={() => { setActiveTierId("all_access"); setIsSubmitted(false); }}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                activeTierId === "all_access" ? "bg-purple-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Certification Course
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Website Content Area (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-8 text-slate-200">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[10px] tracking-wider uppercase">
              {page.badge}
            </span>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {page.heroHeadline}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {page.heroSubheadline}
            </p>

            {/* Special Pricing Box */}
            <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-4 max-w-md mx-auto shadow-xl space-y-2">
              <div className="text-xs font-semibold text-slate-400">Exclusive Introductory Launch Pricing</div>
              <div className="flex items-center justify-center space-x-2">
                <span className={`text-2xl sm:text-3xl font-black ${page.accentClasses.text}`}>{page.promoRate}</span>
                {activeTierId !== 'all_access' && (
                  <span className="text-xs text-slate-400">/ mo for first 3 months</span>
                )}
              </div>
              <div className="text-xs font-bold text-emerald-400">
                Then drops automatically to only <span className="text-sm underline">{page.after3MonthsRate}</span> / mo!
              </div>
              <div className="text-[10px] text-slate-400">
                Or choose Annual Billing: {page.annualRate} (Save 17%)
              </div>
            </div>
          </div>

          {/* Mobile App & APK Download Section for this App */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">{page.title} (Web & Mobile App)</span>
                <span className="text-slate-400 text-[11px]">
                  Available on Web Browser, Android APK (Google Play Store), and PWA Offline Mobile Mode.
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-bold text-slate-300 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Web App Live</span>
              </div>
              <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-bold text-amber-400 flex items-center space-x-1.5">
                <span>Android APK Ready</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {page.keyFeatures.map((feat, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    {feat.icon}
                  </div>
                  <h3 className="font-bold text-sm text-white">{feat.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-1">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Missionary & Scholarship Notice */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <Cross className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-emerald-300 block">15% Post-Tax Missionary & Scholarship Guarantee</span>
                <span className="text-slate-300 text-[11px]">
                  Every subscription directly funds Christian trade mission trips & tool scholarships for underprivileged young apprentices.
                </span>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-400 text-slate-950 font-black rounded-lg shrink-0 text-[10px]">
              GIVING BACK
            </span>
          </div>

          {/* Testimonials */}
          {page.testimonials.map((item, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 italic text-xs text-slate-300">
              <div className="flex items-center space-x-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p>"{item.quote}"</p>
              <div className="not-italic font-bold text-amber-300 pt-1">
                — {item.author}, <span className="text-slate-400 font-normal">{item.role}</span>
              </div>
            </div>
          ))}

          {/* Quick Registration / Enrollment Portal */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 max-w-lg mx-auto space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-center text-white uppercase tracking-wider">
              Start Your 3-Day Demo Trial — {page.title}
            </h3>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-sm">Welcome to {page.title}!</div>
                <p className="text-xs text-slate-300">
                  Your 3-day demo trial has been activated. A welcome link has been sent to <span className="text-amber-300 font-mono">{emailInput}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnroll} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Wireman"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@electrician.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 ${page.accentClasses.bg} hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow-lg ${page.accentClasses.shadow} flex items-center justify-center space-x-2`}
                >
                  <span>CLAIM {page.promoRate} ({page.after3MonthsRate} LATER)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
