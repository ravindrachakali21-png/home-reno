import { useState } from 'react';
import { faqs } from '../data';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#1a1815]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-brand-500 font-semibold tracking-widest uppercase text-sm">FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Everything you need to know before getting started.</p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i} data-aos="fade-up" style={{ transitionDelay: `${i * 60}ms` }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i
                  ? 'border-brand-500/40 bg-white dark:bg-white/5 shadow-lg shadow-brand-500/10'
                  : 'border-gray-100 dark:border-white/10 bg-white dark:bg-white/3 hover:border-brand-200'
              }`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left group">
                <span className={`font-semibold text-sm md:text-base transition-colors ${
                  open === i ? 'text-brand-500' : 'text-gray-900 dark:text-white group-hover:text-brand-500'
                }`}>
                  {f.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  open === i
                    ? 'bg-brand-500 text-white rotate-0'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                }`}>
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <div className={`faq-content ${open === i ? 'open' : ''}`}>
                <p className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below FAQ */}
        <div className="text-center mt-12" data-aos="fade-up">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Still have questions?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary inline-flex items-center gap-2">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}
