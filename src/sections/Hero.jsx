import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Play, Pause, MessageSquare, ArrowDown, Heart, Share2, Bookmark, Music2, ChevronUp, Volume2, VolumeX, Maximize, X } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Magnet from '../components/Magnet';
import shortVideo1 from '../assets/short-videos/Short-Video-1.mp4';
import profilePic from '../assets/Gopi.png';

const reels = [
  {
    id: 0,
    title: 'Music Sync',
    category: 'BEATS & CUTS',
    views: '2.1M',
    likes: '48.3K',
    video: shortVideo1,
    color: '#16a34a',
    tag: '#musicsync',
  },
  {
    id: 1,
    title: 'Cinematic Reel',
    category: 'CINEMATICS',
    views: '1.7M',
    likes: '34.2K',
    video: shortVideo1,
    color: '#7c3aed',
    tag: '#cinematic',
  },
  {
    id: 2,
    title: 'Visual Flow',
    category: 'TRANSITIONS',
    views: '3.4M',
    likes: '91.1K',
    video: shortVideo1,
    color: '#0891b2',
    tag: '#visualflow',
  },
];

/* ─── Portal Modal (renders into document.body, bypassing stacking contexts) ─── */
function PortalModal({ children }) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}

/* ─── Reel Card ───────────────────────────────────────────── */
function ReelCard({ reel, active, inView, onSwipeUp, onSwipeDown, isFullscreen, onExpand, globalMuted, onMuteToggle }) {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);
  const [doubleTapHeart, setDoubleTapHeart] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-120, 0, 120], [0, 1, 0]);
  const lastTap = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);

  /* Sync mute state from parent */
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) vid.muted = globalMuted;
  }, [globalMuted]);

  /* play / pause based on active & inView */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (active && inView) {
      vid.currentTime = 0;
      vid.muted = globalMuted;
      vid.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      vid.pause();
    }
  }, [active, inView]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
    }
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 600);
  };

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      // Double tap — trigger like
      handleLike();
      setDoubleTapHeart(true);
      setTimeout(() => setDoubleTapHeart(false), 900);
    } else {
      // Single tap — play/pause
      const vid = videoRef.current;
      if (vid) {
        if (vid.paused) vid.play();
        else vid.pause();
      }
    }
    lastTap.current = now;
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y < -50) onSwipeUp();
    else if (info.offset.y > 50) onSwipeDown();
    animate(y, 0, { type: 'spring', stiffness: 400, damping: 30 });
  };

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden select-none ${isFullscreen ? 'rounded-none sm:rounded-[28px]' : 'rounded-[28px]'}`}
      style={{ opacity, y }}
      drag="y"
      dragConstraints={{ top: -120, bottom: 120 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
    >
      {/* Video — single tap = play/pause, double tap = like */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        loop
        playsInline
        preload="metadata"
        muted={globalMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handleTap}
      >
        <source src={reel.video} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

      {/* Double-tap heart burst */}
      <AnimatePresence>
        {doubleTapHeart && (
          <motion.div
            key="heart-burst"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <Heart size={90} className="text-red-500 fill-red-500 drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-side action buttons */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5">
        {/* Like */}
        <button
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); handleLike(); }}
        >
          <motion.div
            animate={likeAnim ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Heart
              size={22}
              className={`transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`}
            />
          </motion.div>
          <span className="text-white/80 font-mono text-[9px]">
            {liked
              ? (parseFloat(reel.likes) + 0.1).toFixed(1) + 'K'
              : reel.likes}
          </span>
        </button>

        {/* Play/Pause Toggle */}
        <button
          className="flex flex-col items-center gap-1 cursor-none"
          onClick={() => {
            const vid = videoRef.current;
            if (vid) {
              if (vid.paused) vid.play();
              else vid.pause();
            }
          }}
        >
          {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
          <span className="text-white/80 font-mono text-[9px]">{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        {/* Mute Toggle */}
        <button
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onMuteToggle(); }}
        >
          {globalMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
          <span className="text-white/80 font-mono text-[9px]">{globalMuted ? 'Muted' : 'Audio'}</span>
        </button>

        {/* Expand / Full View Toggle (Only show if not already fullscreen) */}
        {!isFullscreen && (
          <button
            className="flex flex-col items-center gap-1 cursor-none"
            onClick={onExpand}
          >
            <Maximize size={20} className="text-white" />
            <span className="text-white/80 font-mono text-[9px]">Expand</span>
          </button>
        )}

      </div>

      {/* Bottom info */}
      <div className="absolute bottom-5 left-5 right-16">
        <p className="text-white font-clash font-semibold text-base leading-tight">{reel.title}</p>
        <p className="text-white/70 font-mono text-[9px] mt-1">{reel.tag}</p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className="text-[8px] font-mono text-white/60 px-2 py-0.5 rounded-full border"
            style={{ borderColor: reel.color + '66' }}
          >
            {reel.views} views
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Swipeable Reel Stack ────────────────────────────────── */
function ReelStack({ inView, isFullscreen = false, onExpand }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [globalMuted, setGlobalMuted] = useState(true);

  const goNext = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c + 1) % reels.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c - 1 + reels.length) % reels.length);
  }, []);

  const variants = {
    enter: (dir) => ({ y: dir < 0 ? '100%' : '-100%', opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir < 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Phone shell or Fullscreen shell */}
      <div
        className={`relative overflow-hidden shadow-2xl ${isFullscreen ? 'rounded-[28px]' : 'rounded-[28px]'}`}
        style={isFullscreen ? {
          /* 9:16 card capped to 88% of viewport height */
          height: 'min(88vh, calc(56.25vw * 1.6))',
          width: 'min(calc(88vh * 9 / 16), 420px)',
          background: '#111',
          boxShadow: '0 40px 100px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)',
        } : {
          width: '100%',
          aspectRatio: '9/16',
          maxWidth: 340,
          background: '#111',
          boxShadow: '0 30px 80px -10px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* Animated reel */}
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <ReelCard
              reel={reels[current]}
              active={true}
              inView={inView}
              onSwipeUp={goNext}
              onSwipeDown={goPrev}
              isFullscreen={isFullscreen}
              onExpand={onExpand}
              globalMuted={globalMuted}
              onMuteToggle={() => setGlobalMuted(m => !m)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators below phone (Hide in fullscreen) */}
      {!isFullscreen && (
        <div className="flex items-center gap-2 mt-4">
          {reels.map((r, i) => (
            <button
              key={r.id}
              onClick={() => { setDirection(i > current ? -1 : 1); setCurrent(i); }}
              className="rounded-full transition-all duration-300 cursor-none"
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                background: i === current ? r.color : '#d1d5db',
              }}
            />
          ))}
        </div>
      )}

    </div>
  );
}

/* ─── Hero Section ────────────────────────────────────────── */
export default function Hero() {
  const [inView, setInView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 md:py-0 select-none bg-white"
    >
      {/* Immersive Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-[0.08] scale-[1.05] filter blur-[2px]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4d8237e32daafab9d9a11486e9e&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/90" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      {/* Hero Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left: Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">

          {/* Tagline & Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <img 
              src={profilePic} 
              alt="Gopi Profile" 
              className="w-12 h-12 rounded-full object-cover border-2 border-green-500 shadow-lg shadow-green-500/20"
            />
            <div className="inline-flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-[10px] md:text-xs text-zinc-600 uppercase tracking-widest font-semibold">
                Available For Custom Projects
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="font-clash text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-zinc-900">
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                TURNING <span className="text-green-600 font-normal italic">MUSIC</span> &amp;
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="block"
              >
                MOTION INTO
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-green-500 font-bold"
              >
                VISUAL EMOTION.
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-general text-base md:text-xl text-zinc-600 max-w-xl mt-6 leading-relaxed"
          >
            Creative Video Editor specializing in high-energy Music Syncs, Atmospheric Cinematic Reels, and Viral Social Media Content that capture attention in 0.5 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Magnet range={25} strength={0.2}>
              <a
                href="#showreel"
                onClick={(e) => handleScrollTo(e, '#showreel')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-general font-bold text-sm transition-transform cursor-none shadow-md shadow-green-500/10"
                data-cursor="play"
              >
                <Play size={16} fill="currentColor" /> Watch Showreel
              </a>
            </Magnet>

            <Magnet range={25} strength={0.2}>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-general font-bold text-sm transition-transform cursor-none shadow-sm"
                data-cursor="link"
              >
                <MessageSquare size={16} /> Let's Work
              </a>
            </Magnet>
          </motion.div>
        </div>

        {/* Right: Swipeable Reel Stack */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center h-[640px] pt-8 lg:h-auto lg:pt-12"
        >
          <ReelStack inView={inView && !isModalOpen} onExpand={() => setIsModalOpen(true)} />
        </motion.div>
      </div>

      {/* Full-Screen Reels Modal — rendered via Portal into body to fix backdrop-filter */}
      <AnimatePresence>
        {isModalOpen && (
          <PortalModal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
              {/* Background Overlay with real glassmorphic blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
                style={{
                  backdropFilter: 'blur(30px) brightness(0.55) saturate(2.5)',
                  WebkitBackdropFilter: 'blur(30px) brightness(0.55) saturate(2.5)',
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                }}
                onClick={() => setIsModalOpen(false)}
              />

              {/* Close button — truly fixed to viewport top-right, outside the card */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="fixed top-5 right-5 z-[10000] w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <X size={20} className="text-white" />
              </button>

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center justify-center"
                style={{ filter: 'drop-shadow(0 8px 48px rgba(0,0,0,0.5))' }}
              >
                <ReelStack inView={true} isFullscreen={true} />
              </motion.div>
            </div>
          </PortalModal>
        )}
      </AnimatePresence>

      {/* Bottom Scroll Anchor */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, '#work')}
            className="w-8 h-8 rounded-full border border-black/5 bg-black/5 flex items-center justify-center text-zinc-600 hover:text-black transition-colors cursor-none"
          >
            <ArrowDown size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
