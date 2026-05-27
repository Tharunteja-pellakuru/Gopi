import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Magnet from './Magnet';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Showreel', href: '#showreel' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Monitor scrolling to add background blur/color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className={`fixed top-[6px] left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => handleScrollTo(e, '#home')} 
            className="flex items-center gap-2 group cursor-none"
            data-cursor="link"
          >
            {/* Brand Name */}
            <span className="font-clash text-3xl md:text-4xl font-bold tracking-tight text-slate-900 group-hover:text-green-600 transition-colors duration-300">
              GOPI<span className="text-green-600 group-hover:text-green-500 transition-colors">.</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, idx) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Magnet range={20} strength={0.3} className="px-3 py-2">
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="font-general text-sm font-medium text-slate-600 hover:text-green-600 transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </Magnet>
                
                {/* Active Hover Background Tag */}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navHover"
                    className="absolute inset-0 bg-green-50 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Magnet range={30} strength={0.25}>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-600 text-white font-general text-xs font-semibold hover:bg-green-700 shadow-sm shadow-green-500/10 transition-colors cursor-none"
                data-cursor="link"
              >
                Let's Edit <ArrowUpRight size={14} />
              </a>
            </Magnet>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-900 hover:text-green-600 transition-colors cursor-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-6 text-center">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ delay: idx * 0.08, ease: 'easeOut' }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="font-clash text-3xl font-semibold text-slate-600 hover:text-green-600 transition-all duration-300"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
              
              {/* CTA in mobile menu */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.08, ease: 'easeOut' }}
                className="mt-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-general text-sm font-semibold shadow-md shadow-green-500/10 transition-colors"
                >
                  Get In Touch <ArrowUpRight size={16} />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
