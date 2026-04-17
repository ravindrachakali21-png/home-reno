import { useRef, useState, useEffect } from 'react';
import { stats } from '../data';
import { useCounter } from '../hooks';

function StatItem({ value, label, suffix, started }) {
  const count = useCounter(value, 2000, started);
  return (
    <div className="text-center" data-aos="fade-up">
      <div className="font-display text-4xl md:text-5xl font-bold text-brand-500 mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-[#1a1815] border-y border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
