import { useEffect, useState } from 'react';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div className="loader-exit fixed inset-0 z-[9999] bg-[#0f0e0d] flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="w-20 h-20 loader-pulse">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#d97418" strokeWidth="3" strokeDasharray="180 45" />
            <circle cx="40" cy="40" r="24" fill="none" stroke="#d97418" strokeWidth="2" strokeDasharray="120 30" strokeDashoffset="40" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-brand-500 text-2xl">🏠</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-display text-white text-2xl font-bold tracking-wider">RenovatePro</p>
        <p className="text-gray-400 text-sm mt-1 tracking-widest uppercase">Crafting Your Dream Space</p>
      </div>
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-brand-500 to-brand-300 rounded-full animate-[loadBar_2s_ease_forwards]"
          style={{ animation: 'loadBar 2s ease forwards' }} />
      </div>
      <style>{`@keyframes loadBar { from{width:0} to{width:100%} }`}</style>
    </div>
  );
}
