import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const YT_VIDEO_ID = '5JBKlur485k';

export default function Showreel() {
  const sectionRef  = useRef(null);
  const iframeRef   = useRef(null);
  const [ready, setReady] = useState(false);

  /* ── Reveal the iframe only after section enters view (avoids
        invisible autoplay being blocked before user scrolls here) ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* YouTube embed URL params:
       autoplay=1       – start playing when loaded
       mute=0           – unmuted by default
       rel=0            – no related videos at end
       modestbranding=1 – minimal YouTube branding
       controls=1       – show YT native controls
       loop=1           – loop the video
       playlist=ID      – required for loop to work with embed
  */
  const embedSrc = `https://www.youtube.com/embed/${YT_VIDEO_ID}` +
    `?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1&loop=1&playlist=${YT_VIDEO_ID}&enablejsapi=1`;

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-white flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">

        {/* ── Section heading ── */}
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

        {/* ── YouTube Embed Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-950 shadow-2xl shadow-slate-200/60 relative"
          style={{ aspectRatio: '16/9' }}
        >
          {ready ? (
            <iframe
              ref={iframeRef}
              src={embedSrc}
              title="Editing Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            /* Placeholder shown before section enters view */
            <div className="w-full h-full flex items-center justify-center bg-slate-950">
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <div className="w-10 h-10 rounded-full border-2 border-green-600 border-t-transparent animate-spin" />
                <span className="font-mono text-xs tracking-widest uppercase">Loading Reel…</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Bottom meta strip ── */}
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
