import { useState, useEffect, useRef } from 'react';
import { galleryItems } from '../data';
import { X, ZoomIn } from 'lucide-react';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Kitchen', value: 'kitchen' },
  { label: 'Living Room', value: 'living' },
  { label: 'Bedroom', value: 'bedroom' },
  { label: 'Bathroom', value: 'bathroom' },
  { label: 'Office', value: 'office' },
  { label: 'Modern', value: 'modern' },
  { label: 'Classic', value: 'classic' },
];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [visible, setVisible] = useState({});

  const filtered = galleryItems.filter(
    item => active === 'all' || item.cat === active || item.style === active
  );

  const itemRefs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(prev => ({ ...prev, [e.target.dataset.id]: true }));
      }),
      { threshold: 0.1 }
    );
    Object.values(itemRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-[#0f0e0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-brand-500 font-semibold tracking-widest uppercase text-sm">Portfolio</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Our Recent Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Filter by room type or design style</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up">
          {filters.map(f => (
            <button key={f.value} onClick={() => { setActive(f.value); setVisible({}); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === f.value
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 scale-105'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-white/15'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div key={item.id}
              ref={el => itemRefs.current[item.id] = el}
              data-id={item.id}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer shadow-md
                         transition-all duration-500"
              style={{
                opacity: visible[item.id] ? 1 : 0,
                transform: visible[item.id] ? 'none' : 'translateY(30px) scale(0.95)',
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
              }}
              onClick={() => setLightbox(item)}>
              <img src={item.img} alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-4
                              opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                <span className="text-brand-300 text-xs capitalize">{item.cat} · {item.style}</span>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm
                              flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn size={14} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">No projects found for this filter.</div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full rounded-2xl shadow-2xl" />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
              <p className="font-semibold">{lightbox.title}</p>
              <p className="text-xs text-gray-300 capitalize">{lightbox.cat} · {lightbox.style}</p>
            </div>
            <button onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm
                         flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
