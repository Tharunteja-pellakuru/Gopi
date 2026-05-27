import { motion } from 'framer-motion';
import profilePic from '../assets/Gopi.png';

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-6 md:px-12 bg-white flex justify-center items-center overflow-hidden"
    >
      {/* Background soft ambient blur */}
      <div className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] bg-green-500/5 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* Left Side: Profile Image */}
        <div className="lg:col-span-5 flex justify-center items-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-[360px] aspect-[3/4] rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/60 relative overflow-hidden bg-slate-100"
          >
            {/* Profile Image */}
            <img
              src={profilePic}
              alt="Gopi - Video Editor"
              className="w-full h-full object-cover object-center"
            />

            {/* Cinematic overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

            {/* Corner markers */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/60" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/60" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/60" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/60" />

            {/* Top HUD */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center font-mono text-[9px] text-white/70">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-white">REC</span>
              </div>
              <div>tc 00:14:52:12</div>
            </div>

            {/* Bottom HUD */}
            <div className="absolute bottom-14 left-4 right-4 flex justify-between items-end font-mono text-[9px] text-white/60">
              <div>
                <p>SHUTTER: 1/50</p>
                <p className="mt-0.5">ISO: 800</p>
              </div>
              <div className="text-right">
                <p>FOCAL: 35MM</p>
                <p className="mt-0.5 text-green-400 font-semibold">AF-C</p>
              </div>
            </div>

            {/* Name badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 whitespace-nowrap">
              <span className="font-mono text-[10px] text-white tracking-widest uppercase">Gopi.Edit</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Text */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left order-1 lg:order-2">
          <span className="font-mono text-xs text-green-600 uppercase tracking-widest block mb-3 font-semibold">
            The Storyteller
          </span>

          <h2 className="font-clash text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            RHYTHM FIRST. <br />
            NO BORING FRAMES.
          </h2>

          <div className="h-[1px] w-20 bg-green-600 mb-8" />

          <p className="font-general text-base md:text-lg text-slate-700 leading-relaxed mb-6 font-medium">
            I don't just splice clips together. I sculpt visual narratives that sync movement and
            sound to produce raw emotion.
          </p>

          <p className="font-general text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            Based in India, I edit videos for global brands, record labels, and top-tier creators.
            My focus is short-form social content that breaks the scroll, high-energy music videos
            that command attention, and cinematic commercials that tell deep stories.
          </p>

          <p className="font-general text-slate-600 text-sm md:text-base leading-relaxed">
            Every transition, color grade, and sound effect is placed intentionally to guide the
            viewer's eye and keep their eyes glued to the screen. If it doesn't evoke a feeling,
            it gets cut.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-200/60">
            <div>
              <h4 className="font-clash text-2xl md:text-3xl font-bold text-slate-900">50M+</h4>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mt-1">Total Views</span>
            </div>
            <div>
              <h4 className="font-clash text-2xl md:text-3xl font-bold text-slate-900">100+</h4>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mt-1">Edits Delivered</span>
            </div>
            <div>
              <h4 className="font-clash text-2xl md:text-3xl font-bold text-slate-900">100%</h4>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mt-1">Retention Focus</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
