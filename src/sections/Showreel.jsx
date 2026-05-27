import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const shouldPlay   = useRef(false);  // tracks whether section is in view

  useEffect(() => {
    let player = null;

    /* ── Start playing + unmute helper ─────────── */
    const startPlay = () => {
      const p = playerRef.current;
      if (!p) return;
      p.playVideo();
      setTimeout(() => {
        try { p.unMute(); p.setVolume(80); } catch (_) {}
      }, 600);
    };

    /* ── IntersectionObserver ────────────────────
       Fires when the player card is vertically centered
       (within the middle ~40% of the viewport).         */
    const observer = new IntersectionObserver(([entry]) => {
      shouldPlay.current = entry.isIntersecting;
      const p = playerRef.current;
      if (!p) return;                 // player not ready yet — flag is set
      if (entry.isIntersecting) {
        startPlay();
      } else {
        try { p.pauseVideo(); p.mute(); } catch (_) {}
      }
    }, { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' });

    if (sectionRef.current) observer.observe(sectionRef.current);

    /* ── Load YT API then create player ────────── */
    loadYTScript().then(() => {
      player = new window.YT.Player(divRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay:      0,
          mute:          1,   // start muted for autoplay policy
          loop:          1,
          playlist:      YT_VIDEO_ID,
          rel:           0,
          modestbranding:1,
          controls:      0,   // hide control bar
          disablekb:     1,
          iv_load_policy:3,
        },
        events: {
          onReady(e) {
            playerRef.current = e.target;
            /* If section was already scrolled into view before player loaded */
            if (shouldPlay.current) startPlay();
          },
        },
      });
    });

    return () => {
      observer.disconnect();
      try { player?.destroy(); } catch (_) {}
    };
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
          <div ref={divRef} className="w-full h-full" />
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
