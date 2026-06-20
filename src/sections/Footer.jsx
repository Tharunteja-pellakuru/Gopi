import Magnet from '../components/Magnet';
import logoImg from '../assets/Logo.png';

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
            className="cursor-none flex items-center gap-2 mb-1 group h-8 md:h-10 relative w-28 md:w-36"
            data-cursor="link"
          >
            <img 
              src={logoImg} 
              alt="PG Video Editor" 
              className="h-full w-auto object-contain transition-transform duration-300 scale-[2.2] md:scale-[2.8] origin-center md:origin-left md:-translate-x-10 group-hover:scale-[2.35] md:group-hover:scale-[2.95]" 
            />
          </a>
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-2">
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
            © {currentYear} PG VIDEO EDITOR. ALL CUTS RESERVED.
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

