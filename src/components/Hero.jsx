import { useEffect, useRef } from 'react';
import { ChevronDown, Star, Play, ArrowRight } from 'lucide-react';
import { useRipple } from '../hooks';
import { motion } from 'framer-motion';

const heroSlides = [
  'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1920&q=85',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=85',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=85',
];

export default function Hero() {
  const ripple = useRipple();
  const slideRef = useRef(0);
  const imgRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      slideRef.current = (slideRef.current + 1) % heroSlides.length;
      if (imgRef.current) {
        imgRef.current.style.opacity = '0';
        setTimeout(() => {
          if (imgRef.current) {
            imgRef.current.src = heroSlides[slideRef.current];
            imgRef.current.style.opacity = '1';
          }
        }, 500);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToWork = () => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <img ref={imgRef} src={heroSlides[0]} alt="hero"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 scale-105"
        loading="eager" />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-brand-400/40 rounded-full"
            style={{
              left: `${10 + i * 15}%`, top: `${20 + i * 10}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }} />
        ))}
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.5)} }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/40 backdrop-blur-sm
                       rounded-full px-4 py-2 mb-6">
            <Star size={14} className="text-brand-400 fill-brand-400" />
            <span className="text-brand-300 text-sm font-medium">Rated #1 Renovation Company in India</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Transform Your{' '}
            <span className="italic text-brand-400">Dream Home</span>
            <br />Into Reality
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Premium renovations crafted with precision. From kitchens to bathrooms —
            we turn your vision into a masterpiece.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4">
            <button onClick={(e) => { ripple(e); scrollToContact(); }}
              className="btn-primary flex items-center justify-center gap-2 group">
              Get Free Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={scrollToWork}
              className="flex items-center justify-center gap-3 text-white font-semibold border-2 border-white/30
                         hover:border-white/70 backdrop-blur-sm rounded-full px-8 py-4 transition-all duration-300
                         hover:bg-white/10 group">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={12} className="text-white fill-white ml-0.5" />
              </div>
              View Our Work
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
            className="flex flex-wrap gap-6 mt-12">
            {['1,240+ Projects', '98% Satisfaction', '2-Year Warranty'].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                  <svg width="10" height="8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {heroSlides.map((_, i) => (
          <div key={i} className={`rounded-full bg-white transition-all duration-300 ${slideRef.current === i ? 'w-6 h-2' : 'w-2 h-2 opacity-40'}`} />
        ))}
      </div>
    </section>
  );
}
