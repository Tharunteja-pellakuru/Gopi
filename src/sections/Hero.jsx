import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Play, MessageSquare, ArrowDown, Heart, Share2, Bookmark, Music2, ChevronUp, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import Magnet from '../components/Magnet';
import shortVideo1 from '../assets/short-videos/Short-Video-1.mp4';

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
    video: 'https://player.vimeo.com/external/409099132.sd.mp4?s=d1cc32b694b2a8d115fa7621422797e8838d172e&profile_id=165&oauth2_token_id=57447761',
    color: '#7c3aed',
    tag: '#cinematic',
  },
  {
    id: 2,
    title: 'Visual Flow',
    category: 'TRANSITIONS',
    views: '3.4M',
    likes: '91.1K',
    video: 'https://player.vimeo.com/external/554181213.sd.mp4?s=a7d2e06180a9d9e4a3c104445585b4b1a41cc63e&profile_id=165&oauth2_token_id=57447761',
    color: '#0891b2',
    tag: '#visualflow',
  },
];

/* ─── Reel Card ───────────────────────────────────────────── */
function ReelCard({ reel, active, inView, onSwipeUp, onSwipeDown }) {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-120, 0, 120], [0, 1, 0]);
  const dragStartY = useRef(0);

  const [isMuted, setIsMuted] = useState(false);

  /* play / pause based on active & inView */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (active && inView) {
      vid.currentTime = 0;
      vid.muted = false;
      setIsMuted(false);
      vid.play().catch(() => {
        /* Browser blocked unmuted autoplay — fall back to muted */
        vid.muted = true;
        setIsMuted(true);
        vid.play().catch(() => {});
      });
    } else {
      vid.pause();
    }
  }, [active, inView]);

  const handleLike = () => {
    setLiked(v => !v);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 600);
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y < -50) onSwipeUp();
    else if (info.offset.y > 50) onSwipeDown();
    animate(y, 0, { type: 'spring', stiffness: 400, damping: 30 });
  };

  return (
    <motion.div
      className="absolute inset-0 rounded-[28px] overflow-hidden select-none"
      style={{ opacity, y }}
      drag="y"
      dragConstraints={{ top: -120, bottom: 120 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
      data-cursor="view"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        playsInline
        preload="metadata"
      >
        <source src={reel.video} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none" />

      {/* Top: category badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span
          className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-white"
          style={{ background: reel.color + 'cc' }}
        >
          {reel.category}
        </span>
      </div>

      {/* Top-right: swipe hint */}
      <motion.div
        className="absolute top-4 right-4 flex flex-col items-center gap-0.5"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <ChevronUp size={16} className="text-white/70" />
        <ChevronUp size={16} className="text-white/40" style={{ marginTop: -6 }} />
        <span className="text-white/50 font-mono text-[8px] mt-1 tracking-widest">SWIPE</span>
      </motion.div>

      {/* Right-side action buttons */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5">
        {/* Like */}
        <button
          className="flex flex-col items-center gap-1 cursor-none"
          onClick={handleLike}
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

        {/* Mute Toggle */}
        <button
          className="flex flex-col items-center gap-1 cursor-none"
          onClick={() => {
            const vid = videoRef.current;
            if (vid) {
              vid.muted = !vid.muted;
              setIsMuted(vid.muted);
            }
          }}
        >
          {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
          <span className="text-white/80 font-mono text-[9px]">{isMuted ? 'Muted' : 'Audio'}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1 cursor-none">
          <Share2 size={20} className="text-white" />
          <span className="text-white/80 font-mono text-[9px]">Share</span>
        </button>

        {/* Save */}
        <button
          className="flex flex-col items-center gap-1 cursor-none"
          onClick={() => setSaved(v => !v)}
        >
          <Bookmark
            size={20}
            className={`transition-colors ${saved ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`}
          />
          <span className="text-white/80 font-mono text-[9px]">Save</span>
        </button>

        {/* Spinning music disc */}
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden flex items-center justify-center mt-1"
          style={{ background: reel.color + '99' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        >
          <Music2 size={14} className="text-white" />
        </motion.div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-4 left-4 right-16">
        <p className="text-white font-clash font-bold text-lg leading-tight">{reel.title}</p>
        <p className="text-white/70 font-mono text-[10px] mt-0.5">{reel.tag}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className="text-[9px] font-mono text-white/60 px-2 py-0.5 rounded-full border"
            style={{ borderColor: reel.color + '88' }}
          >
            {reel.views} views
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Swipeable Reel Stack ────────────────────────────────── */
function ReelStack({ inView }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 up, 1 down

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
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Phone shell */}
      <div
        className="relative rounded-[28px] overflow-hidden shadow-2xl"
        style={{
          width: '100%',
          aspectRatio: '9/16',
          maxWidth: 260,
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
            />
          </motion.div>
        </AnimatePresence>

        {/* Progress bar (top) */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 px-3 pt-2 z-30 pointer-events-none">
          {reels.map((r, i) => (
            <div key={r.id} className="flex-1 h-[2px] rounded-full bg-white/20 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: r.color }}
                animate={{ width: i === current ? '100%' : i < current ? '100%' : '0%' }}
                transition={{ duration: i === current ? 0.4 : 0 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators below phone */}
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

      {/* Navigation arrows */}
      <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        <button
          onClick={goPrev}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center hover:scale-110 transition-transform cursor-none"
        >
          <ChevronUp size={14} className="text-slate-600" />
        </button>
        <button
          onClick={goNext}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center hover:scale-110 transition-transform cursor-none"
        >
          <ChevronUp size={14} className="text-slate-600 rotate-180" />
        </button>
      </div>
    </div>
  );
}

/* ─── Hero Section ────────────────────────────────────────── */
export default function Hero() {
  const [inView, setInView] = useState(true);
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

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              Available For Custom Projects
            </span>
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
          className="lg:col-span-5 relative flex items-center justify-center h-[520px] lg:h-auto lg:pt-4"
        >
          <ReelStack />
        </motion.div>
      </div>

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
