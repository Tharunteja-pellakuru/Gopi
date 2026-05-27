import { motion } from 'framer-motion';
import Magnet from '../components/Magnet';

const softwareList = [
  {
    name: 'Premiere Pro',
    role: 'Primary NLE',
    desc: 'Timeline assembly, multi-cam editing, audio sync, and rapid cuts.',
    image: '/images/premiere.svg',
    glowColor: 'rgba(161, 93, 255, 0.12)',
    textColor: 'text-violet-600'
  },
  {
    name: 'After Effects',
    role: 'Motion Graphics',
    desc: 'VFX composites, kinetic text, speed ramping, and particle systems.',
    image: '/images/aftereffects.svg',
    glowColor: 'rgba(255, 122, 230, 0.12)',
    textColor: 'text-pink-600'
  },
  {
    name: 'DaVinci Resolve',
    role: 'Color Grading',
    desc: 'Cinematic grading, Log space matching, and node-based finishing.',
    image: '/images/resolve.svg',
    glowColor: 'rgba(16, 185, 129, 0.12)',
    textColor: 'text-emerald-600'
  },
  {
    name: 'Photoshop',
    role: 'Graphic Design',
    desc: 'Storyboard framing, thumbnail layout, and cleaning up raw assets.',
    image: '/images/photoshop.svg',
    glowColor: 'rgba(49, 168, 255, 0.12)',
    textColor: 'text-blue-600'
  },
  {
    name: 'Blender',
    role: '3D Elements',
    desc: 'Kinetic 3D typography, camera track solves, and CGI integrations.',
    image: '/images/blender.svg',
    glowColor: 'rgba(245, 158, 11, 0.12)',
    textColor: 'text-orange-500'
  }
];

// Double items for seamless infinite loops (repeated 4 times to safely span wide displays)
const doubleList = (arr) => [...arr, ...arr, ...arr, ...arr];

export default function Tools() {
  return (
    <section 
      id="tools" 
      className="relative py-24 bg-white overflow-hidden select-none"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-green-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl w-full z-10 mx-auto px-6 md:px-12 mb-16 text-center">
        <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
          Creative Pipeline
        </span>
        <h2 className="font-clash text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          SOFTWARE & TOOLS
        </h2>
        <p className="font-general text-slate-600 max-w-xl mx-auto text-sm md:text-base">
          Professional pipeline calibrated for rapid exports, visual effects composition, and heavy-duty 4K workflows.
        </p>
      </div>

      {/* Tools Auto-Scrolling Marquee Wrapper */}
      <div className="flex overflow-hidden w-full py-8 relative">
        {/* Soft edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Row (Moves Left) */}
        <motion.div 
          animate={{ x: [0, -1760] }} // 5 items * 352px (320px width + 32px gap) = 1760px step
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
          className="flex gap-8 whitespace-nowrap pr-8"
        >
          {doubleList(softwareList).map((software, idx) => (
            <Magnet key={idx} range={25} strength={0.2}>
              <div 
                className="inline-flex items-center gap-4 bg-white border border-slate-200/60 rounded-2xl p-4 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_8px_16px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-500 w-[320px] group cursor-none select-none text-left"
                data-cursor="link"
              >
                {/* Logo Wrapper */}
                <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-2.5">
                  {/* Brand glow behind logo */}
                  <div 
                    className="absolute inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ 
                      backgroundColor: software.glowColor,
                      filter: 'blur(8px)',
                      zIndex: 0
                    }} 
                  />
                  <img 
                    src={software.image} 
                    alt={software.name} 
                    className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text Details */}
                <div className="whitespace-normal flex-grow">
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-semibold block mb-0.5">
                    {software.role}
                  </span>
                  <h3 className="font-clash text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors duration-300">
                    {software.name}
                  </h3>
                  <p className="font-general text-slate-500 text-[11px] leading-snug mt-1">
                    {software.desc}
                  </p>
                </div>
              </div>
            </Magnet>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


