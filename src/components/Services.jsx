import { useState } from 'react';
import { services } from '../data';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="py-24 bg-white dark:bg-[#0f0e0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-brand-500 font-semibold tracking-widest uppercase text-sm">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Our Renovation Services
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            From concept to completion, we offer end-to-end renovation services
            tailored to every room and every style.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.id} data-aos="fade-up" style={{ transitionDelay: `${i * 80}ms` }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-72"
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}>
              {/* Background image */}
              <img src={s.img} alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent
                              group-hover:from-black/90 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{s.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-white mb-1">{s.title}</h3>
                    <p className={`text-gray-300 text-sm leading-relaxed transition-all duration-400 overflow-hidden ${
                      hovered === s.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {s.desc}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 mt-3 text-brand-400 text-sm font-medium transition-all duration-300 ${
                  hovered === s.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Top badge */}
              <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br ${s.color}
                               flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                <span className="text-lg">{s.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
