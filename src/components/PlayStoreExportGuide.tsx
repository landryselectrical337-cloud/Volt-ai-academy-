import React from "react";
import { Download, Smartphone, Terminal, Package, ArrowRight, CheckCircle2, PlaySquare } from "lucide-react";

export const PlayStoreExportGuide: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <Smartphone className="w-7 h-7 text-emerald-400" />
            <span>Play Store Export Guide (.aab / APK)</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Follow these steps to generate your Android App Bundle for the Google Play Store.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 font-black text-sm border-4 border-slate-950">
            1
          </div>
          <h3 className="text-lg font-bold text-white mb-2 mt-2">Export Project</h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Download the source code from AI Studio to your local computer.
          </p>
          <ul className="space-y-2 text-xs font-medium text-slate-300">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Click "Export" → "Download ZIP" in AI Studio (top right corner).</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Extract the ZIP folder on your Mac or PC.</span>
            </li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 font-black text-sm border-4 border-slate-950">
            2
          </div>
          <h3 className="text-lg font-bold text-white mb-2 mt-2">Install & Build</h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Open the extracted folder in your terminal and run the build process.
          </p>
          
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 font-mono text-[10px] text-slate-300 space-y-1 mb-2">
            <div><span className="text-emerald-400"># Install dependencies</span></div>
            <div>npm install</div>
            <div className="pt-2"><span className="text-emerald-400"># Build the web assets</span></div>
            <div>npm run build</div>
            <div className="pt-2"><span className="text-emerald-400"># Sync to Android project</span></div>
            <div>npx cap sync android</div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-slate-950 font-black text-sm border-4 border-slate-950">
            3
          </div>
          <h3 className="text-lg font-bold text-white mb-2 mt-2">Generate .aab</h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Use Android Studio to generate the final release bundle.
          </p>
          <ul className="space-y-3 text-xs font-medium text-slate-300">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Run <code className="bg-slate-950 text-amber-300 px-1 py-0.5 rounded">npx cap open android</code> in your terminal.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>In Android Studio, go to <strong>Build</strong> → <strong>Generate Signed Bundle / APK</strong>.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Select <strong>Android App Bundle</strong>, create a Keystore, and click Finish.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <PlaySquare className="w-5 h-5 text-amber-400" />
          <span>Publishing to Google Play</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="https://developer.android.com/studio" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Download Android Studio</div>
                <div className="text-[10px] text-slate-400">Required to compile the .aab file locally</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400" />
          </a>

          <a href="https://play.google.com/console" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Google Play Console</div>
                <div className="text-[10px] text-slate-400">Upload your generated .aab here</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400" />
          </a>
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <h4 className="text-sm font-bold text-blue-400 mb-1">Pre-configured for you!</h4>
          <p className="text-xs text-slate-300">
            Capacitor has already been installed and initialized in this repository. 
            The package ID is set to <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">com.voltpro.academy</code>. 
            Once you download the ZIP, all you have to do is build it and open it in Android Studio.
          </p>
        </div>
      </div>
    </div>
  );
};
