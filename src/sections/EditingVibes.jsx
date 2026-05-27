import { motion } from 'framer-motion';
import Magnet from '../components/Magnet';

const vibesRow1 = [
  { text: 'FAST PACED', color: 'border-green-200 text-green-700 bg-green-50/30 hover:bg-green-100/50' },
  { text: 'CINEMATIC', color: 'border-emerald-200 text-emerald-700 bg-emerald-50/30 hover:bg-emerald-100/50' },
  { text: 'MUSIC SYNC', color: 'border-green-300 text-green-800 bg-green-50/40 hover:bg-green-100/60' },
  { text: 'MOODY VIBES', color: 'border-slate-200 text-slate-700 bg-slate-50/30 hover:bg-slate-100/50' },
  { text: 'EMOTIONAL', color: 'border-emerald-300 text-emerald-800 bg-emerald-50/40 hover:bg-emerald-100/60' }
];

const vibesRow2 = [
  { text: 'ENERGETIC', color: 'border-emerald-200 text-emerald-700 bg-emerald-50/30 hover:bg-emerald-100/50' },
  { text: 'VIRAL STYLE', color: 'border-green-200 text-green-700 bg-green-50/30 hover:bg-green-100/50' },
  { text: 'CLEAN TRANSITIONS', color: 'border-slate-200 text-slate-700 bg-slate-50/30 hover:bg-slate-100/50' },
  { text: 'STORY DRIVEN', color: 'border-green-300 text-green-800 bg-green-50/40 hover:bg-green-100/60' },
  { text: 'SOUND DESIGN', color: 'border-emerald-300 text-emerald-800 bg-emerald-50/40 hover:bg-emerald-100/60' }
];

// Double items for seamless infinite loops
const doubleList = (arr) => [...arr, ...arr, ...arr];

export default function EditingVibes() {
  return (
    <section 
      id="vibes" 
      className="relative py-24 bg-white overflow-hidden select-none"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-[30vw] h-[30vw] bg-green-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vw] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-left">
        <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
          Rhythm & Pacing
        </span>
        <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
          THE EDITING VIBES
        </h2>
      </div>

      {/* Marquee Row 1 (Moves Left) */}
      <div className="flex overflow-hidden w-full py-4 border-y border-slate-100 relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
          className="flex gap-6 whitespace-nowrap pr-6"
        >
          {doubleList(vibesRow1).map((vibe, idx) => (
            <Magnet key={idx} range={35} strength={0.4}>
              <div 
                className={`font-clash text-2xl md:text-4xl font-semibold border ${vibe.color} px-6 py-3 rounded-full cursor-none tracking-tight transition-all duration-300 shadow-sm`}
                data-cursor="drag"
              >
                {vibe.text}
              </div>
            </Magnet>
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (Moves Right) */}
      <div className="flex overflow-hidden w-full py-4 border-b border-slate-100 mt-6 relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
          className="flex gap-6 whitespace-nowrap pr-6"
        >
          {doubleList(vibesRow2).map((vibe, idx) => (
            <Magnet key={idx} range={35} strength={0.4}>
              <div 
                className={`font-clash text-2xl md:text-4xl font-semibold border ${vibe.color} px-6 py-3 rounded-full cursor-none tracking-tight transition-all duration-300 shadow-sm`}
                data-cursor="drag"
              >
                {vibe.text}
              </div>
            </Magnet>
          ))}
        </motion.div>
      </div>

      {/* Narrative Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 text-left">
        <p className="font-general text-slate-600 max-w-xl text-sm md:text-base leading-relaxed">
          I shape the emotional weight of every clip by matching visual rhythm with audio frequencies. Whether it is a snappy 15-second music sync transition or a slow-burning documentary storytelling arc, the pace dictates the emotion.
        </p>
      </div>
    </section>
  );
}

