import { useState, useRef, useCallback, useEffect } from 'react';
import { beforeAfter } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function BASlider({ before, after }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const getX = useCallback((clientX) => {
    const rect = ref.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMove = useCallback((clientX) => {
    if (dragging.current) setPos(getX(clientX));
  }, [getX]);

  useEffect(() => {
    const mouseMove = (e) => onMove(e.clientX);
    const touchMove = (e) => onMove(e.touches[0].clientX);
    const stop = () => { dragging.current = false; };
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('touchmove', touchMove, { passive: true });
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, [onMove]);

  return (
    <div ref={ref} className="relative w-full h-[420px] md:h-[500px] rounded-3xl overflow-hidden select-none cursor-ew-resize shadow-2xl"
      onMouseDown={(e) => { dragging.current = true; setPos(getX(e.clientX)); }}
      onTouchStart={(e) => { dragging.current = true; setPos(getX(e.touches[0].clientX)); }}>

      {/* After (full) */}
      <img src={after} alt="after" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100-pos}% 0 0)` }}>
        <img src={before} alt="before" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left: `${pos}%` }}>
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full
                        shadow-xl flex items-center justify-center z-20 cursor-ew-resize">
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
            <path d="M6 1L1 8L6 15M18 1L23 8L18 15" stroke="#d97418" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">BEFORE</div>
      <div className="absolute top-4 right-4 bg-brand-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">AFTER</div>
    </div>
  );
}

export default function BeforeAfter() {
  const [idx, setIdx] = useState(0);

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#1a1815]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-brand-500 font-semibold tracking-widest uppercase text-sm">Transformations</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            See the Difference
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Drag the slider to compare before & after results</p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center gap-3 mb-8" data-aos="fade-up">
          {beforeAfter.map((item, i) => (
            <button key={item.id} onClick={() => setIdx(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                idx === i
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                  : 'bg-white dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-white/15'
              }`}>
              {item.label}
            </button>
          ))}
        </div>

        <div data-aos="zoom-in">
          <BASlider key={idx} before={beforeAfter[idx].before} after={beforeAfter[idx].after} />
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => setIdx((idx - 1 + beforeAfter.length) % beforeAfter.length)}
            className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow flex items-center justify-center
                       hover:bg-brand-50 dark:hover:bg-white/20 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {beforeAfter.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`rounded-full transition-all ${idx === i ? 'w-6 h-2.5 bg-brand-500' : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600'}`} />
            ))}
          </div>
          <button onClick={() => setIdx((idx + 1) % beforeAfter.length)}
            className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow flex items-center justify-center
                       hover:bg-brand-50 dark:hover:bg-white/20 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
