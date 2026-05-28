import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX, Maximize2, ChevronRight, ChevronLeft } from 'lucide-react';

const VIDEOS = [
  '/videos/Video1.mp4', 
  '/videos/Video-2.mp4', 
  '/videos/Video-3.mp4'
];

export default function Showreel() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const cardRef      = useRef(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted,     setIsMuted]     = useState(true);
  const [isPlaying,   setIsPlaying]   = useState(false);

  // Scroll animations
  // "start end" means animation starts when the top of the section enters the bottom of the viewport
  // "end end" means animation finishes when the bottom of the section leaves the bottom of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smoothly animate dimensions and border radius based on scroll position
  // 0.00 to 0.15: Container enters viewport, video moves up from bottom. (Normal size)
  // 0.15 to 0.33: Video continues to center and expands to full screen. (At 0.33, container pins)
  // 0.33 to 0.70: Video stays full screen while pinned.
  // 0.70 to 0.90: Video shrinks back to normal size while still pinned.
  // 0.90 to 1.00: Video stays normal size. (At 1.0, container unpins and scrolls away)
  const width = useTransform(scrollYProgress, [0, 0.15, 0.33, 0.7, 0.9, 1], ["85%", "85%", "100%", "100%", "85%", "85%"]);
  const height = useTransform(scrollYProgress, [0, 0.15, 0.33, 0.7, 0.9, 1], ["48vw", "48vw", "100%", "100%", "48vw", "48vw"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.15, 0.33, 0.7, 0.9, 1], ["24px", "24px", "0px", "0px", "24px", "24px"]);
  
  // Fade out surrounding text when entering full screen, fade back in when shrinking
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.75, 0.9], [1, 0, 0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3, 0.75, 0.9], [0, -40, -40, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.75, 0.9], [1, 0, 0, 1]);
  const metaY = useTransform(scrollYProgress, [0.15, 0.3, 0.75, 0.9], [0, 40, 40, 0]);

  // Max bounds for normal size, unlocking to 100% for full screen
  const maxWidth = useTransform(scrollYProgress, [0, 0.15, 0.33, 0.7, 0.9, 1], ["1024px", "1024px", "100%", "100%", "1024px", "1024px"]);
  const maxHeight = useTransform(scrollYProgress, [0, 0.15, 0.33, 0.7, 0.9, 1], ["576px", "576px", "100%", "100%", "576px", "576px"]);
  const borderWidth = useTransform(scrollYProgress, [0, 0.15, 0.33, 0.7, 0.9, 1], ["1px", "1px", "0px", "0px", "1px", "1px"]);

  // Elevate z-index above the navbar (z-50) when in fullscreen mode.
  // Using a function ensures it returns strict integers instead of interpolating floats.
  const zIndex = useTransform(scrollYProgress, (v) => (v > 0.15 && v < 0.9 ? 60 : 10));

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    const el = cardRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  };

  const nextVideo = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const prevVideo = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  const attemptPlay = (v) => {
    if (!v) return;
    v.muted = isMuted;
    v.volume = 0.9;
    v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    // When video changes, load and attempt to play
    v.load();
    attemptPlay(v);
  }, [currentIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const v = videoRef.current;
      if (!v) return;
      if (entry.isIntersecting) { 
        attemptPlay(v);
      } else { 
        v.pause(); 
        setIsPlaying(false);
      }
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMuted]);

  // Toggle navbar visibility based on video expansion
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      if (v > 0.15 && v < 0.9) {
        document.body.classList.add('hide-navbar');
      } else {
        document.body.classList.remove('hide-navbar');
      }
    });
  }, [scrollYProgress]);

  return (
    <section
      id="showreel"
      ref={containerRef}
      className="relative h-[300vh] bg-white -mb-[20vh] md:-mb-[25vh]"
    >
      {/* Sticky container that stays on screen while scrolling through the 300vh section */}
      <motion.div style={{ zIndex }} className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden pointer-events-none">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green-500/5 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="w-full relative z-10 flex flex-col items-center justify-center h-full">

          {/* Heading */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="absolute top-[8%] md:top-[12%] text-center px-6 z-0"
          >
            <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
              Featured Reel
            </span>
            <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              THE EDITING SHOWREEL
            </h2>
            <p className="font-general text-slate-600 max-w-xl mx-auto text-sm md:text-base">
              A high-octane cut showcasing rapid-fire transitions, cinematic color spaces, and tight audio beat syncs.
            </p>
          </motion.div>

          {/* Player card */}
          <motion.div
            style={{ 
              width, 
              height, 
              maxWidth, 
              maxHeight,
              borderRadius,
              borderWidth
            }}
            className="overflow-hidden border-slate-200/80 bg-slate-950 shadow-2xl shadow-slate-200/60 relative group cursor-pointer pointer-events-auto"
            ref={cardRef}
            onClick={toggleMute}
          >
            {/* HTML5 video player */}
            <video
              ref={videoRef}
              src={VIDEOS[currentIndex]}
              className="w-full h-full object-cover"
              loop
              playsInline
              autoPlay 
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video navigation controls (Left / Right) - shown on hover */}
            <AnimatePresence>
              {VIDEOS.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={prevVideo}
                    className="absolute left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full
                               bg-black/40 backdrop-blur-md border border-white/15 text-white
                               hover:bg-green-600 hover:border-green-600 transition-all duration-200 cursor-pointer
                               opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onClick={nextVideo}
                    className="absolute right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full
                               bg-black/40 backdrop-blur-md border border-white/15 text-white
                               hover:bg-green-600 hover:border-green-600 transition-all duration-200 cursor-pointer
                               opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* ── Bottom controls: mute + fullscreen ── */}
            <AnimatePresence>
              <motion.div
                key="controls"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-5 right-5 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {/* Mute toggle */}
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 px-3 py-2 rounded-full
                             bg-black/60 backdrop-blur-md border border-white/15 text-white
                             hover:bg-green-600 hover:border-green-600 transition-all duration-200 cursor-pointer"
                >
                  {isMuted
                    ? <><VolumeX size={15} /><span className="font-mono text-[10px] tracking-widest uppercase">Muted</span></>
                    : <><Volume2 size={15} /><span className="font-mono text-[10px] tracking-widest uppercase">Audio On</span></>
                  }
                </button>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  title="Fullscreen"
                  className="flex items-center gap-2 px-3 py-2 rounded-full
                             bg-black/60 backdrop-blur-md border border-white/15 text-white
                             hover:bg-green-600 hover:border-green-600 transition-all duration-200 cursor-pointer"
                >
                  <Maximize2 size={15} />
                  <span className="font-mono text-[10px] tracking-widest uppercase">Full</span>
                </button>
              </motion.div>
            </AnimatePresence>
            
            {/* Video indicator dots */}
            <AnimatePresence>
              {VIDEOS.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {VIDEOS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'bg-green-500 scale-125' : 'bg-white/40 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Meta strip */}
          <motion.div
            style={{ opacity: metaOpacity, y: metaY }}
            className="absolute bottom-[8%] md:bottom-[12%] flex flex-wrap justify-center gap-x-10 gap-y-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest z-0"
          >
            <span>ProRes 422 HQ</span><span>·</span>
            <span>FPS: 23.976</span><span>·</span>
            <span>COLOR: S-LOG3.Cine</span><span>·</span>
            <span>CODEC: H.264 HEVC</span>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
