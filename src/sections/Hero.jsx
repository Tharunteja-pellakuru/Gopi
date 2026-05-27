import { motion } from 'framer-motion';
import { Play, MessageSquare, ArrowDown } from 'lucide-react';
import Magnet from '../components/Magnet';

const floatingCards = [
  {
    title: 'Music Sync',
    video: 'https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf2d061c569ff493b8655097bc8a7f14b62dbb&profile_id=165&oauth2_token_id=57447761',
    color: 'border-green-600/40',
    rotate: '-6deg',
    translateY: '0px',
    delay: 0.1
  },
  {
    title: 'Cinematic Reel',
    video: 'https://player.vimeo.com/external/409099132.sd.mp4?s=d1cc32b694b2a8d115fa7621422797e8838d172e&profile_id=165&oauth2_token_id=57447761',
    color: 'border-green-500/40',
    rotate: '4deg',
    translateY: '-20px',
    delay: 0.3
  },
  {
    title: 'Visual Flow',
    video: 'https://player.vimeo.com/external/554181213.sd.mp4?s=a7d2e06180a9d9e4a3c104445585b4b1a41cc63e&profile_id=165&oauth2_token_id=57447761',
    color: 'border-emerald-600/40',
    rotate: '-2deg',
    translateY: '20px',
    delay: 0.5
  }
];

export default function Hero() {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 md:py-0 select-none bg-white"
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
        {/* Vignette Overlay & Lights */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/90" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      {/* Hero Layout Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Tagline Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              Available For Custom Projects
            </span>
          </motion.div>

          {/* Main Title (Word Reveal Animation) */}
          <h1 className="font-clash text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-zinc-900">
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                TURNING <span className="text-glow-purple text-green-600 font-normal italic">MUSIC</span> &
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="block"
              >
                MOTION INTO
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-green-500 font-bold"
              >
                VISUAL EMOTION.
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-general text-base md:text-xl text-zinc-600 max-w-xl mt-6 leading-relaxed"
          >
            Creative Video Editor specializing in high-energy Music Syncs, Atmospheric Cinematic Reels, and Viral Social Media Content that capture attention in 0.5 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Magnet range={25} strength={0.2}>
              <a
                href="#showreel"
                onClick={(e) => handleScrollTo(e, '#showreel')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-general font-bold text-sm transition-transform cursor-none shadow-md shadow-green-500/10"
                data-cursor="play"
              >
                <Play size={16} fill="currentColor" /> Watch Showreel
              </a>
            </Magnet>

            <Magnet range={25} strength={0.2}>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-general font-bold text-sm transition-transform cursor-none shadow-sm"
                data-cursor="link"
              >
                <MessageSquare size={16} /> Let's Work
              </a>
            </Magnet>
          </motion.div>
        </div>

        {/* Right Side: Floating Cinematic Stacked Previews */}
        <div className="lg:col-span-5 relative flex items-center justify-center h-[420px] lg:h-auto lg:pt-20">
          <div className="relative w-full max-w-[280px] sm:max-w-[290px] aspect-[9/16] mt-8 lg:mt-0">
            {floatingCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: card.rotate,
                  y: [card.translateY, `${parseInt(card.translateY) - 10}px`, card.translateY] 
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: card.delay },
                  scale: { duration: 0.8, delay: card.delay },
                  rotate: { duration: 0.8, delay: card.delay },
                  y: { 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: 'easeInOut', 
                    delay: idx * 0.5 
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: '0deg', 
                  zIndex: 30,
                  transition: { duration: 0.3 }
                }}
                className={`absolute inset-0 bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40 group cursor-none`}
                data-cursor="view"
                style={{ 
                  zIndex: 10 + idx,
                  transformOrigin: 'bottom center'
                }}
              >
                {/* Silent Autoplay Video inside stack */}
                <video 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={card.video} type="video/mp4" />
                </video>
                
                {/* Floating Card Title Label */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200/40 px-3 py-1 rounded-full">
                  <span className="font-mono text-[10px] text-slate-800 tracking-widest uppercase">
                    {card.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Anchor */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, '#work')}
            className="w-8 h-8 rounded-full border border-black/5 bg-black/5 flex items-center justify-center text-zinc-600 hover:text-black transition-colors cursor-none"
          >
            <ArrowDown size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
