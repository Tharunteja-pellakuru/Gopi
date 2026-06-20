import { motion } from 'framer-motion';
import { Play, ArrowDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Magnet from '../components/Magnet';
import profilePic from '../assets/Gopi.png';

export default function Hero() {
  const [inView, setInView] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const totalChars = 24; // "TURNING" (7) + "IDEAS INTO" (10) + "MOTION." (7)
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setCharCount(index);
      if (index >= totalChars) {
        clearInterval(interval);
      }
    }, 60);
    
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const line1Text = "TURNING".slice(0, Math.max(0, charCount));
  const line2Count = Math.max(0, charCount - 7);
  const ideasText = "IDEAS".slice(0, Math.min(5, line2Count));
  const intoText = " INTO".slice(0, Math.max(0, line2Count - 5));
  const line3Count = Math.max(0, charCount - 17);
  const motionText = "MOTION.".slice(0, line3Count);

  const showCursor1 = charCount < 7;
  const showCursor2 = charCount >= 7 && charCount < 17;
  const showCursor3 = charCount >= 17 && charCount < 24;

  const Cursor = () => (
    <span className="inline-block w-[3.5px] md:w-[5px] h-[0.85em] bg-[#fc6f03] ml-1.5 align-middle animate-pulse" />
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 lg:pt-28 pb-16 lg:pb-20 select-none bg-white"
    >
      {/* Immersive Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-[0.08] scale-[1.05] filter blur-[2px]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4d8237e32daafab9d9a11486e9e&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/90" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      {/* Hero Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

        {/* Left: Typography & Capabilities (58% width) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">

          {/* Tagline & Availability */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
          </motion.div>

          {/* Main Title (Typewritten) */}
          <h1 className="font-clash text-4xl md:text-6xl lg:text-7xl xl:text-[76px] font-black tracking-tight leading-[0.95] text-zinc-900 uppercase">
            <span className="block py-0.5">
              <span className="inline-block">
                {line1Text}
                {showCursor1 && <Cursor />}
              </span>
            </span>
            <span className="block py-0.5">
              <span className="inline-block">
                <span className="text-green-600 font-black">{ideasText}</span>
                {intoText}
                {showCursor2 && <Cursor />}
              </span>
            </span>
            <span className="block py-0.5">
              <span className="inline-block text-green-600 font-black">
                {motionText}
                {showCursor3 && <Cursor />}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-general text-sm md:text-base lg:text-[17px] text-zinc-500 max-w-2xl mt-4 leading-relaxed flex flex-col gap-1.5 font-medium"
          >
            <p>
              Professional Video Editor specializing in Motion Graphics, Music-Synced Edits, Color Correction, Sound Design, Podcast Editing, and Viral Short-Form Content.
            </p>
            <p>
              Every frame is crafted to keep viewers engaged from the first second to the final cut.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            <Magnet range={20} strength={0.2}>
              <a
                href="#showreel"
                onClick={(e) => handleScrollTo(e, '#showreel')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-general font-bold text-xs transition-transform cursor-none shadow-md shadow-green-500/10"
                data-cursor="play"
              >
                <Play size={12} fill="currentColor" /> Watch Showreel
              </a>
            </Magnet>

            <Magnet range={20} strength={0.2}>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-general font-bold text-xs transition-transform cursor-none shadow-sm"
                data-cursor="link"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Let's Work Together
              </a>
            </Magnet>
          </motion.div>

          {/* Tools I Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-left"
          >
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-2 font-semibold">
              Tools I Use
            </span>
            <div className="flex gap-2.5">
              <Magnet range={12} strength={0.15}>
                <div className="w-8 h-8 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center cursor-none p-1.5 shadow-sm" data-cursor="link">
                  <img src="/images/premiere.svg" className="w-full h-full object-contain" alt="Premiere Pro" />
                </div>
              </Magnet>
              <Magnet range={12} strength={0.15}>
                <div className="w-8 h-8 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center cursor-none p-1.5 shadow-sm" data-cursor="link">
                  <img src="/images/aftereffects.svg" className="w-full h-full object-contain" alt="After Effects" />
                </div>
              </Magnet>
              <Magnet range={12} strength={0.15}>
                <div className="w-8 h-8 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center cursor-none p-1.5 shadow-sm" data-cursor="link">
                  <img src="/images/resolve.svg" className="w-full h-full object-contain" alt="DaVinci Resolve" />
                </div>
              </Magnet>
              <Magnet range={12} strength={0.15}>
                <div className="w-8 h-8 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center cursor-none p-1.5 shadow-sm" data-cursor="link">
                  <img src="/images/photoshop.svg" className="w-full h-full object-contain" alt="Photoshop" />
                </div>
              </Magnet>
              <Magnet range={12} strength={0.15}>
                <div className="w-8 h-8 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center cursor-none p-1.5 shadow-sm" data-cursor="link">
                  <img src="/images/blender.svg" className="w-full h-full object-contain" alt="Blender" />
                </div>
              </Magnet>
            </div>
          </motion.div>

          {/* Bottom Left Decoration Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex items-center gap-3 font-mono text-[8px] text-slate-400 tracking-wider"
          >
            <span className="w-6 h-[1px] bg-green-500" />
            <span>• CUT. COLOR. SOUND. IMPACT.</span>
          </motion.div>
        </div>

        {/* Right: Premium Profile Image Card (42% width) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0"
        >
          {/* Leaking Green Glow behind the card */}
          <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-64 h-[400px] bg-green-500/20 rounded-full filter blur-[90px] pointer-events-none -z-10" />

          <div className="relative w-full max-w-[420px] aspect-[3/4.2] rounded-[32px] border-[5px] border-slate-950 bg-[#0d0d0d] shadow-2xl overflow-hidden group">
            {/* Profile Image with vignette bottom fade-out */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={profilePic} 
                alt="Gopi Profile" 
                className="w-full h-full object-cover object-top opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)'
                }}
              />
              {/* Soft vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent pointer-events-none" />
            </div>

            {/* HUD Header overlay */}
            <div className="absolute top-5 left-5 flex items-center gap-1.5 font-mono text-[8px] text-white/50 z-20 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>REC</span>
            </div>
            <div className="absolute top-5 right-5 font-mono text-[8px] text-white/50 z-20 select-none">
              <span>1080P 60FPS</span>
            </div>

            {/* Left Edge Vertical Text */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[7px] text-white/30 tracking-[0.3em] uppercase whitespace-nowrap z-20 select-none">
              CREATE • EDIT • INSPIRE
            </div>

            {/* Bottom Name & Signature overlay metadata */}
            <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
              <div className="w-8 h-[1px] bg-white/20 mb-3" />
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-clash text-[9px] tracking-widest font-semibold text-white/50 block">
                    PELLAKURU
                  </span>
                  <span className="font-clash text-xl lg:text-2xl font-black text-green-500 tracking-tight leading-none block mt-1">
                    GOPI CHAND
                  </span>
                  <span className="font-mono text-[8px] text-white/50 tracking-wider uppercase mt-2 block">
                    Video Editor &amp; <br />Motion Graphics Designer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Scroll Mouse Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="font-mono text-[8px] tracking-widest uppercase text-zinc-400 mb-1.5">SCROLL DOWN</span>
        <div className="w-4.5 h-8 rounded-full border border-slate-300 flex justify-center p-1.2">
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 bg-green-500 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
