import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film, Music, Radio, Sliders, Layers } from 'lucide-react';

const YoutubeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const services = [
  {
    title: 'Reel & TikTok Editing',
    desc: 'Retention-focused edits with premium subtitles, graphic callouts, sound effects, and hyper-fast loops that keep viewers looping.',
    time: '24-48hr Turnaround',
    icon: Film,
    accent: 'bg-green-50 text-green-600'
  },
  {
    title: 'YouTube Video Editing',
    desc: 'Full-length story assembly with dynamic intros, sound-design soundscapes, visual graphics, B-roll integration, and high pacing.',
    time: '3-5 Days Turnaround',
    icon: YoutubeIcon,
    accent: 'bg-emerald-50 text-emerald-600'
  },
  {
    title: 'Music Video Syncs',
    desc: 'Kinetic music edits synced frame-by-frame with audio rhythms. Features heavy speed ramps, color flashes, strobe transitions, and VFX.',
    time: '5-7 Days Turnaround',
    icon: Music,
    accent: 'bg-green-100 text-green-700'
  },
  {
    title: 'Short-form Campaigns',
    desc: 'Structured social video campaigns designed for personal brands and agencies to scale distribution and authority on platforms.',
    time: 'Weekly Delivery',
    icon: Radio,
    accent: 'bg-emerald-100 text-emerald-700'
  },
  {
    title: 'Color Grading (LUTS)',
    desc: 'Transform raw Log files (S-Log, D-Log, RED IPP2) into rich cinematic grades with custom styling, contrast curves, and matching tones.',
    time: 'ProRes Master Delivery',
    icon: Sliders,
    accent: 'bg-green-50 text-green-600'
  },
  {
    title: 'Motion Graphics',
    desc: 'Sleek custom typography titles, callout arrows, lower-thirds overlays, mockups, and subtle 3D tracking integrated into edits.',
    time: 'Included or Standalone',
    icon: Layers,
    accent: 'bg-emerald-50 text-emerald-600'
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0));
    }, 2000); // Auto-scroll every 2 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  const isMobile = windowWidth < 768;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0));
  };

  const getCardStyles = (idx) => {
    const offset = idx - activeIndex;
    const absOffset = Math.abs(offset);
    
    let x = 0;
    let y = 0;
    let scale = 1;
    let rotate = 0;
    let opacity = 0;
    let zIndex = 0;
    
    if (offset === 0) {
      x = 0;
      scale = 1;
      rotate = 0;
      opacity = 1;
      zIndex = 30;
    } else {
      const dir = offset > 0 ? 1 : -1;
      if (isMobile) {
        x = dir * (absOffset * 15);
        y = absOffset * 4;
        scale = 0.95 - absOffset * 0.05;
        rotate = dir * absOffset * 2;
        opacity = absOffset === 1 ? 0.35 : 0;
        zIndex = 30 - absOffset;
      } else {
        x = dir * (175 + (absOffset - 1) * 45);
        y = absOffset * 6;
        scale = 0.94 - absOffset * 0.04;
        rotate = dir * (6 + (absOffset - 1) * 2);
        if (absOffset === 1) {
          opacity = 0.65;
          zIndex = 20;
        } else if (absOffset === 2) {
          opacity = 0.3;
          zIndex = 10;
        } else if (absOffset === 3) {
          opacity = 0.08;
          zIndex = 5;
        } else {
          opacity = 0;
          zIndex = 0;
        }
      }
    }
    
    return { x, y, scale, rotate, opacity, zIndex };
  };

  return (
    <section 
      id="services" 
      className="relative py-24 bg-white flex justify-center items-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-1/4 left-[-10%] w-[50vw] h-[50vw] bg-green-500/5 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 gap-3">
          <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-1 font-semibold">
            Capabilities
          </span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            WHAT I DELIVER
          </h2>
          <p className="font-general text-slate-600 max-w-xl text-center text-sm md:text-base leading-relaxed mt-2">
            Professional video engineering services tailormade for modern digital channels, high attention spans, and creative brands.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-[480px] h-[380px] mx-auto flex items-center justify-center z-10 mt-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          
          {/* Card Stack Wrapper */}
          <div className="relative w-full h-full flex items-center justify-center">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              const style = getCardStyles(idx);
              const isActive = idx === activeIndex;
              
              return (
                <motion.div
                  key={service.title}
                  animate={{
                    x: style.x,
                    y: style.y,
                    scale: style.scale,
                    rotate: style.rotate,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 28,
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    const swipeThreshold = 50;
                    if (offset.x > swipeThreshold && activeIndex > 0) {
                      setActiveIndex(activeIndex - 1);
                    } else if (offset.x < -swipeThreshold && activeIndex < services.length - 1) {
                      setActiveIndex(activeIndex + 1);
                    }
                  }}
                  className="absolute w-full h-[350px] p-8 pt-10 rounded-[28px] bg-white border border-slate-200 hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/5 transition-shadow duration-500 flex flex-col justify-between shadow-lg shadow-slate-100/50 group cursor-none select-none"
                  data-cursor="view"
                >
                  {/* Click overlay for non-active cards to capture clicks */}
                  {!isActive && (
                    <div 
                      className="absolute inset-0 z-40 cursor-pointer rounded-[28px]" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(idx);
                      }}
                    />
                  )}

                  {/* Circular Overlapping Icon Container */}
                  <div className={`absolute -top-6 left-8 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-slate-950 text-white group-hover:bg-green-600 group-hover:scale-110' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    <IconComponent size={18} />
                  </div>

                  {/* Top-Right Timeframe Badge */}
                  <div className="absolute top-4 right-6 font-mono text-[9px] text-slate-400 tracking-wider bg-slate-50 border border-slate-100 px-3 py-1 rounded-full uppercase">
                    {service.time}
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex-grow flex flex-col justify-start">
                    <h3 className={`font-clash text-base md:text-lg font-bold text-slate-900 tracking-tight mb-3 uppercase transition-colors duration-300 ${
                      isActive ? 'group-hover:text-green-600' : ''
                    }`}>
                      {service.title}.
                    </h3>
                    <p className="font-general text-slate-500 text-xs md:text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Footer part */}
                  <div className="flex items-center gap-2 border-t border-slate-100 pt-4 mt-6">
                    <span className={`h-[1px] bg-green-500 transition-all duration-300 ${
                      isActive ? 'w-5 group-hover:w-8' : 'w-5'
                    }`} />
                    <span className="font-mono text-[9px] text-green-600 uppercase tracking-widest font-semibold">
                      {service.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
