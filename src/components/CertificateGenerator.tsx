import React, { useRef, useState } from "react";
import { UserProgress } from "../types";
import { Award, CheckCircle2, Download, Lock, Trophy, ShieldCheck } from "lucide-react";

interface Props {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const CertificateGenerator: React.FC<Props> = ({ userProgress, setUserProgress }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Define course requirements
  const requirements = {
    lessons: { required: 3, current: userProgress.completedLessons.length },
    simulations: { required: 2, current: userProgress.simulationsCompleted },
    roleplays: { required: 2, current: userProgress.roleplaysCompleted },
    podcasts: { required: 2, current: userProgress.podcastsCompleted }
  };

  const isEligible = 
    requirements.lessons.current >= requirements.lessons.required &&
    requirements.simulations.current >= requirements.simulations.required &&
    requirements.roleplays.current >= requirements.roleplays.required &&
    requirements.podcasts.current >= requirements.podcasts.required;

  const handleAutocompleteDemo = () => {
    setUserProgress(prev => ({
      ...prev,
      completedLessons: ["lesson1", "lesson2", "lesson3"],
      simulationsCompleted: 2,
      roleplaysCompleted: 2,
      podcastsCompleted: 2,
    }));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // In a real app, this would use html2canvas or similar to convert the DOM to an image/PDF.
    // For this prototype, we'll simulate a download delay and just show a success message.
    setTimeout(() => {
      alert("Certificate generated and downloaded successfully! (Demo Simulation)");
      setIsDownloading(false);
    }, 1500);
  };

  const today = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <Award className="w-7 h-7 text-amber-400" />
            <span>Master Certification Portal</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Complete all course requirements to unlock your official VoltPro printable certificate and seal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requirements Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl h-fit space-y-5">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <span>Progress Checklist</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Lessons Completed</span>
                <span className={requirements.lessons.current >= requirements.lessons.required ? "text-emerald-400" : "text-amber-400"}>
                  {requirements.lessons.current} / {requirements.lessons.required}
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800">
                <div 
                  className={`h-2 rounded-full ${requirements.lessons.current >= requirements.lessons.required ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                  style={{ width: `${Math.min(100, (requirements.lessons.current / requirements.lessons.required) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Simulations Passed</span>
                <span className={requirements.simulations.current >= requirements.simulations.required ? "text-emerald-400" : "text-amber-400"}>
                  {requirements.simulations.current} / {requirements.simulations.required}
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800">
                <div 
                  className={`h-2 rounded-full ${requirements.simulations.current >= requirements.simulations.required ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                  style={{ width: `${Math.min(100, (requirements.simulations.current / requirements.simulations.required) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Sales Roleplays</span>
                <span className={requirements.roleplays.current >= requirements.roleplays.required ? "text-emerald-400" : "text-amber-400"}>
                  {requirements.roleplays.current} / {requirements.roleplays.required}
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800">
                <div 
                  className={`h-2 rounded-full ${requirements.roleplays.current >= requirements.roleplays.required ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                  style={{ width: `${Math.min(100, (requirements.roleplays.current / requirements.roleplays.required) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Drive-Time Podcasts</span>
                <span className={requirements.podcasts.current >= requirements.podcasts.required ? "text-emerald-400" : "text-amber-400"}>
                  {requirements.podcasts.current} / {requirements.podcasts.required}
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800">
                <div 
                  className={`h-2 rounded-full ${requirements.podcasts.current >= requirements.podcasts.required ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                  style={{ width: `${Math.min(100, (requirements.podcasts.current / requirements.podcasts.required) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {!isEligible && (
            <button
              onClick={handleAutocompleteDemo}
              className="w-full py-2 bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-400 rounded-lg text-xs font-bold transition-colors"
            >
              Demo: Auto-Complete Requirements
            </button>
          )}

          {isEligible && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-400">Requirements Met!</p>
                <p className="text-[10px] text-slate-300">Your certificate is unlocked and ready for download.</p>
              </div>
            </div>
          )}
        </div>

        {/* Certificate Preview Area */}
        <div className="lg:col-span-2 relative">
          {!isEligible ? (
            <div className="h-full min-h-[400px] bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Certificate Locked</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Complete all progress requirements on the left to unlock and generate your official VoltPro seal certificate.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? "Generating PDF..." : "Download High-Res PDF"}</span>
                </button>
              </div>

              {/* The actual certificate layout */}
              <div 
                ref={certificateRef}
                className="w-full aspect-[1.414/1] bg-white rounded-lg shadow-2xl overflow-hidden relative border-[16px] border-slate-800 p-8 flex flex-col items-center text-slate-900"
                style={{ 
                  backgroundImage: "radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)",
                  boxShadow: "inset 0 0 0 4px #e2e8f0, 0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
                }}
              >
                {/* Background watermarks */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                  <ShieldCheck className="w-96 h-96" />
                </div>
                <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-amber-600/20 pointer-events-none"></div>
                <div className="absolute top-6 left-6 right-6 bottom-6 border border-amber-600/10 pointer-events-none"></div>

                {/* Header */}
                <div className="text-center mt-6 z-10">
                  <h4 className="text-amber-700 tracking-[0.3em] text-sm font-bold uppercase mb-4">VoltPro Academy</h4>
                  <h1 className="text-4xl md:text-5xl font-serif text-slate-900 font-black tracking-tight mb-2">
                    Certificate of Mastery
                  </h1>
                  <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 mb-8 rounded-full"></div>
                </div>

                {/* Body */}
                <div className="text-center space-y-6 z-10 flex-1 flex flex-col justify-center">
                  <p className="text-slate-500 italic text-lg font-serif">This is to certify that</p>
                  <h2 className="text-4xl md:text-5xl font-serif text-slate-900 font-bold border-b border-slate-300 pb-2 inline-block px-12">
                    {userProgress.name}
                  </h2>
                  <p className="text-slate-600 font-serif max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                    has successfully completed all rigorous academic requirements, simulations, and examinations necessary to achieve the title of
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-amber-700 uppercase tracking-widest">
                    {userProgress.tierTitle}
                  </h3>
                </div>

                {/* Footer with Seal & Signatures */}
                <div className="w-full flex items-end justify-between mt-8 z-10 px-8">
                  <div className="text-center">
                    <div className="w-40 border-b border-slate-400 mb-2">
                      <span className="font-serif text-xl text-slate-700">VoltPro AI Sys</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Lead Instructor</p>
                  </div>

                  {/* The Seal */}
                  <div className="relative group w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-amber-500 rounded-full opacity-20 blur-xl"></div>
                    <div className="w-28 h-28 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white relative z-10">
                      <div className="w-24 h-24 border border-amber-300 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 flex items-center justify-center rotate-[-15deg]">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-100/50">
                            <path id="curve" d="M 10 50 A 40 40 0 1 1 90 50 A 40 40 0 1 1 10 50" fill="transparent"/>
                            <text width="100" className="text-[10px] font-bold uppercase tracking-widest" fill="currentColor">
                              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                                Official Seal of Excellence
                              </textPath>
                            </text>
                          </svg>
                        </div>
                        <ShieldCheck className="w-10 h-10 text-amber-100" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-40 border-b border-slate-400 mb-2 font-serif text-lg text-slate-700 pb-1">
                      {today}
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Date of Issuance</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
