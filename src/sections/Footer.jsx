import Magnet from '../components/Magnet';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200/60 py-12 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo and Tagline */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <a 
            href="#home" 
            onClick={handleScrollToTop} 
            className="cursor-none flex items-center gap-2 mb-1 group"
            data-cursor="link"
          >
            <span className="font-clash text-2xl md:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-green-600 transition-colors duration-300">
              GOPI<span className="text-green-600">.</span>
            </span>
          </a>
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">
            TRANSITIONS • COLOR • RHYTHM • PACING
          </p>
        </div>

        {/* Cinematic slogan */}
        <div className="text-center">
          <p className="font-general text-xs text-slate-500 italic">
            "Every frame counts. Every beat connects."
          </p>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end gap-2">
          <p className="font-mono text-[10px] text-slate-400">
            © {currentYear} GOPI. ALL CUTS RESERVED.
          </p>
          <Magnet range={15} strength={0.3}>
            <a
              href="#home"
              onClick={handleScrollToTop}
              className="font-mono text-[10px] text-green-600 hover:text-green-700 hover:underline uppercase tracking-wider cursor-none font-semibold"
              data-cursor="link"
            >
              [BACK TO TOP PANEL]
            </a>
          </Magnet>
        </div>

      </div>
    </footer>
  );
}

