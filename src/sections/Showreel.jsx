import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const YT_VIDEO_ID = '5JBKlur485k';

function loadYTScript() {
  if (window.YT && window.YT.Player) return Promise.resolve();
  return new Promise((resolve) => {
    if (document.getElementById('yt-iframe-api')) {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
      return;
    }
    window.onYouTubeIframeAPIReady = resolve;
    const s = document.createElement('script');
    s.id = 'yt-iframe-api';
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  });
}

export default function Showreel() {
  const sectionRef   = useRef(null);
  const playerRef    = useRef(null);
  const divRef       = useRef(null);
  const cardRef      = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [started,     setStarted]     = useState(false); // true after first click
  const [isMuted,     setIsMuted]     = useState(false);

  /* ── Called on the big play overlay click ─────────────────────
     This is a direct user gesture → browser allows unMute()     */
  const handleStart = () => {
    const p = playerRef.current;
    if (!p) return;
    p.unMute();
    p.setVolume(90);
    p.playVideo();
    setStarted(true);
    setIsMuted(false);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const p = playerRef.current;
    if (!p) return;
    if (isMuted) { p.unMute(); p.setVolume(90); setIsMuted(false); }
    else         { p.mute();                     setIsMuted(true);  }
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

  useEffect(() => {
    /* Pause when scrolled out of view, resume when back */
    const observer = new IntersectionObserver(([entry]) => {
      const p = playerRef.current;
      if (!p) return;
      if (entry.isIntersecting) { try { p.playVideo();  } catch (_) {} }
      else                      { try { p.pauseVideo(); } catch (_) {} }
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    loadYTScript().then(() => {
      new window.YT.Player(divRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay:        1,   // muted autoplay — always allowed
          mute:            1,
          loop:            1,
          playlist:        YT_VIDEO_ID,
          rel:             0,
          modestbranding:  1,
          controls:        0,
          disablekb:       1,
          iv_load_policy:  3,
        },
        events: {
          onReady(e) {
            playerRef.current = e.target;
            setPlayerReady(true);
          },
        },
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-white flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
            Featured Reel
          </span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            THE EDITING SHOWREEL
          </h2>
          <p className="font-general text-slate-600 max-w-xl mx-auto text-sm md:text-base">
            A high-octane cut showcasing rapid-fire transitions, cinematic color spaces, and tight audio beat syncs.
          </p>
        </div>

        {/* Player card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-950 shadow-2xl shadow-slate-200/60 relative"
          style={{ aspectRatio: '16/9' }}
          ref={cardRef}
        >
          {/* YT player mounts here */}
          <div ref={divRef} className="w-full h-full" />

          {/* ── Big play overlay — shown until first click ── */}
          <AnimatePresence>
            {playerReady && !started && (
              <motion.div
                key="play-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={handleStart}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer
                           bg-black/30 backdrop-blur-[2px]"
              >
                {/* Pulsing ring */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-24 h-24 rounded-full bg-white/20 animate-ping" />
                  <div className="w-20 h-20 rounded-full bg-white/15 border-2 border-white/50 backdrop-blur-md
                                  flex items-center justify-center hover:bg-green-600 hover:border-green-600
                                  transition-all duration-300 shadow-2xl">
                    <Play size={30} fill="white" className="text-white ml-1" />
                  </div>
                </div>
                <p className="mt-5 font-mono text-[11px] tracking-widest uppercase text-white/70">
                  Click to play with sound
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bottom controls: mute + fullscreen — shown after first click ── */}
          <AnimatePresence>
            {started && (
              <motion.div
                key="controls"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-5 right-5 z-20 flex items-center gap-2"
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
            )}
          </AnimatePresence>
        </motion.div>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-2 mt-8 font-mono text-[10px] text-slate-400 uppercase tracking-widest"
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
