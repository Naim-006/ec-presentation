import { motion } from "motion/react";

export const ACWaveform = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden bg-blue-50/50 rounded-xl border border-blue-100">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-full h-[1px] bg-blue-400" />
        <div className="absolute h-full w-[1px] bg-blue-400" />
      </div>
      <svg
        viewBox="0 0 800 200"
        className="w-full h-full preserve-3d"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 100 Q 50 20, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: [
              "M 0 100 Q 50 20, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100",
              "M 0 100 Q 50 180, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100",
              "M 0 100 Q 50 20, 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
      <div className="absolute bottom-2 right-4 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
        AC Waveform (50Hz)
      </div>
    </div>
  );
};

export const RLCIcons = () => {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-slate-100"
      >
        <svg width="60" height="40" viewBox="0 0 60 40" className="text-blue-600">
          <path d="M 0 20 L 10 20 L 15 10 L 25 30 L 35 10 L 45 30 L 50 20 L 60 20" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="font-bold text-slate-700">Resistance (R)</span>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-slate-100"
      >
        <svg width="60" height="40" viewBox="0 0 60 40" className="text-blue-600">
          <path d="M 0 20 L 10 20 C 10 10, 20 10, 20 20 C 20 10, 30 10, 30 20 C 30 10, 40 10, 40 20 C 40 10, 50 10, 50 20 L 60 20" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="font-bold text-slate-700">Inductance (L)</span>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
        className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-slate-100"
      >
        <svg width="60" height="40" viewBox="0 0 60 40" className="text-blue-600">
          <path d="M 0 20 L 25 20 M 25 10 L 25 30 M 35 10 L 35 30 M 35 20 L 60 20" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="font-bold text-slate-700">Capacitance (C)</span>
      </motion.div>
    </div>
  );
};

export const FrequencyMeter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800"
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-tighter text-slate-400">System Frequency</span>
        <div className="flex items-baseline gap-1">
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-3xl font-mono font-bold text-blue-400"
          >
            50.00
          </motion.span>
          <span className="text-sm font-medium">Hz</span>
        </div>
      </div>
      <div className="h-10 w-[1px] bg-slate-700" />
      <div className="text-[10px] text-slate-400 leading-tight">
        BANGLADESH<br />POWER GRID
      </div>
    </motion.div>
  );
};

export const FormulaDisplay = ({ title, formula, relation }: { title: string; formula: string; relation?: string }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-700 shadow-xl"
    >
      <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">{title}</h4>
      <div className="text-4xl font-mono text-center py-4 bg-slate-800/50 rounded-xl border border-slate-700 mb-4">
        {formula}
      </div>
      {relation && (
        <div className="text-sm text-slate-400 text-center italic">
          Relation: <span className="text-blue-300 font-bold">{relation}</span>
        </div>
      )}
    </motion.div>
  );
};

export const ComparisonTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white"
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-bottom border-slate-200">
            <th className="p-3 text-xs font-bold text-slate-500 uppercase">Parameter</th>
            <th className="p-3 text-xs font-bold text-blue-600 uppercase">Inductor (L)</th>
            <th className="p-3 text-xs font-bold text-blue-600 uppercase">Capacitor (C)</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr className="border-b border-slate-100">
            <td className="p-3 font-medium text-slate-600">Reactance Formula</td>
            <td className="p-3 font-mono">XL = 2πfL</td>
            <td className="p-3 font-mono">XC = 1/(2πfC)</td>
          </tr>
          <tr className="border-b border-slate-100 bg-blue-50/30">
            <td className="p-3 font-medium text-slate-600">If Frequency ↑</td>
            <td className="p-3 text-red-600 font-bold">XL Increases</td>
            <td className="p-3 text-green-600 font-bold">XC Decreases</td>
          </tr>
          <tr className="border-b border-slate-100">
            <td className="p-3 font-medium text-slate-600">Current (I)</td>
            <td className="p-3">Decreases</td>
            <td className="p-3">Increases</td>
          </tr>
          <tr>
            <td className="p-3 font-medium text-slate-600">Phase Relation</td>
            <td className="p-3 text-xs">Voltage leads Current</td>
            <td className="p-3 text-xs">Current leads Voltage</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

export const ResonanceVisual = () => {
  return (
    <div className="relative w-full h-40 bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-2 left-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resonance Curve</div>
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <line x1="10" y1="90" x2="190" y2="90" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="10" y1="90" x2="10" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <motion.path
          d="M 20 85 Q 100 -20, 180 85"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="32"
          r="3"
          fill="#ef4444"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 1.5 }}
        />
        <motion.line
          x1="100"
          y1="32"
          x2="100"
          y2="90"
          stroke="#ef4444"
          strokeWidth="1"
          strokeDasharray="2,2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />
        <text x="100" y="98" fontSize="6" textAnchor="middle" fill="#64748b" className="font-mono">fr</text>
        <text x="105" y="30" fontSize="6" fill="#ef4444" className="font-bold">Max Current</text>
      </svg>
    </div>
  );
};

export const CapacitorWaveform = () => {
  return (
    <div className="relative w-full h-40 bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-2 left-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phase Relation (i leads v by 90&deg;)</div>
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <defs>
          <clipPath id="graphClip">
            <rect x="10" y="0" width="190" height="100" />
          </clipPath>
        </defs>
        
        {/* Axes */}
        <line x1="10" y1="50" x2="190" y2="50" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="10" y1="10" x2="10" y2="90" stroke="#cbd5e1" strokeWidth="1" />
        
        {/* Voltage Wave (sin) */}
        <motion.path
          d="M 10 50 Q 30 10, 50 50 T 90 50 T 130 50 T 170 50 T 210 50"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          clipPath="url(#graphClip)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Current Wave (cos) -> leads voltage by 90 degrees (shifted left by 20 units) */}
        <motion.path
          d="M -10 50 Q 10 10, 30 50 T 70 50 T 110 50 T 150 50 T 190 50 T 230 50"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="4 2"
          clipPath="url(#graphClip)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Legend */}
        <g transform="translate(140, 10)">
          <line x1="0" y1="0" x2="10" y2="0" stroke="#ef4444" strokeWidth="2" />
          <text x="15" y="3" fontSize="8" fill="#ef4444" className="font-bold">v(t)</text>
          
          <line x1="0" y1="12" x2="10" y2="12" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
          <text x="15" y="15" fontSize="8" fill="#3b82f6" className="font-bold">i(t)</text>
        </g>
      </svg>
    </div>
  );
};

