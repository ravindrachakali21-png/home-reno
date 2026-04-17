import { useState, useEffect, useRef } from 'react';
import { testimonials } from '../data';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(n)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#d97418">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef(null);

  const go = (n) => {
    setIdx(n);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIdx(i => (i + 1) % testimonials.length);
      setAnimKey(k => k + 1);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const t = testimonials[idx];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-[#0f0e0d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-brand-500 font-semibold tracking-widest uppercase text-sm">Reviews</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial */}
          <div key={animKey}
            className="relative bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-xl"
            style={{ animation: 'testimonialSlide 0.5s ease forwards' }}>

            <Quote size={48} className="text-brand-200 dark:text-brand-800 mx-auto mb-6" />

            <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl leading-relaxed italic mb-8">
              "{t.text}"
            </p>

            <div className="flex flex-col items-center gap-3">
              <img src={t.avatar} alt={t.name}
                className="w-14 h-14 rounded-full object-cover ring-3 ring-brand-500/30"
                loading="lazy" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.role}</p>
                <div className="flex justify-center mt-2 gap-1">
                  <Stars />
                </div>
              </div>
              <span className="text-xs bg-brand-50 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 px-3 py-1 rounded-full">
                {t.project}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={() => go((idx - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-brand-50 dark:hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  className={`rounded-full transition-all ${idx === i ? 'w-8 h-3 bg-brand-500' : 'w-3 h-3 bg-gray-300 dark:bg-gray-600'}`} />
              ))}
            </div>
            <button onClick={() => go((idx + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-brand-50 dark:hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* All testimonial mini cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {testimonials.map((t, i) => (
            <button key={t.id} onClick={() => go(i)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                idx === i
                  ? 'bg-brand-500/10 border-2 border-brand-500/50 shadow-lg'
                  : 'bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-brand-300'
              }`}>
              <div className="flex items-center gap-2 mb-2">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{t.name}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{t.text.slice(0, 60)}...</p>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes testimonialSlide {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
