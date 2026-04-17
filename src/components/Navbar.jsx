import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home } from 'lucide-react';
import { useDarkMode } from '../hooks';

const links = ['home','services','gallery','process','testimonials','contact'];

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useDarkMode();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 dark:bg-[#0f0e0d]/95 backdrop-blur-md shadow-lg shadow-black/5 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Home size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
            Renovate<span className="text-brand-500">Pro</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className={`text-sm font-medium capitalize transition-colors duration-200 ${
                active === link
                  ? 'text-brand-500'
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400'
              }`}>
              {link}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center
                       hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors">
            {dark ? <Sun size={16} className="text-brand-400" /> : <Moon size={16} className="text-gray-600" />}
          </button>
          <button onClick={() => scrollTo('contact')}
            className="hidden md:flex btn-primary text-sm px-5 py-2.5 rounded-full">
            Get Free Quote
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-white dark:bg-[#1a1815] border-t border-gray-100 dark:border-white/10 px-4 py-4 flex flex-col gap-3">
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className={`text-left text-sm font-medium capitalize py-2 px-3 rounded-lg transition-colors ${
                active === link
                  ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-500'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}>
              {link}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')} className="btn-primary text-sm text-center mt-2">
            Get Free Quote
          </button>
        </div>
      </div>
    </header>
  );
}
