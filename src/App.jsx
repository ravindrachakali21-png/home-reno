import { useScrollSpy, useAOS } from './hooks';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

const SECTIONS = ['home','services','gallery','process','testimonials','contact'];

export default function App() {
  const active = useScrollSpy(SECTIONS);
  useAOS();
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0e0d] transition-colors duration-300">
      <Loader />
      <Navbar active={active} />
      <main>
        <Hero />
        <Stats />
        <Services />
        <BeforeAfter />
        <Gallery />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
