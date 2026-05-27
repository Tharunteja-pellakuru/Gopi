import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

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
  const sectionRef = useRef(null);
  const playerRef  = useRef(null);
  const divRef     = useRef(null);
  const shouldPlay = useRef(false);
  const [isMuted, setIsMuted] = useState(true);   // start muted for autoplay
  const [playerReady, setPlayerReady] = useState(false);

  /* ── Toggle mute — requires user gesture so always works ── */
  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (isMuted) {
      p.unMute();
      p.setVolume(90);
      setIsMuted(false);
    } else {
      p.mute();
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const startPlay = () => {
      const p = playerRef.current;
      if (!p) return;
      p.playVideo();
      // Keep muted — user must click to unmute (browser policy)
    };

    /* Observer — pause when scrolled out of view */
    const observer = new IntersectionObserver(([entry]) => {
      shouldPlay.current = entry.isIntersecting;
      const p = playerRef.current;
      if (!p) return;
      if (entry.isIntersecting) {
        try { p.playVideo(); } catch (_) {}
      } else {
        try { p.pauseVideo(); } catch (_) {}
      }
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    loadYTScript().then(() => {
      new window.YT.Player(divRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay:       1,
          mute:           1,
          loop:           1,
          playlist:       YT_VIDEO_ID,
          rel:            0,
          modestbranding: 1,
          controls:       0,
          disablekb:      1,
          iv_load_policy: 3,
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
      {/* Ambient glow */}
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
        >
          {/* YT player target */}
          <div ref={divRef} className="w-full h-full" />

          {/* ── Mute / Unmute button overlay ── */}
          <AnimatePresence>
            {playerReady && (
              <motion.button
                key="mute-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={toggleMute}
                className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-4 py-2 rounded-full
                           bg-black/60 backdrop-blur-md border border-white/15 text-white
                           hover:bg-green-600 hover:border-green-600
                           transition-all duration-200 cursor-pointer shadow-lg"
              >
                {isMuted ? (
                  <>
                    <VolumeX size={16} />
                    <span className="font-mono text-[10px] tracking-widest uppercase">Click to Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={16} />
                    <span className="font-mono text-[10px] tracking-widest uppercase">Mute</span>
                  </>
                )}
              </motion.button>
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
          <span>ProRes 422 HQ</span>
          <span>·</span>
          <span>FPS: 23.976</span>
          <span>·</span>
          <span>COLOR: S-LOG3.Cine</span>
          <span>·</span>
          <span>CODEC: H.264 HEVC</span>
        </motion.div>

      </div>
    </section>
  );
}
