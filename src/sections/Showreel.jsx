import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX, Maximize2, ChevronRight, ChevronLeft } from 'lucide-react';
import captionsVideo from '../assets/videos/Captions.mp4';
import portfolioVideo from '../assets/videos/Portfolio.mp4';

const VIDEOS = [
  portfolioVideo,
  captionsVideo
];



export default function Showreel() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const cardRef      = useRef(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted,     setIsMuted]     = useState(true);
  const [isPlaying,   setIsPlaying]   = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  // Use IntersectionObserver to trigger the expansion without scroll-linking
  useEffect(() => {
    // Triggers when the section is near the vertical center of the screen
    const expandObserver = new IntersectionObserver(([entry]) => {
      setIsExpanded(entry.isIntersecting);
    }, { rootMargin: "-25% 0px -25% 0px", threshold: 0 });
    
    if (containerRef.current) expandObserver.observe(containerRef.current);
    return () => expandObserver.disconnect();
  }, []);

  const width = isExpanded ? "95vw" : "85%";
  const height = isExpanded ? "92vh" : "48vw";
  const maxWidth = isExpanded ? "95vw" : "1024px";
  const maxHeight = isExpanded ? "92vh" : "576px";
  
  const textOpacity = 1;
  const textY = 0;
  const metaOpacity = 1;
  const metaY = 0;
  const borderRadius = "24px";
  const borderWidth = "1px";
  const wrapperZIndex = isExpanded ? 60 : 10;

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

  // Toggle navbar visibility based on expansion state
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('hide-navbar');
    } else {
      document.body.classList.remove('hide-navbar');
    }
    
    // Cleanup on unmount
    return () => document.body.classList.remove('hide-navbar');
  }, [isExpanded]);

  return (
    <section
      id="showreel"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-white flex flex-col justify-center items-center"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="w-full relative z-10 flex flex-col items-center justify-center">

          {/* Heading */}
          <motion.div 
            animate={{ opacity: textOpacity, y: textY }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center px-6 z-0 mb-8"
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

          {/* Player Cards Wrapper */}
          <motion.div 
            animate={{ height, width: "100%", zIndex: wrapperZIndex }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like easing
            className="relative flex justify-center items-center"
          >
            {VIDEOS.map((src, index) => {
              const isCurrent = index === currentIndex;
              const isNext = index === (currentIndex + 1) % VIDEOS.length;
              const isPrev = index === (currentIndex - 1 + VIDEOS.length) % VIDEOS.length;
              
              // Only render if visible to save DOM nodes, though for 3-5 videos mapping all is fine
              if (!isCurrent && !isNext && !isPrev && VIDEOS.length > 3) return null;

              let rotate = 0;
              let scale = 1;
              let x = 0;
              let cardZIndex = 0;
              let opacity = 0;

              if (isCurrent) {
                rotate = 0; scale = 1; x = 0; cardZIndex = 30; opacity = 1;
              } else if (isNext) {
                rotate = 4; scale = 0.95; x = 50; cardZIndex = 20; opacity = 1;
              } else if (isPrev) {
                rotate = -4; scale = 0.95; x = -50; cardZIndex = 20; opacity = 1;
              }

              return (
                <motion.div
                  key={index}
                  style={{ 
                    borderRadius,
                    borderWidth
                  }}
                  initial={false}
                  animate={{ 
                    rotate, 
                    scale, 
                    x, 
                    zIndex: cardZIndex, 
                    opacity,
                    width,
                    height,
                    maxWidth,
                    maxHeight
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute overflow-hidden border-slate-200/80 bg-slate-950 shadow-2xl shadow-slate-200/60 ${isCurrent ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'cursor-pointer pointer-events-auto'}`}
                  ref={isCurrent ? cardRef : null}
                  drag={isCurrent ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    // Prevent drag from triggering click if it moved a lot
                    if (offset.x < -50 || velocity.x < -300) {
                      nextVideo();
                    } else if (offset.x > 50 || velocity.x > 300) {
                      prevVideo();
                    }
                  }}
                  onClick={(e) => {
                    // Check if it was a drag or a click by looking at the event
                    if (isCurrent) {
                      toggleMute(e);
                    } else {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <video
                    ref={isCurrent ? videoRef : null}
                    src={src}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    autoPlay={isCurrent}
                    muted={isCurrent ? isMuted : true}
                    onPlay={isCurrent ? () => setIsPlaying(true) : undefined}
                    onPause={isCurrent ? () => setIsPlaying(false) : undefined}
                  />

                  {/* UI Overlay (Only on Current Card) */}
                  {isCurrent && (
                    <>
                      {/* Video navigation controls (Left / Right) - shown on hover */}
                      <AnimatePresence>
                        {VIDEOS.length > 1 && (
                          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              onClick={prevVideo}
                              className="absolute left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full
                                        bg-black/40 backdrop-blur-md border border-white/15 text-white
                                        hover:bg-green-600 hover:border-green-600 transition-all duration-200 cursor-pointer pointer-events-auto"
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
                                        hover:bg-green-600 hover:border-green-600 transition-all duration-200 cursor-pointer pointer-events-auto"
                            >
                              <ChevronRight size={24} />
                            </motion.button>
                          </div>
                        )}
                      </AnimatePresence>

                      {/* ── Bottom controls: mute + fullscreen ── */}
                      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ opacity: 1 }}>
                        <div className="group/controls flex items-center gap-2">
                          <button
                            onClick={toggleMute}
                            className="flex items-center gap-2 px-3 py-2 rounded-full
                                      bg-black/60 backdrop-blur-md border border-white/15 text-white
                                      hover:bg-green-600 hover:border-green-600 transition-all duration-200 cursor-pointer pointer-events-auto"
                          >
                            {isMuted
                              ? <><VolumeX size={15} /><span className="font-mono text-[10px] tracking-widest uppercase">Muted</span></>
                              : <><Volume2 size={15} /><span className="font-mono text-[10px] tracking-widest uppercase">Audio On</span></>
                            }
                          </button>

                          <button
                            onClick={handleFullscreen}
                            title="Fullscreen"
                            className="flex items-center gap-2 px-3 py-2 rounded-full
                                      bg-black/60 backdrop-blur-md border border-white/15 text-white
                                      hover:bg-green-600 hover:border-green-600 transition-all duration-200 cursor-pointer pointer-events-auto"
                          >
                            <Maximize2 size={15} />
                            <span className="font-mono text-[10px] tracking-widest uppercase">Full</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Video indicator dots */}
                      {VIDEOS.length > 1 && (
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-auto">
                          {VIDEOS.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === currentIndex ? 'bg-green-500 scale-125' : 'bg-white/40 hover:bg-white/80'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Meta strip */}
          <motion.div
            animate={{ opacity: metaOpacity, y: metaY }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-[8%] md:bottom-[12%] flex flex-wrap justify-center gap-x-10 gap-y-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest z-0"
          >
            <span>ProRes 422 HQ</span><span>·</span>
            <span>FPS: 23.976</span><span>·</span>
            <span>COLOR: S-LOG3.Cine</span><span>·</span>
            <span>CODEC: H.264 HEVC</span>
          </motion.div>

        </div>
    </section>
  );
}
