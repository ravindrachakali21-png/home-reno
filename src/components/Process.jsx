import { steps } from '../data';

export default function Process() {
  return (
    <section id="process" className="py-24 bg-gray-50 dark:bg-[#1a1815]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-brand-500 font-semibold tracking-widest uppercase text-sm">How It Works</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Our Renovation Process
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            A transparent, hassle-free journey from consultation to the final handover.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-brand-300 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {steps.map((s, i) => (
              <div key={i} data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Content card */}
                <div className="flex-1">
                  <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-lg
                                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{s.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">{s.title}</h3>
                          <span className="text-xs bg-brand-50 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 px-2 py-1 rounded-full font-medium">
                            {s.duration}
                          </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-brand-500 text-white font-display font-bold text-lg
                                  flex items-center justify-center shadow-lg shadow-brand-500/30 ring-4 ring-white dark:ring-[#1a1815]">
                    {s.step}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
