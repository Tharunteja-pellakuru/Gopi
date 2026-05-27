import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize2, X,
  Activity, Rewind, FastForward, Sliders, Gauge, ExternalLink,
} from 'lucide-react';
import Magnet from '../components/Magnet';
import showreelVideo from '../assets/videos/Video-1.mp4';

const SPEEDS = [1, 1.5, 2];

/* ─── brief flash icon when tapping play/pause ─────────────── */
function FlashIcon({ playing }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={playing ? 'play' : 'pause'}
        initial={{ opacity: 1, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.4 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none"
      >
        {playing
          ? <Play  size={52} className="text-white drop-shadow-xl" fill="currentColor" />
          : <Pause size={52} className="text-white drop-shadow-xl" fill="currentColor" />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Showreel() {
  /* ── modal player state ─────────────────────────── */
  const [modalOpen,    setModalOpen]    = useState(false);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [isMuted,      setIsMuted]      = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [currentTime,  setCurrentTime]  = useState('00:00');
  const [duration,     setDuration]     = useState('00:00');

  /* ── preview card state ─────────────────────────── */
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [previewMuted,   setPreviewMuted]   = useState(false);
  const [previewSpeed,   setPreviewSpeed]   = useState(0);   // index into SPEEDS
  const [showFlash,      setShowFlash]      = useState(false);
  const [flashPlaying,   setFlashPlaying]   = useState(false);

  const previewVideoRef = useRef(null);
  const modalVideoRef   = useRef(null);
  const sectionRef      = useRef(null);
  const isInView        = useRef(false);

  /* ══════════════════════════════════════════════════
     PREVIEW VIDEO CONTROLS
  ══════════════════════════════════════════════════ */

  /* On mount: try unmuted autoplay first; fall back to muted if browser blocks */
  useEffect(() => {
    const vid = previewVideoRef.current;
    if (!vid) return;
    vid.muted = false;
    vid.play().catch(() => {
      /* Browser blocked unmuted autoplay — fall back to muted */
      vid.muted = true;
      setPreviewMuted(true);
      vid.play().catch(() => {});
    });
  }, []);

  /* Auto-play + unmute when section scrolls ≥50% into view */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      const vid = previewVideoRef.current;
      if (!vid) return;
      isInView.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        vid.muted = false;
        setPreviewMuted(false);
        vid.play().catch(() => {
          /* If unmuted play is blocked, fall back to muted */
          vid.muted = true;
          setPreviewMuted(true);
          vid.play().catch(() => {});
        });
      } else {
        vid.pause();
        vid.muted = true;
        setPreviewMuted(true);
      }
    }, { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* Click on card → toggle play / pause */
  const handleCardClick = useCallback(() => {
    const vid = previewVideoRef.current;
    if (!vid) return;
    const willPlay = vid.paused;
    if (willPlay) { vid.play().catch(() => {}); }
    else          { vid.pause(); }
    /* show flash icon briefly */
    setFlashPlaying(willPlay);
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 600);
  }, []);

  const togglePreviewMute = (e) => {
    e.stopPropagation();
    const vid = previewVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setPreviewMuted(vid.muted);
  };

  const cyclePreviewSpeed = (e) => {
    e.stopPropagation();
    const vid = previewVideoRef.current;
    if (!vid) return;
    const next = (previewSpeed + 1) % SPEEDS.length;
    vid.playbackRate = SPEEDS[next];
    setPreviewSpeed(next);
  };

  const handlePreviewFullscreen = (e) => {
    e.stopPropagation();
    const vid = previewVideoRef.current;
    if (!vid) return;
    vid.requestFullscreen?.().catch(() => {});
  };

  const openModal = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  /* ══════════════════════════════════════════════════
     MODAL PLAYER CONTROLS
  ══════════════════════════════════════════════════ */
  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    const vid = modalVideoRef.current;
    if (!vid) return;
    const dur = vid.duration || 0;
    setProgress(dur > 0 ? (vid.currentTime / dur) * 100 : 0);
    setCurrentTime(formatTime(vid.currentTime));
    setDuration(formatTime(dur));
  };

  const handleProgressChange = (e) => {
    const vid = modalVideoRef.current;
    if (!vid) return;
    const pct = parseFloat(e.target.value);
    vid.currentTime = (pct / 100) * vid.duration;
    setProgress(pct);
  };

  const togglePlay = () => {
    const vid = modalVideoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setIsPlaying(true); }
    else            { vid.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const vid = modalVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  /* Lock scroll when modal is open; auto-play modal video */
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (modalVideoRef.current) {
          modalVideoRef.current.muted = false;
          setIsMuted(false);
          modalVideoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }, 300);
    } else {
      document.body.style.overflow = '';
      setIsPlaying(false);
      setProgress(0);
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  /* ══════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════ */
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
            A high-octane 60-second cut showcasing rapid-fire transitions, cinematic color spaces, and tight audio beat syncs.
          </p>
        </div>

        {/* ── Preview card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-950 relative group cursor-none shadow-xl shadow-slate-200/60"
          onClick={handleCardClick}
          data-cursor={previewPlaying ? 'view' : 'play'}
        >
          {/* Video */}
          <video
            ref={previewVideoRef}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            autoPlay
            loop
            playsInline
            onPlay={() => setPreviewPlaying(true)}
            onPause={() => setPreviewPlaying(false)}
          >
            <source src={showreelVideo} type="video/mp4" />
          </video>

          {/* Vignette — lightens when playing */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: previewPlaying
                ? 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%, rgba(0,0,0,0.10) 100%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 55%, rgba(0,0,0,0.30) 100%)',
            }}
          />

          {/* ── Open-in-player button (top-right) — always visible ── */}
          <button
            onClick={openModal}
            className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] tracking-widest hover:bg-green-600 hover:border-green-600 transition-all cursor-none"
          >
            <ExternalLink size={12} />
            OPEN PLAYER
          </button>

          {/* ── Centre: big play when paused; flash on toggle ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
              {/* Flash on tap */}
              {showFlash && (
                <motion.div
                  key="flash"
                  initial={{ opacity: 1, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.45 }}
                >
                  {flashPlaying
                    ? <Play  size={56} className="text-white drop-shadow-2xl" fill="currentColor" />
                    : <Pause size={56} className="text-white drop-shadow-2xl" fill="currentColor" />}
                </motion.div>
              )}

              {/* Static big play button when paused and no flash */}
              {!previewPlaying && !showFlash && (
                <motion.div
                  key="static-play"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-green-600 group-hover:border-green-600 text-white transition-all duration-500 shadow-2xl">
                    <Play size={32} fill="currentColor" className="ml-1.5" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Bottom metadata — hidden while playing ── */}
          <AnimatePresence>
            {!previewPlaying && (
              <motion.div
                key="meta"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-wrap gap-x-6 gap-y-2 text-[10px] md:text-xs font-mono text-slate-300 pointer-events-none"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span>CLIP CODING: ProRes 422 HQ</span>
                </div>
                <div>FPS: 23.976</div>
                <div className="hidden sm:block">COLOR: S-LOG3.Cine</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Floating control bar — always visible on hover via CSS ── */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30
                       opacity-0 group-hover:opacity-100
                       translate-y-3 group-hover:translate-y-0
                       pointer-events-none group-hover:pointer-events-auto
                       transition-all duration-300 ease-out
                       flex items-center gap-4 px-5 py-3 rounded-2xl
                       bg-black/65 backdrop-blur-xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Play / Pause */}
            <button
              onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
              title={previewPlaying ? 'Pause' : 'Play'}
              className="flex flex-col items-center gap-0.5 text-white/80 hover:text-white transition-colors cursor-none"
            >
              {previewPlaying
                ? <Pause size={18} fill="currentColor" />
                : <Play  size={18} fill="currentColor" />}
              <span className="font-mono text-[8px] tracking-wider">
                {previewPlaying ? 'PAUSE' : 'PLAY'}
              </span>
            </button>

            <div className="w-px h-6 bg-white/20" />

            {/* Mute */}
            <button
              onClick={togglePreviewMute}
              title={previewMuted ? 'Unmute' : 'Mute'}
              className="flex flex-col items-center gap-0.5 text-white/80 hover:text-white transition-colors cursor-none"
            >
              {previewMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span className="font-mono text-[8px] tracking-wider">
                {previewMuted ? 'MUTED' : 'AUDIO'}
              </span>
            </button>

            <div className="w-px h-6 bg-white/20" />

            {/* Speed */}
            <button
              onClick={cyclePreviewSpeed}
              title="Cycle playback speed"
              className="flex flex-col items-center gap-0.5 text-white/80 hover:text-white transition-colors cursor-none"
            >
              <Gauge size={18} />
              <span className="font-mono text-[8px] tracking-wider">
                {SPEEDS[previewSpeed]}×
              </span>
            </button>

            <div className="w-px h-6 bg-white/20" />

            {/* Fullscreen */}
            <button
              onClick={handlePreviewFullscreen}
              title="Fullscreen"
              className="flex flex-col items-center gap-0.5 text-white/80 hover:text-white transition-colors cursor-none"
            >
              <Maximize2 size={18} />
              <span className="font-mono text-[8px] tracking-wider">FULL</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          FULLSCREEN CUSTOM VIDEO PLAYER MODAL
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {modalOpen && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[999999] flex flex-col justify-between p-6 select-none"
          >
            {/* Top bar */}
            <div className="flex justify-between items-center text-slate-900 border-b border-slate-200/60 pb-4">
              <div>
                <h3 className="font-clash text-lg md:text-xl font-bold tracking-tight">SHOWREEL_MASTER_2026.mp4</h3>
                <p className="font-mono text-[10px] text-slate-500 mt-0.5">SOURCE CODEC: H.264 HEVC • REC709</p>
              </div>
              <Magnet range={20} strength={0.3}>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-none"
                >
                  <X size={20} />
                </button>
              </Magnet>
            </div>

            {/* Video + side panel */}
            <div className="flex-1 my-4 flex flex-col lg:flex-row gap-6 items-center justify-center overflow-hidden">
              {/* Video */}
              <div className="relative aspect-video w-full max-w-4xl rounded-2xl overflow-hidden border border-slate-200/60 bg-black shadow-2xl flex-1 flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                  playsInline
                >
                  <source src={showreelVideo} type="video/mp4" />
                </video>

                {/* Centre pause overlay */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none"
                    >
                      <Play size={52} className="text-white opacity-70" fill="currentColor" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Side panel */}
              <div className="hidden lg:flex flex-col gap-4 w-72 h-[360px] bg-white border border-slate-200 rounded-2xl p-4 font-mono text-[11px] text-slate-600 shadow-md shadow-slate-100 justify-between">
                <div>
                  <div className="flex justify-between items-center text-slate-900 border-b border-slate-200 pb-2 mb-3">
                    <span className="flex items-center gap-1.5"><Activity size={12} className="text-red-500" /> AUDIO PEAK METERS</span>
                    <span className="text-[10px] text-red-500 font-semibold">dbFS</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {['CH-1 (L)', 'CH-2 (R)'].map((ch, ci) => (
                      <div key={ch} className={ci > 0 ? 'mt-1' : ''}>
                        <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                          <span>{ch}</span>
                          <span>{isPlaying ? (ci === 0 ? '-1.8 dB' : '-2.4 dB') : '-INF'}</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded overflow-hidden flex gap-[1px]">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-full flex-1 transition-all duration-150 ${
                                !isPlaying ? 'bg-slate-200' :
                                i > (ci === 0 ? 16 : 15) ? 'bg-red-500' :
                                i > (ci === 0 ? 12 : 11) ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ opacity: isPlaying ? (Math.random() * 0.4 + 0.6) : 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-slate-900 border-b border-slate-200 pb-2 mb-2">
                    <span className="flex items-center gap-1.5"><Sliders size={12} className="text-green-600" /> COLOR SCOPE LUTS</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-slate-500">
                    <div className="flex justify-between"><span>LUT STATE:</span><span className="text-green-600 font-semibold">KODAK_2383_REC709</span></div>
                    <div className="flex justify-between"><span>EXPOSURE:</span><span className="text-slate-800">+0.4 EV</span></div>
                    <div className="flex justify-between"><span>TEMPERATURE:</span><span className="text-slate-800">5600 K</span></div>
                    <div className="flex justify-between"><span>VIBRANCE:</span><span className="text-slate-800">+12%</span></div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-2 rounded text-[10px]">
                  <p className="text-slate-900 font-semibold">TIMELINE ANCHORS:</p>
                  <p className="text-slate-500 mt-1">00:02:15 - Beat Drop Cut</p>
                  <p className="text-slate-500">00:08:12 - Speed Ramp FX</p>
                  <p className="text-slate-500">00:15:00 - Outro Glow Fade</p>
                </div>
              </div>
            </div>

            {/* Bottom controls */}
            <div className="flex flex-col gap-3 border-t border-slate-200/60 pt-4">
              {/* Scrubber */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500">{currentTime}</span>
                <input
                  type="range" min="0" max="100" value={progress}
                  onChange={handleProgressChange}
                  className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer outline-none"
                  style={{ background: `linear-gradient(to right, #16a34a ${progress}%, #e2e8f0 ${progress}%)` }}
                />
                <span className="font-mono text-xs text-slate-500">{duration}</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-slate-500">
                  <button className="hover:text-slate-900 cursor-none" onClick={() => { if (modalVideoRef.current) modalVideoRef.current.currentTime -= 5; }}>
                    <Rewind size={18} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:scale-105 hover:bg-green-700 transition-all cursor-none shadow-sm shadow-green-500/20"
                  >
                    {isPlaying
                      ? <Pause size={16} fill="white" />
                      : <Play  size={16} fill="white" className="ml-0.5" />}
                  </button>
                  <button className="hover:text-slate-900 cursor-none" onClick={() => { if (modalVideoRef.current) modalVideoRef.current.currentTime += 5; }}>
                    <FastForward size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-slate-500">
                  <button onClick={toggleMute} className="hover:text-slate-900 cursor-none">
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button className="hover:text-slate-900 cursor-none" onClick={() => { modalVideoRef.current?.requestFullscreen().catch(() => {}); }}>
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </section>
  );
}
