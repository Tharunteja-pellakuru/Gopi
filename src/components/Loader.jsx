import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_PHRASES = [
  'INITIALIZING TIMELINE...',
  'FETCHING CINEMATICS...',
  'SYNCING AUDIO MARKS...',
  'RENDERING GLOW SHADERS...',
  'APPLYING COLOR LOOKUPS...',
  'SMOOTHING MOTION VIBES...',
  'EXPORTING MASTER PIECE...'
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Progress counter simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Create non-linear step increments for realism (slow at 40%, fast, then slow at 85%)
      let step = 1;
      if (current < 30) step = Math.floor(Math.random() * 4) + 2;
      else if (current < 70) step = Math.floor(Math.random() * 2) + 1;
      else if (current < 90) step = Math.floor(Math.random() * 3) + 1;
      else step = 1;

      current = Math.min(current + step, 100);
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // Allow fadeout animation to complete
        }, 600);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Rotate phrases based on progress
  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * LOADING_PHRASES.length),
      LOADING_PHRASES.length - 1
    );
    setPhraseIndex(idx);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            filter: 'blur(20px)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 bg-white z-[99999] flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
        >
          {/* Top Info */}
          <div className="flex justify-between items-start font-clash text-xs tracking-widest text-slate-400">
            <div>
              <p>PROJECT: PORTFOLIO_V2026.prproj</p>
              <p className="mt-1">RESOLUTION: 3840 x 2160 (UHD)</p>
            </div>
            <div className="text-right">
              <p>FPS: 60.00</p>
              <p className="mt-1 text-green-600 animate-pulse font-semibold">RENDER ACTIVE</p>
            </div>
          </div>

          {/* Center Graphic */}
          <div className="flex flex-col items-center justify-center my-auto">
            {/* Pulsing Core */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 flex items-center justify-center">
              {/* Outer glowing rings */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-dashed border-green-600/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div 
                className="absolute inset-2 rounded-full border border-green-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-600/10 to-green-500/10 blur-xl animate-pulse" />
              
              {/* Audio Waveform inside */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((scale, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-zinc-900"
                    animate={{
                      height: [16, scale * 10, 16],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: 'easeInOut',
                    }}
                    style={{ minHeight: '8px' }}
                  />
                ))}
              </div>
            </div>

            {/* Phrase */}
            <div className="h-6 overflow-hidden">
              <motion.p
                key={phraseIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-general text-sm font-medium tracking-widest text-slate-500"
              >
                {LOADING_PHRASES[phraseIndex]}
              </motion.p>
            </div>

            {/* Large Percentage */}
            <h1 className="font-clash text-7xl md:text-9xl font-extrabold tracking-tighter text-slate-900 select-none mt-2">
              {progress}%
            </h1>
          </div>

          {/* Bottom Timeline Bar */}
          <div className="w-full flex flex-col gap-4">
            {/* Timeline Marks */}
            <div className="flex justify-between text-[10px] font-mono text-slate-400 tracking-wider">
              <span>00:00:00:00</span>
              <span className="hidden sm:inline">00:00:05:00</span>
              <span className="hidden sm:inline">00:00:10:00</span>
              <span className="hidden sm:inline">00:00:15:00</span>
              <span>00:00:20:00</span>
            </div>

            {/* Scrubber Bar */}
            <div className="h-1 bg-slate-200 w-full rounded-full relative overflow-hidden">
              {/* Timeline Grid ticks */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:10px_100%]" />
              
              {/* Active Progress */}
              <motion.div
                className="h-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                {/* Glow tail */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-green-500 rounded-full" />
              </motion.div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase">
              <span>Seq-1_Draft_V4</span>
              <span>Frame: {Math.floor((progress / 100) * 1200)} / 1200</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
